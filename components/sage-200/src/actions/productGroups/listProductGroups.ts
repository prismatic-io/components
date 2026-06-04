import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import {
  connection,
  site,
  company,
  filterDataAfterDate,
} from "../../inputs/general";
import { listProductGroupsPayload } from "../../examplePayloads";
import { filterDataChangedAfter } from "../../util";

export const listProductGroups = action({
  display: {
    label: "List Product Groups",
    description: "Retrieve a list of product groups",
  },
  perform: async (
    context,
    { connection, site, company, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/product_groups");
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
  examplePayload: listProductGroupsPayload,
});
