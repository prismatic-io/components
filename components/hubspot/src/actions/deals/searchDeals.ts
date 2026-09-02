import { action, outputSchema } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { DEAL_SEARCH_PROPS } from "../../constants";
import { searchDealsExamplePayload } from "../../examplePayloads";
import { searchDealsInputs } from "../../inputs";
import { searchResponseSchema } from "../../outputSchemas";
export const searchDeals = action({
  display: {
    label: "Search Deals",
    description: "Returns a list of deals that match the given properties.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });
    const { data } = await client.post("/crm/v3/objects/deals/search", {
      filterGroups: [
        {
          filters: [
            {
              propertyName: params.propertyName,
              operator: params.operator,
              value: params.value,
            },
          ],
        },
      ],
      properties: DEAL_SEARCH_PROPS,
      limit: params.pagination.limit,
      after: params.pagination.after,
    });
    return { data };
  },
  inputs: searchDealsInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: searchDealsExamplePayload.data,
  }),
  examplePayload: searchDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchResponseSchema,
  }),
});
