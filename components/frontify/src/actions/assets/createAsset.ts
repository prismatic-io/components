import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { createAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { createAssetInputs as inputs } from "../../inputs/assets";

export const createAsset = action({
  display: {
    label: "Create Asset",
    description: "Create an Asset.",
  },
  perform: async (
    context,
    {
      connection,
      copyrightNotice,
      copyrightStatus,
      tags,
      author,
      description,
      directory,
      externalId,
      fileId,
      parentId,
      expiresAt,
      skipFileMetadata,
      title,
    },
  ) => {
    const createCopyrightInput = {
      notice: copyrightNotice,
      status: copyrightStatus,
    };

    const input = {
      author,
      description,
      directory,
      externalId,
      fileId,
      parentId,
      skipFileMetadata,
      title,
      expiresAt: expiresAt || null,
      copyright: createCopyrightInput,
      tags,
    };

    const mutation = gql`
      mutation createAsset($input: CreateAssetInput!) {
        createAsset(input: $input) {
          job {
            assetId
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
