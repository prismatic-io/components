import { type Element, dataSource } from "@prismatic-io/spectral";
import { connectionInput, type } from "../inputs";
import { createClient } from "../client";
import { generatePayload } from "../util";
import type { Policies } from "../interfaces";

export const listPolicies = dataSource({
  display: {
    label: "List Policies",
    description: "Returns all Policies.",
  },
  inputs: {
    connectionInput,
    type,
  },
  perform: async (context, { connectionInput, type }) => {
    const client = createClient(connectionInput, false);
    const json = {
      inputSettings: {
        type: type || undefined,
        adminOnly: false,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post<Policies>("", generatedJson);

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
});
