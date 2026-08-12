import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectSuiteQlInputs } from "../inputs";
export const selectSuiteQl = dataSource({
  display: {
    label: "Select SuiteQL",
    description: "Execute a SuiteQL query to create a picklist.",
  },
  inputs: selectSuiteQlInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection, query, pagination, key, label }) => {
    const client = await createClient(connection, "query", false);
    const { data } = await client.post(
      `/suiteql?limit=${pagination.limit}&offset=${pagination.offset}`,
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
