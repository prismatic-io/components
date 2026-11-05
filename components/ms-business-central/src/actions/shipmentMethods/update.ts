import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createShipmentMethodExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { shipmentMethodId } from "../../inputs/customers/createCustomerInputs";
import { connectionInput } from "../../inputs/general";
import {
  shipmentCode,
  shipmentMethodName,
} from "../../inputs/shipmentMethods/createShipmentMethodInputs";
import type { ShipmentMethod } from "../../interfaces";
import { cleanStringInput } from "../../utils";

export const updateShipmentMethod = action({
  display: {
    label: "Update Shipment Method",
    description: "Update a shipment method object in your Business Central organization.",
  },
  perform: async (
    context,
    { shipmentMethodName, shipmentCode, connection, companyId, shipmentMethodId },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      code: shipmentCode,
      displayName: shipmentMethodName,
    };

    const { data } = await client.patch<ShipmentMethod>(
      `/companies(${companyId})/shipmentMethods(${shipmentMethodId})`,
      payload,
      {
        headers: {
          "If-Match": "*",
        },
      },
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    shipmentMethodId,
    shipmentMethodName: {
      ...shipmentMethodName,
      required: false,
      clean: cleanStringInput,
    },
    shipmentCode: {
      ...shipmentCode,
      required: false,
      clean: cleanStringInput,
    },
  },
  examplePayload: createShipmentMethodExamplePayload,
});
