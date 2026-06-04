import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import {
  connection,
  site,
  company,
  filterDataAfterDate,
} from "../../inputs/general";
import { listProductsPayload } from "../../examplePayloads";
import { filterDataChangedAfter } from "../../util";

export const listProducts = action({
  display: {
    label: "List Products",
    description: "Retrieve a list of products",
  },
  perform: async (
    context,
    { connection, site, company, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/products");
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
  examplePayload: listProductsPayload,
});
