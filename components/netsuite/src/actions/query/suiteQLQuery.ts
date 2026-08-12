import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { suiteQLQueryCustomersExamplePayload } from "../../examplePayloads";
import { suiteQLQueryInputs } from "../../inputs";
export const suiteQLQuery = action({
  display: {
    label: "SuiteQL Query",
    description:
      "Execute a SuiteQL query through NetSuite's REST Web Services.",
  },
  inputs: suiteQLQueryInputs,
  examplePayload: suiteQLQueryCustomersExamplePayload,
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      "query",
      context.debug.enabled,
    );
    const { data, headers } = await client.post(
      `/suiteql?limit=${params.pagination.limitInput}&offset=${params.pagination.offsetInput}`,
      {
        q: params.suiteQLInput,
      },
    );
    return { data: { data, headers: headers as Record<string, string> } };
  },
});
