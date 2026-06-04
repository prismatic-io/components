import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listRelatedAssetsExamplePayload as examplePayload } from "../../examplePayloads";
import { listRelatedAssetsInputs as inputs } from "../../inputs/assets";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListRelatedAssetsResponse from "../types/listRelatedAssets";

export const listRelatedAssets = action({
  display: {
    label: "List Related Assets",
    description: "Retrieve a list of assets that relate to a specific Asset.",
  },
  perform: async (
    context,
    { connection, assetId, page, limit, fetchAll },
  ): Promise<{ data: ListRelatedAssetsResponse }> => {
    const client = createClient({ connection, debug: context.debug.enabled });
    const query = gql`
      query listRelatedAssets($assetId: ID!, $page: Int, $limit: Int) {
        asset(id: $assetId) {
          id
          externalId
          relatedAssets(page: $page, limit: $limit) {
            total
            hasNextPage
            page
            limit
            items {
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
        }
      }
    `;

    if (fetchAll) {
      const hasNextPath = ["asset", "relatedAssets", "hasNextPage"];
      const responses: ListRelatedAssetsResponse[] = await graphqlFetchAll({
        client,
        query,
        params: { assetId },
        hasNextPath,
      });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedRelatedAssets = responses.reduce((combined, response) => {
        return combined.concat(response.asset.relatedAssets.items);
      }, []);

      const formattedResponse: { data: ListRelatedAssetsResponse } = {
        data: {
          asset: {
            ...baseResponse.asset,
            relatedAssets: {
              ...baseResponse.asset.relatedAssets,
              items: combinedRelatedAssets,
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListRelatedAssetsResponse = await client.request(query, {
      assetId,
      page,
      limit,
    });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
