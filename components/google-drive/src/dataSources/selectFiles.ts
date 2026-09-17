import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectFilesInputs } from "../inputs";
import { disambiguateElements, getDriveQueryParams } from "../util";
import { fetchFiles } from "../util/pagination";
import { selectFilesExamplePayload } from "../examplePayloads";
export const selectFiles = dataSource({
  display: {
    label: "List Files",
    description: "Lists all available files.",
  },
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const drive = createClient(params.connection);
    const { files } = await fetchFiles({
      drive,
      initialParams: {
        q: params.query,
        ...getDriveQueryParams(params.driveId),
        pageSize: params.pageSize,
        fields: "*",
      },
      fetchAll: true,
    });
    return {
      result: disambiguateElements(
        files.map((file) => ({ key: file.id, label: file.name })),
      ),
    };
  },
  inputs: selectFilesInputs,
  examplePayload: selectFilesExamplePayload,
});
