import { action, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import {
  createDealPayload,
  deleteDealPayload,
  listDealsPayload,
  searchDealsPayload,
  updateDealPayload,
} from "../examplePayloads";
import {
  additionalProperties,
  after,
  amount,
  archived,
  associationsList,
  closeDate,
  connectionInput,
  dealId,
  dealName,
  dealStage,
  dealType,
  dynamicValues,
  fetchAll,
  fieldValues,
  hubspotOwnerId,
  limit,
  operator,
  pipeline,
  priority,
  propertyName,
  timeout,
  updateDealName,
  updateDealStage,
  updatePipeline,
  value,
} from "../inputs";
import { getAllPaginatedData, getProps, toStringList } from "../util";

const dealProps = ["dealname", "closedate", "dealstage"];

export const listDeals = action({
  display: {
    label: "List Deals",
    description: "Retrieve a list of all deals",
  },
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(dealProps, params.additionalProperties || []);

    return {
      data: await getAllPaginatedData(client, "/crm/v3/objects/deals", params.fetchAll, false, {
        params: {
          ...parameterizedProperties,
          limit: util.types.toInt(params.limit) || undefined,
          after: util.types.toString(params.after) || undefined,
          associations: toStringList(params.associationsList || []).join(",") || undefined,
          archived: util.types.toBool(params.archived) || false,
        },
      }),
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    archived,
    additionalProperties,
    associationsList,
    timeout,
    fetchAll,
    limit,
    after,
  },
  examplePayload: listDealsPayload,
});

export const getDealById = action({
  display: {
    label: "Get Deal",
    description: "Retrieve information and metadata about a deal by its Id or name",
  },
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

    const id = util.types.toString(dealId);
    const name = util.types.toString(dealName);

    if (!id && !name) {
      throw new Error("You must supply an Id or deal name to retrieve a deal record.");
    }
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(dealProps, additionalProperties || []);

    const params = {
      ...parameterizedProperties,
      associations: toStringList(associationsList || []).join(",") || undefined,
      archived: util.types.toBool(archived) || false,
    };

    if (name) {
      const result = await client.get("/crm/v3/objects/deals", {
        params,
      });
      const { results: deals } = result.data;

      const filteredDeals = (deals || []).filter((deal) => {
        return deal?.properties?.dealname === name;
      });

      if (filteredDeals.length === 0) {
        throw new Error(`No deals found matching ${name}`);
      }
      return { data: filteredDeals };
    }

    return {
      data: (
        await client.get(`/crm/v3/objects/deals/${dealId}`, {
          params,
        })
      ).data,
    };
  },
  inputs: {
    dealId: { ...dealId, required: false },
    dealName: { ...dealName, required: false },
    additionalProperties,
    associationsList,
    archived,
    timeout,
    hubspotConnection: connectionInput,
  },
  
});

export const deleteDeal = action({
  display: {
    label: "Delete Deal",
    description: "Delete a deal by its Id",
  },
  perform: async (context, { dealId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (await client.delete(`/crm/v3/objects/deals/${dealId}`)).data,
    };
  },
  inputs: {
    dealId,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: deleteDealPayload,
});

export const searchDeals = action({
  display: {
    label: "Search Deals",
    description: "Returns a list of deals that match the given properties",
  },
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });

    return {
      data: await (
        await client.post("/crm/v3/objects/deals/search", {
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
          properties: [
            "hs_object_id",
            "createdate",
            "hubspot_owner_id",
            "dealstage",
            "amount",
            "dealname",
            "closedate",
            "days_to_close",
            "hs_analytics_source",
            "hs_analytics_source_data_1",
            "hs_analytics_source_data_2",
            "hs_campaign",
            "hs_closed_amount",
            "hs_lastmodifieddate",
            "dealtype",
            "description",
          ],
          limit: params.limit || 100,
          after: params.after || undefined,
        })
      ).data,
    };
  },
  inputs: {
    propertyName,
    value,
    operator,
    limit,
    after,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: searchDealsPayload,
});

export const createDeal = action({
  display: {
    label: "Create Deal",
    description: "Create a new deal",
  },
  perform: async (
    context,
    {
      amount,
      closeDate,
      dealName,
      dealStage,
      hubspotOwnerId,
      pipeline,
      priority,
      dealType,
      timeout,
      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.post("/crm/v3/objects/deals", {
          properties: {
            amount,
            closedate: closeDate,
            dealname: dealName,
            dealstage: dealStage,
            hubspot_owner_id: hubspotOwnerId,
            pipeline,
            dealtype: dealType,
            hs_priority: priority,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    amount,
    closeDate,
    dealName,
    hubspotOwnerId,
    pipeline,
    dealStage,
    priority,
    dealType,
    fieldValues,
    dynamicValues,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: createDealPayload,
});

export const updateDeal = action({
  display: {
    label: "Update Deal",
    description: "Update the information or metadata of an existing deal",
  },
  perform: async (
    context,
    {
      dealId,
      amount,
      closeDate,
      updateDealName,
      hubspotOwnerId,
      updatePipeline,
      updateDealStage,
      priority,
      dealType,
      timeout,

      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.patch(`/crm/v3/objects/deals/${dealId}`, {
          properties: {
            amount,
            closedate: closeDate || undefined,
            dealname: updateDealName || undefined,
            dealstage: updateDealStage || undefined,
            hubspot_owner_id: hubspotOwnerId || undefined,
            pipeline: updatePipeline || undefined,
            dealtype: dealType || undefined,
            hs_priority: priority || undefined,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    dealId,
    amount,
    closeDate,
    updateDealName,
    hubspotOwnerId,
    updatePipeline,
    updateDealStage,
    priority,
    dealType,
    fieldValues,
    dynamicValues,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: updateDealPayload,
});
