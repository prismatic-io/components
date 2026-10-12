import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchOrganizationInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { searchOrganizationExamplePayload } from "../../examplePayloads";
import { searchOrganizationOutputSchema } from "../../outputSchemas";
export const searchOrganization = action({
  display: {
    label: "Search Organization",
    description: "Searches organizations.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      term,
      fields,
      exactMatch,
      pagination: { limit, cursor } = {},
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/organizations/search", {
      params: { term, fields, exact_match: exactMatch, limit, cursor },
    });
    return { data };
  },
  inputs: searchOrganizationInputs,
  examplePayload: searchOrganizationExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchOrganizationOutputSchema,
  }),
});
