import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listPoliciesDataSourceExamplePayload } from "../examplePayloads";
import { listPoliciesDataSourceInputs } from "../inputs";
import type { PoliciesResponse } from "../types";
import { generatePayload } from "../util";

export const listPolicies = dataSource({
  display: {
    label: "List Policies",
    description: "Returns all Policies.",
  },
  inputs: listPoliciesDataSourceInputs,
  perform: async (_context, { connectionInput, type }) => {
    const client = createClient(connectionInput, false);
    const json = {
      inputSettings: {
        type,
        adminOnly: false,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post<PoliciesResponse>("", generatedJson);

    if (data?.policyList?.length > 0) {
      const { policyList } = data;
      const result = policyList.map<Element>(({ name, id }) => ({
        label: name,
        key: id,
      }));
      return {
        result,
      };
    }

    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: listPoliciesDataSourceExamplePayload,
});
