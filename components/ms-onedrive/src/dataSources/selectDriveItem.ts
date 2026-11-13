import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { selectDriveItemExamplePayload } from "../examplePayloads";
import { selectDriveItemInputs } from "../inputs";
import type { DriveItem } from "../types";
import { fetchAllPages, nameOrId, sortElements } from "../util";

export const selectDriveItem = dataSource({
  display: {
    label: "Select Drive Item",
    description:
      "A picklist of the files and folders at the top level of the specified drive.",
  },
  inputs: selectDriveItemInputs,
  perform: async (_context, { connection, driveId }) => {
    const client = getOneDriveClient(connection, false);
    const items = await fetchAllPages<DriveItem>(
      client,
      `/drives/${driveId}/root/children`,
    );

    return {
      result: sortElements(
        items.map<Element>((item) => ({
          key: item.id,
          label: nameOrId(item.name, item.id),
        })),
      ),
    };
  },
  examplePayload: selectDriveItemExamplePayload,
  dataSourceType: "picklist",
});
