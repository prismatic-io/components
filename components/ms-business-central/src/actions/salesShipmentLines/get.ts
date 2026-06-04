import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getSalesShipmentLinesExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { salesShipmentLineId } from "../../inputs/salesShipmentLineItems/getSalesShipmentLinesInputs";
import type { SalesShipmentLine } from "../../interfaces";

export const getSalesShipmentLines = action({
  display: {
    label: "Get Sales Shipment Line Item",
    description: "Gets a sales shipment line object",
  },
  perform: async (context, { companyId, salesShipmentLineId, connection }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const { data } = await client.get<SalesShipmentLine>(
      `/companies(${companyId})/salesShipmentLines(${salesShipmentLineId})`,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,

    salesShipmentLineId,
  },
  examplePayload: getSalesShipmentLinesExamplePayload,
});
