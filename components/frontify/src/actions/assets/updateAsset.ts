import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { updateAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { updateAssetInputs as inputs } from "../../inputs/assets";

export const updateAsset = action({
  display: {
    label: "Update Asset",
    description: "Update an existing Asset.",
  },
  perform: async (
    context,
    {
      connection,
      filename,
      title,
      description,
      author,
      assetId,
      copyrightNotice,
      copyrightStatus,
      expiresAt,
    },
  ) => {
    const mutation = gql`
      mutation updateAsset($input: UpdateAssetInput!) {
        updateAsset(input: $input) {
          asset {
            id
          }
        }
      }
    `;
    const createCopyrightInput =
      copyrightNotice && copyrightStatus
        ? {
            notice: copyrightNotice,
            status: copyrightStatus,
          }
        : undefined;

    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, {
      input: {
        id: assetId,
        data: {
          filename,
          title,
          description,
          author,
          copyright: createCopyrightInput,
          expiresAt,
        },
      },
    });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
