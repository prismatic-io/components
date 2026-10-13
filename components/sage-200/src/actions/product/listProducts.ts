import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listProductsPayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import {
  company,
  connection,
  fetchAll,
  filterDataAfterDate,
  site,
} from "../../inputs/general";
import { filterDataChangedAfter } from "../../util";
export const listProducts = action({
  display: {
    label: "List Products",
    description: "Retrieve a list of products",
  },
  perform: async (
    context,
    { connection, site, company, fetchAll, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await paginateResults({
      client,
      endpoint: "/products",
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
  examplePayload: listProductsPayload,
});
