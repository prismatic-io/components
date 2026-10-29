import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { selectPolicyDataSourceExamplePayload } from "../examplePayloads/dataSources";

export const selectPolicy = dataSource({
  display: {
    label: "Select Policy",
    description: "Select a TeamViewer policy from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await client.get(`/teamviewerpolicies`);
    const result = (data.policies as []).map<Element>(
      ({ name, policy_id }) => ({
        label: name,
        key: policy_id,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectPolicyDataSourceExamplePayload,
  },
});
