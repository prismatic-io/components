import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { DEFAULT_USER_PAGE_SIZE } from "../../constants";
import { listUserGroupsExamplePayload as examplePayload } from "../../examplePayloads";
import { listUserGroupsInputs as inputs } from "../../inputs/account";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListUserGroupsResponse from "../types/listUserGroups";

export const listUserGroups = action({
  display: {
    label: "List User Groups",
    description: "Retrieve UserGroups list for the current Account.",
  },
  perform: async (
    context,
    { connection, limit, page, userPage, userPageLimit, fetchAll },
  ): Promise<{ data: ListUserGroupsResponse }> => {
    const client = createClient({
      connection,
      debug: context.debug.enabled,
    });

    const query = gql`
      query ListUserGroups(
        $page: Int
        $limit: Int
        $userPage: Int
        $userPageLimit: Int
      ) {
        account {
          id
          userGroups(page: $page, limit: $limit) {
            total
            page
            limit
            hasNextPage
            items {
              id
              name
              users(page: $userPage, limit: $userPageLimit) {
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
        }
      }
    `;

    if (fetchAll) {
      const hasNextPath = ["account", "userGroups", "hasNextPage"];
      const params = {
        userPage: 1,
        userPageLimit: DEFAULT_USER_PAGE_SIZE,
      };

      const responses: ListUserGroupsResponse[] = await graphqlFetchAll({
        client,
        query,
        params,
        hasNextPath,
      });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedUserGroups = responses.reduce((combined, response) => {
        return combined.concat(response.account.userGroups.items);
      }, []);
      const data: { data: ListUserGroupsResponse } = {
        data: {
          account: {
            ...baseResponse.account,
            userGroups: {
              ...baseResponse.account.userGroups,
              items: combinedUserGroups,
            },
          },
        },
      };
      return data;
    }

    const response: ListUserGroupsResponse = await client.request(query, {
      limit,
      page,
      userPage,
      userPageLimit,
    });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
