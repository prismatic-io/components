import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCompanyAddonsInputs } from "../../inputs";
import { getCompanyAddonsExamplePayload } from "../../examplePayloads";
import { getCompanyAddonsOutputSchema } from "../../outputSchemas";
export const getCompanyAddons = action({
  display: {
    label: "Get Company Addons",
    description: "Gets all add-ons for a single company.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/billing/subscriptions/addons");
    return { data };
  },
  inputs: getCompanyAddonsInputs,
  examplePayload: getCompanyAddonsExamplePayload,
  examplePerform: async () => getCompanyAddonsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCompanyAddonsOutputSchema,
  }),
});
