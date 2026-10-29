import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listProductGroupsPayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import {
  company,
  connection,
  fetchAll,
  filterDataAfterDate,
  site,
} from "../../inputs/general";
import { filterDataChangedAfter } from "../../util";

export const listProductGroups = action({
  display: {
    label: "List Product Groups",
    description: "Retrieve a list of product groups",
  },
  perform: async (
    context,
    { connection, site, company, fetchAll, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await paginateResults({
      client,
      endpoint: "/product_groups",
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
  examplePayload: listProductGroupsPayload,
});
