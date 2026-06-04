import { dataSource } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectCustomersInputs } from "../inputs";

export const selectCustomers = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Customer",
    description: "A picklist of customers in the ShipStation account.",
  },
  inputs: selectCustomersInputs,
  perform: async (_context, { connectionInput, ...params }) => {
    const client = createShipStationClient(connectionInput);

    const queryParameters = {
      stateCode: params.stateCode || undefined,
      countryCode: params.countryCode || undefined,
      marketplaceId: params.marketplaceId || undefined,
      tagId: params.tagId || undefined,
      sortBy: params.sortBy || undefined,
      sortDir: params.sortDir || undefined,
      page: params.page || undefined,
      pageSize: params.pageSize || undefined,
    };

    const { data } = await client.get("/customers", {
      params: queryParameters,
    });

    return {
      result: data.customers.map(
        (customer: { customerId: string; name: string }) => ({
          key: customer.customerId,
          label: customer.name,
        }),
      ),
    };
  },
});
