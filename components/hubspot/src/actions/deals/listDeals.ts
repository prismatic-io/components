import { action, outputSchema } from "@prismatic-io/spectral";
import { paginatedListSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listDealsExamplePayload } from "../../examplePayloads";
import { listDealsInputs } from "../../inputs";
import { getAllPaginatedData, getProps } from "../../util";
import { DEAL_PROPS } from "../../constants";
export const listDeals = action({
  display: {
    label: "List Deals",
    description: "Retrieve a list of all deals.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });
    const parameterizedProperties = getProps(
      DEAL_PROPS,
      params.additionalProperties || [],
    );
    const data = await getAllPaginatedData(
      client,
      "/crm/v3/objects/deals",
      params.fetchAll,
      false,
      {
        params: {
          ...parameterizedProperties,
          limit: params.pagination.limit,
          after: params.pagination.after,
          associations: params.associationsList,
          archived: params.archived,
        },
      },
    );
    return {
      data,
    };
  },
  inputs: listDealsInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listDealsExamplePayload.data,
  }),
  examplePayload: listDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paginatedListSchema,
  }),
});
