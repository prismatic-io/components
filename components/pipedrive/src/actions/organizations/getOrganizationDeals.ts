import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationDealsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getOrganizationDealsExamplePayload } from "../../examplePayloads";
import { getOrganizationDealsOutputSchema } from "../../outputSchemas";
export const getOrganizationDeals = action({
  display: {
    label: "Get Organization Deals",
    description: "Lists deals associated with an organization.",
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
        org_id: id,
        cursor,
      },
    });
    return { data };
  },
  inputs: getOrganizationDealsInputs,
  examplePayload: getOrganizationDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationDealsOutputSchema,
  }),
});
