import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import {
  connection,
  site,
  company,
  filterDataAfterDate,
} from "../../inputs/general";
import { listCustomerDeliveryAddressesPayload } from "../../examplePayloads";
import { filterDataChangedAfter } from "../../util";

export const listCustomerDeliveryAddresses = action({
  display: {
    label: "List Customer Delivery Addresses",
    description: "Retrieve a list of customer delivery addresses",
  },
  perform: async (
    context,
    { connection, site, company, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/customer_delivery_addresses");
    return {
      data: filterDataAfterDate
        ? filterDataChangedAfter(data, filterDataAfterDate)
        : data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    filterDataAfterDate,
  },
  examplePayload: listCustomerDeliveryAddressesPayload,
});
