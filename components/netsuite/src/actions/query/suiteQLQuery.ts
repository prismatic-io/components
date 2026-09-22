import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { suiteQLQueryCustomersExamplePayload } from "../../examplePayloads";
import { suiteQLQueryInputs } from "../../inputs";
import { suiteQlQueryOutputSchema } from "../../outputSchemas";
export const suiteQLQuery = action({
  display: {
    label: "SuiteQL Query",
    description:
      "Execute a SuiteQL query through NetSuite's REST Web Services.",
  },
  inputs: suiteQLQueryInputs,
  examplePayload: suiteQLQueryCustomersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: suiteQlQueryOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => suiteQLQueryCustomersExamplePayload,
});
