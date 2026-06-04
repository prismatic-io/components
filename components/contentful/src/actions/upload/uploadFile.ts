import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { API_UPLOAD_URL } from "../../constants";
import { uploadFileExamplePayload } from "../../examplePayloads";
import { uploadFileInputs } from "../../inputs";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Uploads a file to temporary file storage.",
  },
  perform: async (context, { connection, spaceId, fileContents }) => {
    const client = createApiClient(
      connection,
      context.debug.enabled,
      API_UPLOAD_URL,
    );
    const { data } = await client.post(
      `/spaces/${spaceId}/uploads`,
      fileContents,
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
  inputs: uploadFileInputs,
  examplePayload: { data: uploadFileExamplePayload },
});
