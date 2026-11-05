import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createShipmentMethodExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import {
  shipmentCode,
  shipmentMethodName,
} from "../../inputs/shipmentMethods/createShipmentMethodInputs";
import type { ShipmentMethod } from "../../interfaces";

export const createShipmentMethod = action({
  display: {
    label: "Create Shipment Method",
    description: "Create a new shipment method",
  },
  perform: async (context, { shipmentMethodName, shipmentCode, connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      code: shipmentCode,
      displayName: shipmentMethodName,
    };

    const { data } = await client.post<ShipmentMethod>(
      `/companies(${companyId})/shipmentMethods`,
      payload,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    shipmentMethodName,
    shipmentCode,
  },
  examplePayload: createShipmentMethodExamplePayload,
});
