import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listFilesInputs } from "../../inputs";
import { listFilesOutputSchema } from "../../outputSchemas";
import { getDriveQueryParams } from "../../util";
import { fetchFiles } from "../../util/pagination";
import { listFilesExamplePayload } from "../../examplePayloads";
export const listFiles = action({
  display: {
    label: "List Files",
    description: "Lists all available files and directories",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const drive = createClient(params.connection);
    const data = await fetchFiles({
      drive,
      initialParams: {
        q: params.query,
        fields: params.fields || "*",
        pageToken: params.pagination.pageToken,
        pageSize: params.pagination.pageSize,
        ...getDriveQueryParams(params.driveId),
      },
      fetchAll: params.fetchAll,
    });
    return {
      data,
    };
  },
  inputs: listFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFilesOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listFilesExamplePayload,
  examplePayload: listFilesExamplePayload,
});
export default listFiles;
