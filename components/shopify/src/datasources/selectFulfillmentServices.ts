import { dataSource, util } from "@prismatic-io/spectral";
import listFulfillmentServicesQuery from "../actions/graphql/queries/fulfillmentServices/ListFulfillmentServicesDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { selectFulfillmentServicesInputs as inputs } from "../inputsGql";

interface FulfillmentServiceRecord {
  id: string;
  serviceName: string;
}

export const selectFulfillmentServices = dataSource({
  display: {
    label: "Select Fulfillment Services",
    description: "A picklist of all fulfillment services.",
  },
  perform: async (_context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);

    const data: {
      shop: { fulfillmentServices: FulfillmentServiceRecord[] };
    } = await client.request(listFulfillmentServicesQuery);

    const result = (data.shop.fulfillmentServices || []).map((service) => ({
      label: service.serviceName || service.id,
      key: util.types.toString(service.id),
    }));
    return { result };
  },
  inputs,
  dataSourceType: "picklist",
});
