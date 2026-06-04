import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import getItemsOnSalesOrderInputs from "../../inputs/salesOrder/getItemsOnSalesOrderInputs";
import { getItemsOnSalesOrderPayload } from "../../examplePayloads";

export const getItemsOnSalesOrder = action({
  display: {
    label: "Get Items on a Sales Order",
    description: "Retrieve a list of items attached to a sales order",
  },
  perform: async (context, { connection, site, company, orderLineId }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(`/sop_order_lines/${orderLineId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...getItemsOnSalesOrderInputs,
  },
  examplePayload: getItemsOnSalesOrderPayload,
});
