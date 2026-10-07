import { action, outputSchema } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { API_UPLOAD_URL } from "../../constants";
import { uploadFileExamplePayload } from "../../examplePayloads";
import { uploadFileInputs } from "../../inputs";
import { uploadFileOutputSchema } from "../../outputSchemas";
export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Uploads a file to temporary file storage.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId, fileContents }) => {
    const client = createApiClient(
      connection,
      context.debug.enabled,
      API_UPLOAD_URL,
    );
    const { data } = await client.post(
      `/spaces/${spaceId}/uploads`,
      fileContents.data,
      {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => uploadFileExamplePayload,
  inputs: uploadFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadFileOutputSchema,
  }),
  examplePayload: uploadFileExamplePayload,
});
