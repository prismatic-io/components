import { pollingTrigger } from "@prismatic-io/spectral";
import { connection, driveId } from "../inputs";
import { createClient } from "../client";
import { addCreated, addDeleted, addUpdated, paginateResults } from "../utils";
import type {
  DriveDeltaResponse,
  PollingState,
  PollSiteChangesSeparatedChanges,
} from "../interfaces";

export const drivePollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Drive Items",
    description:
      "Checks for new and updated items in a specified SharePoint drive on a configured schedule.",
  },
  inputs: {
    connection,
    driveId,
  },
  perform: async ({ logger, polling, debug }, payload, { connection, driveId }) => {
    const client = await createClient(connection, debug.enabled);

    let allChanges: PollSiteChangesSeparatedChanges = {};

    const deltaLink = polling.getState()[driveId];
    const endpoint = deltaLink ? deltaLink : `/drives/${driveId}/root/delta`;
    const data = (await paginateResults<DriveDeltaResponse>(
      client,
      endpoint as string,
      true,
      
      false,
      true,
    )) as DriveDeltaResponse;

    const newPollingState: PollingState = {};

    if (data.value.length > 0) {
      const separatedChanges: PollSiteChangesSeparatedChanges = {};
      for (const change of data.value) {
        const isDeleted = Object.keys(change).includes("deleted");
        const isRoot = Object.keys(change).includes("root");

        if (isRoot) {
          continue;
        }
        addDeleted({ isDeleted, separatedChanges, change });
        addUpdated({ isDeleted, separatedChanges, change });
        addCreated({ isDeleted, separatedChanges, change });
      }
      allChanges = separatedChanges;
    }

    newPollingState[driveId] = data["@odata.deltaLink"];

    
    polling.setState(newPollingState);

    if (debug.enabled) {
      logger.debug("Polling state:", newPollingState);
    }

    return Promise.resolve({
      payload: { ...payload, body: { data: allChanges } },
    });
  },
});
