import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { getAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { getAssetInputs as inputs } from "../../inputs/assets";

export const getAsset = action({
  display: {
    label: "Get Asset",
    description: "Retrieve an Asset by ID.",
  },
  perform: async (context, { connection, assetId }) => {
    const query = gql`
      query getAsset($assetId: ID!) {
        asset(id: $assetId) {
          id
          creator {
            id
            name
            email
          }
          createdAt
          modifier {
            id
            name
            email
          }
          modifiedAt
          title
          description
          attachments {
            id
            creator {
              id
              name
              email
            }
            createdAt
            modifier {
              id
              name
              email
            }
            modifiedAt
            name
            filename
            type
            externalId
            extension
            size
            downloadUrl
          }
          externalId
          tags {
            value
            source
          }
          copyright {
            status
            notice
          }
          expiresAt
          licenses {
            id
            title
            license
            addByDefault
            requireConsensus
          }
          status
          relatedAssets {
            total
          }
          comments {
            total
          }
          customMetadata {
            ... on CustomMetadataValue {
              value
            }
            ... on CustomMetadataValues {
              values
            }
            property {
              id
              creator {
                id
                name
                email
              }
              createdAt
              modifier {
                id
                name
                email
              }
              modifiedAt
              name
              type {
                name
              }
              helpText
              isRequired
              defaultValue
            }
          }
          location {
            brand {
              id
              name
            }
            library {
              id
              name
            }
            workspaceProject {
              id
              name
            }
            folder {
              id
              name
            }
          }
        }
      }
    `;

    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(query, { assetId });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
