import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { getCompanyInputs } from "../../inputs";
import { createClient } from "../../client";
import { getCompanyExamplePayload } from "../../examplePayloads";
import { getCompanyOutputSchema } from "../../outputSchemas";

export const getCompany = action({
  display: {
    label: "Get Company by ID",
    description: "Gets company metadata by ID.",
  },
  inputs: getCompanyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCompanyOutputSchema,
  }),
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.get(
      `/companies/${params.companyId}`,
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.SAFE,
  examplePayload: getCompanyExamplePayload,
});
