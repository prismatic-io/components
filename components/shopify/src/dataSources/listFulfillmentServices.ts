import { dataSource, util } from "@prismatic-io/spectral";
import listFulfillmentServicesQuery from "../actions/graphql/queries/fulfillmentServices/ListFulfillmentServicesDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { selectFulfillmentServicesInputs } from "../inputs";
import type { FulfillmentServiceRecord } from "../types";
export const listFulfillmentServices = dataSource({
  display: {
    label: "Select Fulfillment Service",
    description:
      "Selects a fulfillment service from a list of all fulfillment services.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );
    const data: {
      shop: {
        fulfillmentServices: FulfillmentServiceRecord[];
      };
    } = await client.request(listFulfillmentServicesQuery);
    const result = (data.shop.fulfillmentServices || []).map((service) => ({
      label: service.serviceName || service.id,
      key: util.types.toString(service.id),
    }));
    return { result };
  },
  inputs: selectFulfillmentServicesInputs,
  dataSourceType: "picklist",
});
