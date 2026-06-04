import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listUsersExamplePayload as examplePayload } from "../../examplePayloads";
import { listUsersInputs as inputs } from "../../inputs/account";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListUsersResponse from "../types/listUsers";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieve Users list for the current Account.",
  },
  perform: async (
    context,
    { connection, limit, page, fetchAll },
  ): Promise<{ data: ListUsersResponse }> => {
    const client = createClient({ connection, debug: context.debug.enabled });

    const query = gql`
      query GetAccountUsers($page: Int, $limit: Int) {
        account {
          users(page: $page, limit: $limit) {
            total
            page
            limit
            hasNextPage
            items {
              id
              email
              name
              avatar
            }
          }
        }
      }
    `;

    if (fetchAll) {
      const hasNextPath = ["account", "users", "hasNextPage"];
      const responses: ListUsersResponse[] = await graphqlFetchAll({
        client,
        query,
        hasNextPath,
      });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedUsers = responses.reduce((combined, response) => {
        return combined.concat(response.account.users.items);
      }, []);

      const formattedResponse: { data: ListUsersResponse } = {
        data: {
          account: {
            ...baseResponse.account,
            users: {
              ...baseResponse.account.users,
              items: combinedUsers,
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListUsersResponse = await client.request(query, {
      limit,
      page,
    });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
