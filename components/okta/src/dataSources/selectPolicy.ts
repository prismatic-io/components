import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectPolicyExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import type { Policy } from "../interfaces/policies";

export const selectPolicy = dataSource({
  display: {
    label: "Select Policy",
    description: "A picklist of Policies in your Okta Org.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { data } = await client.get<Policy | Policy[]>("/policies");

    if (!Array.isArray(data)) {
      return {
        result: [
          {
            label: data.name,
            key: data.id,
          },
        ],
      };
    }
    const result = data.map<Element>((policy) => ({
      label: policy.name,
      key: policy.id,
    }));

    return {
      result,
    };
  },
  examplePayload: selectPolicyExamplePayload,
  dataSourceType: "picklist",
});
