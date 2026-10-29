import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectGroupInputs } from "../inputs";

export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "Select a group from the Smartsheet account.",
  },
  dataSourceType: "picklist",
  inputs: selectGroupInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { data: groups },
    } = await client.get("/groups", {
      params: { includeAll: true },
    });

    if (!groups || !Array.isArray(groups)) {
      return { result: [] };
    }

    const result: Element[] = groups.map(({ name: label, id: key }) => ({
      label,
      key: util.types.toString(key),
    }));

    return { result };
  },
});
