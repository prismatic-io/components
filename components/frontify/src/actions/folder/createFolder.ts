import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { createFolderExamplePayload as examplePayload } from "../../examplePayloads";
import { createFolderInputs as inputs } from "../../inputs/folder";

export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a new Folder.",
  },
  perform: async (context, { connection, ...input }) => {
    const mutation = gql`
      mutation createFolder($input: CreateFolderInput!) {
        createFolder(input: $input) {
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
