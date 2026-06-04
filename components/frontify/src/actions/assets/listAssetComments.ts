import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listAssetCommentsExamplePayload as examplePayload } from "../../examplePayloads";
import { listAssetCommentsInputs as inputs } from "../../inputs/assets";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListAssetCommentsResponse from "../types/listAssetComments";

export const listAssetComments = action({
  display: {
    label: "List Asset Comments",
    description: "Retrieve a list of Comments relating to a given Asset.",
  },
  perform: async (
    context,
    { connection, assetId, page, limit, fetchAll, replyLimit },
  ): Promise<{ data: ListAssetCommentsResponse }> => {
    const client = createClient({ connection, debug: context.debug.enabled });

    const query = gql`
      query listAssetComments(
        $assetId: ID!
        $page: Int
        $limit: Int
        $query: AssetCommentQueryInput
        $replyLimit: Int
      ) {
        asset(id: $assetId) {
          id
          externalId
          comments(page: $page, limit: $limit, query: $query) {
            total
            page
            limit
            hasNextPage
            items {
              id
              creator {
                id
                email
                name
              }
              createdAt
              modifier {
                id
                email
                name
              }
              modifiedAt
              content
              mentionedUsers {
                id
                email
                name
              }
              isResolved
              replies(limit: $replyLimit) {
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
                  content
                  mentionedUsers {
                    email
                  }
                }
              }
              marking {
                position {
                  x
                  y
                }
                dimensions {
                  width
                  height
                }

                ... on MultiPageMarking {
                  page
                }

                ... on VideoMarking {
                  timeframe {
                    start
                    end
                  }
                }
              }
            }
          }
        }
      }
    `;

    if (fetchAll) {
      const hasNextPath = ["asset", "comments", "hasNextPage"];
      const responses: ListAssetCommentsResponse[] = await graphqlFetchAll({
        client,
        query,
        params: { assetId, replyLimit },
        hasNextPath,
      });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedAssetComments = responses.reduce((combined, response) => {
        return combined.concat(response.asset.comments.items);
      }, []);

      const formattedResponse: { data: ListAssetCommentsResponse } = {
        data: {
          asset: {
            ...baseResponse.asset,
            comments: {
              ...baseResponse.asset.comments,
              items: combinedAssetComments,
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListAssetCommentsResponse = await client.request(query, {
      assetId,
      page,
      limit,
      replyLimit,
    });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
