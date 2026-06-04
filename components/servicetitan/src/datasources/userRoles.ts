import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { userRolesDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { UserRoles } from "../interfaces";

export const selectUserRole = dataSource({
  display: {
    label: "Select User Role",
    description:
      "Select a user role from a dropdown menu (up to 10,000 user roles)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "settings");
    let userRoles: UserRoles[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/user-roles`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      userRoles = [...userRoles, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    const objects = userRoles
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map<Element>((role) => ({
        key: role.id.toString(),
        label: `${role.name} (ID: ${role.id})`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: userRolesDatasource,
  },
});
