import { dataSource } from "@prismatic-io/spectral";
import type { drive_v3 } from "@googleapis/drive/build/v3";
import { createClient } from "../client";
import { connection } from "../inputs";

const selectDrive = dataSource({
  display: {
    label: "Select Drive",
    description: "Select a drive",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const client = createClient(params.connection);
    let drives: drive_v3.Schema$Drive[] = [];
    const response = await client.drives.list({ pageSize: 100 });
    let nextPageToken = response.data.nextPageToken;
    drives = [...drives, ...response.data.drives];
    while (nextPageToken) {
      const response = await client.drives.list({
        pageToken: nextPageToken,
        pageSize: 100,
      });
      nextPageToken = response.data.nextPageToken;
      drives = [...drives, ...response.data.drives];
    }
    return {
      result: [
        { key: "my-drive", label: "My Drive" }, 
        ...drives.map((drive) => ({ key: drive.id, label: drive.name })),
      ],
    };
  },
});

export default { selectDrive };
