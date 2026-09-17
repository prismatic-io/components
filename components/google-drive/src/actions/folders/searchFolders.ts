import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { FOLDER_QUERY } from "../../constants";
import { searchFoldersInputs } from "../../inputs";
import { searchFoldersOutputSchema } from "../../outputSchemas";
import { escapeDriveQueryValue, getDriveQueryParams } from "../../util";
import { fetchFiles } from "../../util/pagination";
import { searchFoldersExamplePayload } from "../../examplePayloads";
export const searchFolders = action({
  display: {
    label: "Search Folders",
    description: "Search for an existing directory by Name",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const drive = createClient(params.connection);
    let finalQuery = "";
    if (params.folderId) {
      finalQuery += `'${escapeDriveQueryValue(params.folderId)}' in parents and `;
    }
    finalQuery += FOLDER_QUERY;
    if (params.searchQuery) {
      finalQuery += ` and name contains '${escapeDriveQueryValue(params.searchQuery)}'`;
    }
    const data = await fetchFiles({
      drive,
      initialParams: {
        q: finalQuery,
        fields: params.fields,
        pageToken: params.pagination.pageToken,
        pageSize: params.pagination.pageSize,
        ...getDriveQueryParams(params.driveId),
      },
      fetchAll: params.fetchAll,
    });
    if (data.files.length === 0) {
      throw new Error(`No results found for query: ${finalQuery}`);
    }
    return { data };
  },
  inputs: searchFoldersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchFoldersOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => searchFoldersExamplePayload,
  examplePayload: searchFoldersExamplePayload,
});
export default searchFolders;
