import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createSalesOrderExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { salesOrderId } from "../../inputs/salesOrders/updateSalesOrderInputs";
import type { SalesOrder } from "../../interfaces";

export const getSalesOrder = action({
  display: {
    label: "Get Sales Order",
    description: "Retrieves a sales order object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, salesOrderId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const { data } = await client.get<SalesOrder>(
      `/companies(${companyId})/salesOrders(${salesOrderId})`,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    salesOrderId,
  },
  examplePayload: createSalesOrderExamplePayload,
});
