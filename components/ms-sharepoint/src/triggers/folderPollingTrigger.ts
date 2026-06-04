import { pollingTrigger } from "@prismatic-io/spectral";
import { folderPollingTriggerInputs } from "../inputs";
import { createClient } from "../client";
import { addCreated, addDeleted, addUpdated, paginateResults } from "../utils";
import type {
  DriveDeltaResponse,
  PollingState,
  PollSiteChangesSeparatedChanges,
} from "../interfaces";

export const folderPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Folder Items",
    description:
      "Checks for new and updated items in a specified folder within a SharePoint drive on a configured schedule.",
  },
  inputs: folderPollingTriggerInputs,
  perform: async (
    { logger, polling, debug },
    payload,
    { connection, driveId, folderId, includeSubfolders },
  ) => {
    const client = await createClient(connection, debug.enabled);

    let allChanges: PollSiteChangesSeparatedChanges = {};

    const stateKey = `${driveId}:${folderId}`;
    const pathKey = `${stateKey}:path`;
    const state = polling.getState();
    const deltaLink = state[stateKey];

    
    let folderPath = state[pathKey] as string | undefined;

    const endpoint = deltaLink ? deltaLink : `/drives/${driveId}/root/delta`;
    const data = (await paginateResults(
      client,
      endpoint as string,
      true,
      
      false,
      true,
    )) as unknown as DriveDeltaResponse;

    const newPollingState: PollingState = {};

    if (data.value.length > 0) {
      const separatedChanges: PollSiteChangesSeparatedChanges = {};

      
      const targetFolder = data.value.find((item) => item.id === folderId);
      if (targetFolder) {
        folderPath = targetFolder.parentReference?.path
          ? `${targetFolder.parentReference.path}/${targetFolder.name}`
          : `/root:/${targetFolder.name}`;
      }

      for (const change of data.value) {
        const isDeleted = Object.keys(change).includes("deleted");
        const isRoot = Object.keys(change).includes("root");

        if (isRoot) {
          continue;
        }

        const isFolderItself = change.id === folderId;
        const isDirectChild = change.parentReference?.id === folderId;

        let isMatch = false;
        if (includeSubfolders && folderPath) {
          
          const isWithinFolder = change.parentReference.path.includes(folderPath);
          isMatch = isFolderItself || isWithinFolder;
        } else {
          
          isMatch = isFolderItself || isDirectChild;
        }

        if (isMatch) {
          addDeleted({ isDeleted, separatedChanges, change });
          addUpdated({ isDeleted, separatedChanges, change });
          addCreated({ isDeleted, separatedChanges, change });
        }
      }
      allChanges = separatedChanges;
    }

    
    if (folderPath) {
      newPollingState[pathKey] = folderPath;
    }
    newPollingState[stateKey] = data["@odata.deltaLink"];

    polling.setState(newPollingState);

    if (debug.enabled) {
      logger.debug("Polling state:", newPollingState);
    }

    return Promise.resolve({
      payload: { ...payload, body: { data: allChanges } },
    });
  },
});
