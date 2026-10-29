import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { deleteFoldersExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteFoldersInputs as inputs } from "../../inputs/folder";

export const deleteFolders = action({
  display: {
    label: "Delete Folders",
    description: "Delete existing Folders.",
  },
  perform: async (context, { connection, folderIds }) => {
    const mutation = gql`
      mutation deleteFolders($input: DeleteFoldersInput!) {
        deleteFolders(input: $input) {
          ids
        }
      }
    `;
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, { input: { ids: folderIds } });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
