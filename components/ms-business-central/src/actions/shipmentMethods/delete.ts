import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { shipmentMethodId } from "../../inputs/customers/createCustomerInputs";
import { connectionInput } from "../../inputs/general";
import type { ShipmentMethod } from "../../interfaces";

export const deleteShipmentMethod = action({
  display: {
    label: "Delete Shipment Method",
    description: "Deletes a shipment method object in your Business Central organization.",
  },
  perform: async (context, { connection, companyId, shipmentMethodId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    await client.delete<ShipmentMethod>(
      `/companies(${companyId})/shipmentMethods(${shipmentMethodId})`,
    );

    return SUCCESS_PAYLOAD;
  },
  inputs: {
    connection: connectionInput,
    companyId,
    shipmentMethodId,
  },
  examplePayload: SUCCESS_PAYLOAD,
});
