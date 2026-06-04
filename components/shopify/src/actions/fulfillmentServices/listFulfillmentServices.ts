import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { listFulfillmentServicesInputs } from "../../inputs";
import { listFulfillmentServicesExamplePayload } from "../../payloadExamples";

export const listFulfillmentServices = action({
  display: {
    label: "List Fulfillment Services (Deprecated)",
    description:
      "List all fulfillment services enabled on your platform. This version of the action is being deprecated. Please replace action with List Fulfillment Services.",
  },
  inputs: listFulfillmentServicesInputs,
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.get("/fulfillment_services", { params: { scope: params.scope } });
    return { data };
  },
  examplePayload: { data: listFulfillmentServicesExamplePayload },
});
