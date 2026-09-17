import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchFilesInputs } from "../../inputs";
import { searchFilesOutputSchema } from "../../outputSchemas";
import { escapeDriveQueryValue, getDriveQueryParams } from "../../util";
import { fetchFiles } from "../../util/pagination";
import { searchFilesExamplePayload } from "../../examplePayloads";
export const searchFiles = action({
  display: {
    label: "Search Files",
    description: "Search for an existing file by Name",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const drive = createClient(params.connection);
    let finalQuery = "";
    const nameQuery = params.filters.searchQuery
      ? params.filters.filesContainingSearchQuery
        ? `name contains '${escapeDriveQueryValue(params.filters.searchQuery)}'`
        : `name = '${escapeDriveQueryValue(params.filters.searchQuery)}'`
      : null;
    if (params.folderId) {
      finalQuery += `'${escapeDriveQueryValue(params.folderId)}' in parents`;
    }
    if (nameQuery) {
      if (params.folderId) {
        finalQuery += ` and `;
      }
      finalQuery += nameQuery;
    }
    const customQuery = params.filters.query;
    if (customQuery) {
      if (params.folderId || nameQuery) {
        finalQuery += ` and `;
      }
      finalQuery += customQuery;
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
    return {
      data,
    };
  },
  inputs: searchFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchFilesOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => searchFilesExamplePayload,
  examplePayload: searchFilesExamplePayload,
});
export default searchFiles;
