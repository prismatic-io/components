import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { listFulfillmentServicesExamplePayload as examplePayload } from "../../../examplePayloads";
import { listFulfillmentServicesInputs as inputs } from "../../../inputsGql";
import listFulfillmentServicesQuery from "../queries/fulfillmentServices/ListFulfillmentServices.gql";

export const listFulfillmentServicesGql = action({
  display: {
    label: "List Fulfillment Services",
    description: "Lists all fulfillment services.",
  },
  inputs,
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { shop: Record<string, unknown> } = await client.request(
      listFulfillmentServicesQuery,
    );

    return {
      data: data.shop,
    };
  },
  examplePayload,
});
