import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { salesOrderId } from "../../inputs/salesOrders/updateSalesOrderInputs";

export const deleteSalesOrder = action({
  display: {
    label: "Delete Sales Order",
    description: "Deletes a sales order object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, salesOrderId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    await client.delete(`/companies(${companyId})/salesOrders(${salesOrderId})`);

    return SUCCESS_PAYLOAD;
  },
  inputs: {
    connection: connectionInput,
    companyId,
    salesOrderId,
  },
  examplePayload: SUCCESS_PAYLOAD,
});
