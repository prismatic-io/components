import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listCustomerDeliveryAddressesPayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import {
  company,
  connection,
  fetchAll,
  filterDataAfterDate,
  site,
} from "../../inputs/general";
import { filterDataChangedAfter } from "../../util";
export const listCustomerDeliveryAddresses = action({
  display: {
    label: "List Customer Delivery Addresses",
    description: "Retrieve a list of customer delivery addresses",
  },
  perform: async (
    context,
    { connection, site, company, fetchAll, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await paginateResults({
      client,
      endpoint: "/customer_delivery_addresses",
      fetchAll,
    });
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
    fetchAll,
    filterDataAfterDate,
  },
  examplePayload: listCustomerDeliveryAddressesPayload,
});
