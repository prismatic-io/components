import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { uploadFileExamplePayload as examplePayload } from "../../examplePayloads";
import { uploadFileInputs as inputs } from "../../inputs/assets";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a new file.",
  },
  perform: async (context, { connection, filename, size, chunkSize }) => {
    const mutation = gql`
      mutation uploadFile($input: UploadFileInput!) {
        uploadFile(input: $input) {
          id
          urls
        }
      }
    `;

    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, { input: { filename, size, chunkSize } });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
