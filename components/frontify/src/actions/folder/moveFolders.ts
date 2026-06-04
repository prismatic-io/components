import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { moveFoldersExamplePayload as examplePayload } from "../../examplePayloads";
import { moveFoldersInputs as inputs } from "../../inputs/folder";

export const moveFolders = action({
  display: {
    label: "Move Folders",
    description:
      "Move existing Folder item(s) to the given Library, Workspace or Folder destination. Only moves within the same Library/Workspace are supported by this operation.",
  },
  perform: async (context, { connection, ...input }) => {
    const mutation = gql`
      mutation moveFolders($input: MoveFoldersInput!) {
        moveFolders(input: $input) {
          ids
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
