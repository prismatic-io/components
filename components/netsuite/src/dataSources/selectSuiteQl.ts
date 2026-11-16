import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { QUERY_SERVICE, SUITEQL_PATH } from "../constants";
import { selectSuiteQlExamplePayload } from "../examplePayloads";
import { selectSuiteQlInputs } from "../inputs";
import { suiteQlRequestBody } from "../utils";

export const selectSuiteQl = dataSource({
  display: {
    label: "Select SuiteQL",
    description: "Execute a SuiteQL query to create a picklist.",
  },
  inputs: selectSuiteQlInputs,
  examplePayload: selectSuiteQlExamplePayload,
  dataSourceType: "picklist",
  perform: async (
    _context,
    { connection, query, parameters, pagination, key, label },
  ) => {
    const client = await createClient(connection, QUERY_SERVICE, false);
    const { data } = await client.post(
      `${SUITEQL_PATH}?limit=${pagination.limit}&offset=${pagination.offset}`,
      suiteQlRequestBody(query, parameters),
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
