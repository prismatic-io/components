import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectSuiteQlInputs } from "../inputs";

export const selectSuiteQl = dataSource({
  display: {
    label: "Select SuiteQL",
    description: "Execute a SuiteQL Query to create a picklist",
  },
  inputs: selectSuiteQlInputs,
  dataSourceType: "picklist",
  perform: async (
    _context,
    { connection, query, limit, offset, key, label },
  ) => {
    const client = await createClient(connection, "query", false);
    const { data } = await client.post(
      `/suiteql?limit=${limit}&offset=${offset}`,
      {
        q: query,
      },
    );
    const items: Record<string, string>[] = data.items;

    return {
      result: items.map<Element>((item) => ({
        key: item[key],
        label: item[label],
      })),
    };
  },
});
