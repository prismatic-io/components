import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import {
  connection,
  site,
  company,
  filterDataAfterDate,
} from "../../inputs/general";
import { listSalesOrderPayload } from "../../examplePayloads";
import { filterDataChangedAfter } from "../../util";

export const listSalesOrder = action({
  display: {
    label: "List Sales Order",
    description: "Retrieve a list of sales orders",
  },
  perform: async (
    context,
    { connection, site, company, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/sop_orders");
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
  examplePayload: listSalesOrderPayload,
});
