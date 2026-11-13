import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { GRAPH_FANOUT_CONCURRENCY } from "../constants";
import { selectFoldersFromDrivesExamplePayload } from "../examplePayloads";
import { selectFoldersFromDrivesInputs } from "../inputs";
import type { Drive, DriveItem } from "../types";
import {
  fetchAllPages,
  listForParent,
  mapWithConcurrency,
  nameOrId,
  parentLabel,
  sortElements,
  toFolderKey,
  toObjectSelection,
  withParentLabel,
} from "../util";

export const selectFoldersFromDrives = dataSource({
  display: {
    label: "Select Folders from Drives",
    description:
      "Select one or many top-level folders from the specified drives. Each key is the drive ID and the folder ID joined by a colon.",
  },
  inputs: selectFoldersFromDrivesInputs,
  perform: async (context, { connection, driveIds }) => {
    const client = getOneDriveClient(connection, false);
    const multipleDrives = driveIds.length > 1;

    const foldersByDrive = await mapWithConcurrency(
      driveIds,
      GRAPH_FANOUT_CONCURRENCY,
      (drive) =>
        listForParent<Element>(
          drive,
          { kind: "drive", canSkip: multipleDrives, logger: context.logger },
          async () => {
            const driveName = multipleDrives
              ? await parentLabel(drive, async () => {
                  const { data } = await client.get<Drive>(
                    `/drives/${drive.id}`,
                    { params: { $select: "name" } },
                  );
                  return data.name;
                })
              : undefined;
            const items = await fetchAllPages<DriveItem>(
              client,
              `/drives/${drive.id}/root/children`,
            );
            return items
              .filter((item) => item.folder !== undefined)
              .map<Element>((item) => ({
                key: toFolderKey(drive.id, item.id),
                label: withParentLabel(nameOrId(item.name, item.id), driveName),
              }));
          },
        ),
    );

    return {
      result: toObjectSelection(sortElements(foldersByDrive.flat())),
    };
  },
  examplePayload: selectFoldersFromDrivesExamplePayload,
  dataSourceType: "objectSelection",
});
