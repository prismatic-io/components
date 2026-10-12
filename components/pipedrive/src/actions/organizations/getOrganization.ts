import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getOrganizationSingleExamplePayload } from "../../examplePayloads";
import { singleOrganizationV2OutputSchema } from "../../outputSchemas";
export const getOrganization = action({
  display: {
    label: "Get Organization",
    description: "Gets details of an organization.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/organizations/${id}`);
    return { data };
  },
  inputs: getOrganizationInputs,
  examplePayload: getOrganizationSingleExamplePayload,
  examplePerform: async () => getOrganizationSingleExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: singleOrganizationV2OutputSchema,
  }),
});
