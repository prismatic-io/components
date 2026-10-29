import { dataSource } from "@prismatic-io/spectral";
import { createDriveClient } from "../client";
import { fetchFiles } from "../helpers";
import { connectionInput } from "../inputs";

export const selectSpreadsheet = dataSource({
  display: {
    label: "Select Spreadsheet",
    description: "Select a Spreadsheet",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const drive = createDriveClient(connection);

    const { files } = await fetchFiles({
      drive,
      initialParams: {
        q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
        fields: "files(id, name, modifiedTime)",
        orderBy: "modifiedTime desc",
      },
      fetchAll: true,
    });

    return {
      result: files.map((file) => ({ key: file.id, label: file.name })),
    };
  },
  inputs: { connection: connectionInput },
});
