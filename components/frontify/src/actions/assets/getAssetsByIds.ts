import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { getAssetsByIdsExamplePayload as examplePayload } from "../../examplePayloads";
import { getAssetsByIdsInputs as inputs } from "../../inputs/assets";

export const getAssetsByIds = action({
  display: {
    label: "Get Assets by IDs",
    description: "Retrieve a list of Assets by IDs.",
  },
  perform: async (context, { connection, assetIds }) => {
    const query = gql`
      query listAssets($assetIds: [ID!]!) {
        assets(ids: $assetIds) {
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
    }).request(query, {
      assetIds,
    });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
