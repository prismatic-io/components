import { pollingTrigger } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { DEFAULT_BATCH_SIZE, FOLDER_TYPE, MAX_PAGE_SIZE } from "../constants";
import { newFolderInputs } from "../inputs";
import type { BoxFolderChange, BoxFolderChangesObject } from "../types";
import {
  buildPollingResult,
  getFolderEntries,
  getLastPolledAt,
  normalizeDatesBetweenEntries,
  resolveFolderChanges,
} from "../util";

export const newFolder = pollingTrigger({
  display: {
    label: "New Folders",
    description:
      "Retrieves existing and ongoing folders in a specified Box folder. Load history once, check for changes on a schedule, or both.",
  },
  inputs: newFolderInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): BoxFolderChange[] =>
      resolveFolderChanges(payload.body.data as BoxFolderChangesObject),
  },
  perform: async (context, payload, { connection, folderId, lookBackDate }) => {
    const now = new Date().toISOString();
    const client = createAuthorizedClient({ boxConnection: connection });
    const lastPolledAt = getLastPolledAt(context, lookBackDate || now);
    const fields = "name,created_at,id,type";

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
      entries.filter(({ type }) => type === FOLDER_TYPE),
    );

    context.logger.info("Computing new folders...");
    const newFolders = normalizedEntries.filter(
      (entry) => entry.created_at > lastPolledAt,
    );

    context.logger.info("Setting polling state...");
    context.polling.setState({ lastPolledAt: now });
    return buildPollingResult(payload, {
      newFolders: {
        data: newFolders,
        polledNoChanges: newFolders.length === 0,
      },
    });
  },
});
