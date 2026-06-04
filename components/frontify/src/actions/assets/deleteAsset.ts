import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { deleteAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteAssetInputs as inputs } from "../../inputs/assets";

export const deleteAsset = action({
  display: {
    label: "Delete Asset",
    description: "Delete an Asset.",
  },
  perform: async (context, { connection, ...configVars }) => {
    const mutation = gql`
      mutation deleteAsset($input: DeleteAssetInput!) {
        deleteAsset(input: $input) {
          id
        }
      }
    `;
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, { input: { id: configVars.assetId } });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
