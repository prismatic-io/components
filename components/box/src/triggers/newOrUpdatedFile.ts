import { pollingTrigger } from "@prismatic-io/spectral";
import { newOrUpdatedFileInputs } from "../inputs";
import { createAuthorizedClient } from "../client";
import {
  buildPollingResult,
  computeNewEntries,
  getFolderEntries,
  getLastPolledAt,
  normalizeDatesBetweenEntries,
} from "../util";
import { FOLDER_TYPE, MAX_PAGE_SIZE } from "../constants";
export const newOrUpdatedFile = pollingTrigger({
  display: {
    label: "New and Updated Files",
    description:
      "Checks for new and updated files in a specified folder on a configured schedule.",
  },
  inputs: newOrUpdatedFileInputs,
  perform: async (context, payload, { connection, folderId }) => {
    const now = new Date().toISOString();
    const client = createAuthorizedClient({ boxConnection: connection });
    const lastPolledAt = getLastPolledAt(context, now);
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
