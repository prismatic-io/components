import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { updateFolderExamplePayload as examplePayload } from "../../examplePayloads";
import { updateFolderInputs as inputs } from "../../inputs/folder";

export const updateFolder = action({
  display: {
    label: "Update Folder",
    description: "Update an existing Folder.",
  },
  perform: async (context, { connection, folderId, name, description }) => {
    const input = {
      id: folderId,
      data: {
        name,
        description,
      },
    };

    const mutation = gql`
      mutation updateFolder($input: UpdateFolderInput!) {
        updateFolder(input: $input) {
          folder {
            id
          }
        }
      }
    `;

    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, { input });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
