import { pollingTrigger } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { DEFAULT_BATCH_SIZE, FOLDER_TYPE, MAX_PAGE_SIZE } from "../constants";
import { newOrUpdatedFileInputs } from "../inputs";
import type { BoxChangesObject, BoxRecordChange, PollingState } from "../types";
import {
  buildPollingResult,
  computeNewEntries,
  getFolderEntries,
  normalizeDatesBetweenEntries,
  resolvePollingRecordChanges,
} from "../util";

export const newOrUpdatedFile = pollingTrigger({
  display: {
    label: "New and Updated Files",
    description:
      "Retrieves existing and ongoing files in a specified Box folder. Load history once, check for changes on a schedule, or both.",
  },
  inputs: newOrUpdatedFileInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): BoxRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as BoxChangesObject),
  },
  perform: async (context, payload, { connection, folderId, lookBackDate }) => {
    const now = new Date().toISOString();
    const client = createAuthorizedClient({ boxConnection: connection });
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? (lookBackDate || now);
    const fields = "name,created_at,modified_at,id,type";

    context.logger.debug(`Polling for changes from: ${lastPolledAt} to ${now}`);
    const entries = await getFolderEntries({
      client,
      id: folderId,
      fields,
      limit: MAX_PAGE_SIZE,
    });

    context.logger.info("Polled entries: ", JSON.stringify(entries, null, 2));
    context.logger.info("Normalizing entry dates...");
    const normalizedEntries = normalizeDatesBetweenEntries(
      entries.filter(({ type }) => type !== FOLDER_TYPE),
    );

    context.logger.info("Computing new files...");
    const newFiles = computeNewEntries(normalizedEntries, lastPolledAt);

    const newFilesKeys = newFiles.map((entry) => entry.id);
    context.logger.info("Computing updated files...");
    const updatedFiles = normalizedEntries.filter(
      ({ modified_at: modifiedAt, id: entryId }) =>
        modifiedAt > lastPolledAt && !newFilesKeys.includes(entryId),
    );

    context.logger.info("Setting polling state...");
    context.polling.setState({ lastPolledAt: now });
    return buildPollingResult(payload, {
      newFiles: { data: newFiles, polledNoChanges: newFiles.length === 0 },
      updatedFiles: {
        data: updatedFiles,
        polledNoChanges: updatedFiles.length === 0,
      },
    });
  },
});
