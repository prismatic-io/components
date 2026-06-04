import { pollingTrigger } from "@prismatic-io/spectral";
import { connectionInput, folderIdInput } from "../inputs";
import { createAuthorizedClient } from "../client";
import {
  buildPollingResult,
  getFolderEntries,
  getLastPolledAt,
  normalizeDatesBetweenEntries,
} from "../utils";
import { FOLDER_TYPE } from "../constants";

export const newFolder = pollingTrigger({
  display: {
    label: "New Folders",
    description:
      "Checks for new folders in a specified folder on a configured schedule.",
  },
  inputs: { connection: connectionInput, folderId: folderIdInput },
  perform: async (context, payload, { connection, folderId }) => {
    const now = new Date().toISOString();
    const client = createAuthorizedClient({ boxConnection: connection });
    const lastPolledAt = getLastPolledAt(context, now);
    const fields = "name,created_at,id,type";

    context.logger.debug(`Polling for changes from: ${lastPolledAt} to ${now}`);
    const entries = await getFolderEntries({
      client,
      id: folderId,
      fields,
      limit: 1000,
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
