import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import {
  connection,
  site,
  company,
  filterDataAfterDate,
} from "../../inputs/general";
import { listCustomerPriceBandsPayload } from "../../examplePayloads";
import { filterDataChangedAfter } from "../../util";

export const listCustomerPriceBands = action({
  display: {
    label: "List Customer Price Bands",
    description: "Retrieve a list of customer price bands",
  },
  perform: async (
    context,
    { connection, site, company, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/customer_price_bands");
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
  examplePayload: listCustomerPriceBandsPayload,
});
