import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listUserRolesResponse } from "../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../inputs";
import type { UserRoles } from "../interfaces";
import { fetchAllRecords } from "../util";

export const listUserRoles = action({
  display: {
    label: "List User Roles",
    description: "Gets a list of user roles",
  },
  inputs: {
    connection,
    fetchAll,
    page,
    pageSize,
    includeTotal,
    sort,
    customQueryParams,
  },
  perform: async (
    context,
    {
      connection,
      page,
      pageSize,
      includeTotal,
      sort,
      customQueryParams,
      fetchAll,
    },
  ) => {
    const client = createClient(connection, "settings", context.debug.enabled);

    if (fetchAll) {
      const data = await fetchAllRecords<UserRoles>(client, "/user-roles", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/user-roles`, {
      params: {
        page,
        pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listUserRolesResponse,
  },
});
