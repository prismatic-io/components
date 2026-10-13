import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listPriceBandsPayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import {
  company,
  connection,
  fetchAll,
  filterDataAfterDate,
  site,
} from "../../inputs/general";
import { filterDataChangedAfter } from "../../util";
export const listPriceBands = action({
  display: {
    label: "List Price Bands",
    description: "Retrieve a list of price bands",
  },
  perform: async (
    context,
    { connection, site, company, fetchAll, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await paginateResults({
      client,
      endpoint: "/price_bands",
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
  examplePayload: listPriceBandsPayload,
});
