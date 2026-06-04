import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import deleteSalesOrderInputs from "../../inputs/salesOrder/deleteSalesOrderInputs";
import { emptyPayload } from "../../examplePayloads";

export const deleteSalesOrder = action({
  display: {
    label: "Delete Sales Order",
    description: "Delete an existing sales order by ID",
  },
  perform: async (context, { connection, site, company, salesOrderId }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.delete(`/sop_orders/${salesOrderId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...deleteSalesOrderInputs,
  },
  examplePayload: emptyPayload,
});
