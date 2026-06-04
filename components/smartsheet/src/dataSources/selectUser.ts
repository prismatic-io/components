import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserInputs } from "../inputs";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from the Smartsheet account.",
  },
  dataSourceType: "picklist",
  inputs: selectUserInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { data: users },
    } = await client.get("/users", {
      params: { includeAll: true },
    });

    if (!users || !Array.isArray(users)) {
      return { result: [] };
    }

    const result: Element[] = users
      .map((user: { name?: string; email?: string; id: string | number }) => ({
        label: user.name || user.email || String(user.id),
        key: util.types.toString(user.id),
      }))
      .sort((a: Element, b: Element) =>
        (a.label ?? "") < (b.label ?? "") ? -1 : 1,
      );

    return { result };
  },
});
