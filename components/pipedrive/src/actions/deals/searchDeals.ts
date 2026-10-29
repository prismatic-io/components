import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchDealsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { searchDealsExamplePayload } from "../../examplePayloads";
import { searchDealsOutputSchema } from "../../outputSchemas";

export const searchDeals = action({
  display: {
    label: "Search Deals",
    description: "Searches deals.",
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
      status,
      includeFields,
      pagination: { limit, cursor } = {},
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/deals/search", {
      params: {
        term,
        fields,
        exact_match: exactMatch,
        person_id: personId,
        organization_id: organizationId,
        status,
        include_fields: includeFields,
        limit,
        cursor,
      },
    });
    return { data };
  },
  inputs: searchDealsInputs,
  examplePayload: searchDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchDealsOutputSchema,
  }),
});
