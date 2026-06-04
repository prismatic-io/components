import { pollingTrigger } from "@prismatic-io/spectral";
import { connection, siteId } from "../inputs";
import { createClient } from "../client";
import { addCreated, addDeleted, addUpdated, paginateResults } from "../utils";
import type {
  DriveDeltaResponse,
  PollingState,
  PollSiteChangesSeparatedChanges,
} from "../interfaces";

export const pollSiteChanges = pollingTrigger({
  display: {
    label: "New and Updated Site Items",
    description:
      "Checks for new and updated items across all drives in a SharePoint site on a configured schedule.",
  },
  inputs: {
    connection,
    siteId,
  },
  perform: async ({ logger, polling, debug }, payload, { connection, siteId }) => {
    const client = await createClient(connection, debug.enabled);

    const drivesEndpoint = `/sites/${siteId}/drives?$select=id,name`;

    let polledNoChanges = true;

    const allDrives = (await paginateResults(client, drivesEndpoint)) as {
      id: string;
      name: string;
    }[];

    const allChanges: Record<string, unknown> = {};

    for (const drive of allDrives) {
      const deltaLink = polling.getState()[drive.id];
      const endpoint = deltaLink ? deltaLink : `/sites/${siteId}/drives/${drive.id}/root/delta`;
      allChanges[drive.name] = paginateResults(
        client,
        endpoint as string,
        true,
        
        false,
        true,
      );
    }

    const allChangesResults = (await Promise.all(
      Object.values(allChanges),
    )) as DriveDeltaResponse[];

    const newPollingState: PollingState = {};

    allChangesResults.forEach((result, index) => {
      if (result.value.length > 0) {
        const separatedChanges: PollSiteChangesSeparatedChanges = {};
        for (const change of result.value) {
          const isDeleted = Object.keys(change).includes("deleted");
          const isRoot = Object.keys(change).includes("root");
          if (isRoot) {
            continue;
          }
          addDeleted({ isDeleted, separatedChanges, change });
          addUpdated({ isDeleted, separatedChanges, change });
          addCreated({ isDeleted, separatedChanges, change });
        }

        allChanges[allDrives[index].name] = separatedChanges;

        if (polledNoChanges === true) {
          polledNoChanges = false;
        }
      } else {
        delete allChanges[allDrives[index].name];
      }

      newPollingState[allDrives[index].id] = result["@odata.deltaLink"];
    });

    
    polling.setState(newPollingState);

    if (debug.enabled) {
      logger.debug("Polling state:", newPollingState);
    }

    return Promise.resolve({
      payload: { ...payload, body: { data: allChanges } },
      polledNoChanges,
    });
  },
});
