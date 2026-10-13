import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getSalesOrderPayload } from "../../examplePayloads";
import { company, connection, site } from "../../inputs/general";
import getSalesOrderInputs from "../../inputs/salesOrder/getSalesOrderInputs";
export const getSalesOrder = action({
  display: {
    label: "Get Sales Order",
    description: "Retrieve an existing sales order by ID",
  },
  perform: async (context, { connection, site, company, salesOrderId }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(`/sop_orders/${salesOrderId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...getSalesOrderInputs,
  },
  examplePayload: getSalesOrderPayload,
});
