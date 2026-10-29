import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonDealsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getPersonDealsExamplePayload } from "../../examplePayloads";
import { getPersonDealsOutputSchema } from "../../outputSchemas";

export const getPersonDeals = action({
  display: {
    label: "Get Person Deals",
    description: "Lists deals associated with a person.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      pagination: { limit, cursor } = {},
      status,
      sortBy,
      sortDirection,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/deals", {
      params: {
        limit,
        status,
        sort_by: sortBy,
        sort_direction: sortDirection,
        person_id: id,
        cursor,
      },
    });
    return { data };
  },
  inputs: getPersonDealsInputs,
  examplePayload: getPersonDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonDealsOutputSchema,
  }),
});
