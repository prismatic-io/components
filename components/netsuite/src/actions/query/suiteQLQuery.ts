import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { QUERY_SERVICE, SUITEQL_PATH } from "../../constants";
import { suiteQLQueryCustomersExamplePayload } from "../../examplePayloads";
import { suiteQLQueryInputs } from "../../inputs";
import { suiteQlQueryOutputSchema } from "../../outputSchemas";
import { suiteQlRequestBody } from "../../utils";

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
      QUERY_SERVICE,
      context.debug.enabled,
    );
    const { data, headers } = await client.post(
      `${SUITEQL_PATH}?limit=${params.pagination.limitInput}&offset=${params.pagination.offsetInput}`,
      suiteQlRequestBody(params.suiteQLInput, params.parameters),
    );
    return { data: { data, headers: headers as Record<string, string> } };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    suiteQLQueryCustomersExamplePayload,
});
