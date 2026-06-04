import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createShipmentMethodExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { shipmentMethodId } from "../../inputs/customers/createCustomerInputs";
import { connectionInput } from "../../inputs/general";
import type { ShipmentMethod } from "../../interfaces";

export const getShipmentMethod = action({
  display: {
    label: "Get Shipment Method",
    description: "Retrieves a shipment method object in your Business Central organization.",
  },
  perform: async (context, { connection, companyId, shipmentMethodId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const { data } = await client.get<ShipmentMethod>(
      `/companies(${companyId})/shipmentMethods(${shipmentMethodId})`,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    shipmentMethodId,
  },
  examplePayload: createShipmentMethodExamplePayload,
});
