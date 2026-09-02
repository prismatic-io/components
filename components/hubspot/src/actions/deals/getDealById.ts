import { action, outputSchema } from "@prismatic-io/spectral";
import { getDealByIdOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { getDealByIdInputs } from "../../inputs";
import { getProps } from "../../util";
import { DEAL_PROPS } from "../../constants";
export const getDealById = action({
  display: {
    label: "Get Deal",
    description:
      "Retrieve information and metadata about a deal by its Id or name.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      dealId,
      dealName,
      timeout,
      hubspotConnection,
      additionalProperties,
      archived,
      associationsList,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    if (!dealId && !dealName) {
      throw new Error(
        "You must supply an Id or deal name to retrieve a deal record.",
      );
    }
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const parameterizedProperties = getProps(
      DEAL_PROPS,
      additionalProperties || [],
    );
    const params = {
      ...parameterizedProperties,
      associations: associationsList,
      archived: archived,
    };
    if (dealName) {
      const result = await client.get("/crm/v3/objects/deals", {
        params,
      });
      const { results: deals } = result.data;
      const filteredDeals = (deals || []).filter((deal) => {
        return deal?.properties?.dealname === dealName;
      });
      if (filteredDeals.length === 0) {
        throw new Error(`No deals found matching ${dealName}`);
      }
      return { data: filteredDeals };
    }
    const { data } = await client.get(`/crm/v3/objects/deals/${dealId}`, {
      params,
    });
    return { data };
  },
  inputs: getDealByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealByIdOutputSchema,
  }),
});
