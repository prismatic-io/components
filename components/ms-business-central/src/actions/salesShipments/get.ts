import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getSaleShipmentExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { saleShipmentId } from "../../inputs/saleShipments/getSaleShipmentInputs";
import type { SaleShipment } from "../../interfaces";

export const getSaleShipment = action({
  display: {
    label: "Get Sales Shipment",
    description: "Retrieves a sales shipment object from your Business Central organization.",
  },
  perform: async (context, { saleShipmentId, connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const { data } = await client.get<SaleShipment>(
      `/companies(${companyId})/salesShipments(${saleShipmentId})`,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    saleShipmentId,
  },
  examplePayload: getSaleShipmentExamplePayload,
});
