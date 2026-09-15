import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUserRolesExamplePayload } from "../../examplePayloads";
import { listUserRolesInputs } from "../../inputs";
import { listUserRolesOutputSchema } from "../../outputSchemas";
import type { UserRoles } from "../../types";
import { fetchAllRecords } from "../../util";
export const listUserRoles = action({
  display: {
    label: "List User Roles",
    description: "Gets a list of user roles.",
  },
  inputs: listUserRolesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listUserRolesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
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
        page: pagination.page,
        pageSize: pagination.pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => listUserRolesExamplePayload,
  examplePayload: listUserRolesExamplePayload,
});
