import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listWebhooksExamplePayload as examplePayload } from "../../examplePayloads";
import { listWebhooksInputs as inputs } from "../../inputs/webhooks";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListWebhooksResponse from "../types/listWebhooks";


export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieve WebhookItems related to current Account.",
  },
  perform: async (
    context,
    { connection, page, limit, fetchAll },
  ): Promise<{ data: ListWebhooksResponse }> => {
    const query = gql`
      query listWebhooks($limit: Int, $page: Int) {
        webhooks(limit: $limit, page: $page) {
          total
          page
          limit
          hasNextPage
          items {
            id
            creator {
              id
              name
              email
            }
            createdAt
            name
            notificationUrl
            secret
            ... on ProjectWebhook {
              __typename
              project {
                ... on MediaLibrary {
                  id
                }
                ... on IconLibrary {
                  id
                }
                ... on LogoLibrary {
                  id
                }
                ... on DocumentLibrary {
                  id
                }
                ... on Workspace {
                  id
                }
              }
            }
          }
        }
      }
    `;

    const client = createClient({ connection, debug: context.debug.enabled });

    if (fetchAll) {
      const hasNextPath = ["webhooks", "hasNextPage"];
      const responses: ListWebhooksResponse[] = await graphqlFetchAll({
        client,
        query,
        hasNextPath,
      });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedWebhooks = responses.reduce((combined, response) => {
        return combined.concat(response.webhooks.items);
      }, []);

      const formattedResponse: { data: ListWebhooksResponse } = {
        data: {
          webhooks: {
            ...baseResponse.webhooks,
            items: combinedWebhooks,
          },
        },
      };

      return formattedResponse;
    }

    const response: ListWebhooksResponse = await client.request(query, {
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
