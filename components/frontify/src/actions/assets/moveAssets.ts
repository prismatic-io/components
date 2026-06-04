import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { moveAssetsExamplePayload as examplePayload } from "../../examplePayloads";
import { moveAssetsInputs as inputs } from "../../inputs/assets";

export const moveAssets = action({
  display: {
    label: "Move Assets",
    description:
      "Move existing Asset item(s) to the given Library, Workspace or Folder destination. Only moves within the same Library/Workspace are supported by this operation.",
  },
  perform: async (context, { connection, ...input }) => {
    const mutation = gql`
      mutation moveAssets($input: MoveAssetsInput!) {
        moveAssets(input: $input) {
          assets {
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
