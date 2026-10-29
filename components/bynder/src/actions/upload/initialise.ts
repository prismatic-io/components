import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { initialiseUploadResponse } from "../../examplePayloads";
import { connection, name } from "../../inputs";

export const initialiseUpload = action({
  display: {
    label: "Initialize Upload",
    description: "Initialize a new file upload.",
  },
  inputs: {
    filename: {
      ...name,
      label: "Filename",
      comments: "Filename of new upload (extension required).",
      example: "image.jpeg",
      placeholder: "image.jpeg",
      required: true,
    },
    connection,
  },
  perform: async (context, { connection, filename }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.post(`/upload/init`, {
      filename,
    });
    return { data };
  },
  examplePayload: {
    data: initialiseUploadResponse,
  },
});
