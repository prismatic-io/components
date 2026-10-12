import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchLeadsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { searchLeadsExamplePayload } from "../../examplePayloads";
import { searchLeadsOutputSchema } from "../../outputSchemas";
export const searchLeads = action({
  display: {
    label: "Search Leads",
    description: "Searches leads.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      term,
      fields,
      exactMatch,
      personId,
      organizationId,
      includeFields,
      pagination: { limit, cursor } = {},
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/leads/search", {
      params: {
        term,
        fields,
        exact_match: exactMatch,
        person_id: personId,
        organization_id: organizationId,
        include_fields: includeFields,
        limit,
        cursor,
      },
    });
    return { data };
  },
  inputs: searchLeadsInputs,
  examplePayload: searchLeadsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchLeadsOutputSchema,
  }),
});
