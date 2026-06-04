import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { listOrdersInputs } from "../../inputs";
import { listOrdersExamplePayload } from "../../payloadExamples";
import { computePageInformation } from "../../util";

export const listOrders = action({
  display: {
    label: "List Orders (Deprecated)",
    description:
      "List all orders. This version of the action is being deprecated. Please replace action with List Orders.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const result = await computePageInformation(
      client,
      "/orders",
      {
        attribution_app_id: params.attributionAppId || undefined,
        created_at_max: params.createdAtMax || undefined,
        created_at_min: params.created_at_min || undefined,
        fields: params.fields || undefined,
        financial_status: params.financialStatus || undefined,
        fulfillment_status: params.fulfillmentStatus || undefined,
        ids: params.commaSeparatedIds || undefined,
        limit: params.limit,
        processed_at_max: params.processedAtMax || undefined,
        processed_at_min: params.processedAtMin || undefined,
        since_id: params.sinceId || undefined,
        status: params.orderStatus || undefined,
        updated_at_max: params.updatedAtMax || undefined,
        updated_at_min: params.updatedAtMin,
        page_info: params.pageInfo || undefined,
      },
      params.getAlldata,
    );

    return {
      data: result as unknown,
    };
  },
  examplePayload: {
    data: listOrdersExamplePayload,
  },
  inputs: listOrdersInputs,
});
