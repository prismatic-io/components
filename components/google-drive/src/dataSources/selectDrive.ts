import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DRIVES_PAGE_SIZE, MY_DRIVE, MY_DRIVE_LABEL } from "../constants";
import { selectDriveInputs } from "../inputs";
import { fetchAllPages } from "../util/pagination";
import { selectDriveExamplePayload } from "../examplePayloads";
export const selectDrive = dataSource({
  display: {
    label: "Select Drive",
    description: "Select a drive.",
  },
  inputs: selectDriveInputs,
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const client = createClient(params.connection);
    const drives = await fetchAllPages(
      (pageToken) =>
        client.drives.list({ pageSize: DRIVES_PAGE_SIZE, pageToken }),
      (data) => data.drives,
    );
    return {
      result: [
        { key: MY_DRIVE, label: MY_DRIVE_LABEL },
        ...drives.map((drive) => ({ key: drive.id, label: drive.name })),
      ],
    };
  },
  examplePayload: selectDriveExamplePayload,
});
