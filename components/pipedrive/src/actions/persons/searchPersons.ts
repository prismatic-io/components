import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchPersonsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { searchPersonsExamplePayload } from "../../examplePayloads";
import { searchPersonsOutputSchema } from "../../outputSchemas";

export const searchPersons = action({
  display: {
    label: "Search Persons",
    description: "Searches persons.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      term,
      fields,
      exactMatch,
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
    const { data } = await client.get("/persons/search", {
      params: {
        term,
        fields,
        exact_match: exactMatch,
        organization_id: organizationId,
        include_fields: includeFields,
        limit,
        cursor,
      },
    });
    return { data };
  },
  inputs: searchPersonsInputs,
  examplePayload: searchPersonsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchPersonsOutputSchema,
  }),
});
