import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { MultipleItemsResponse, SalesShipmentLine } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectSalesShipmentLine = dataSource({
  display: {
    label: "Select Sales Shipment Line",
    description: "A picklist of sales shipment line items in your Business Central organization.",
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<SalesShipmentLine[]>>(
      `/companies(${companyId})/salesShipmentLines`,
    );

    return {
      result: toSortedPicklist(data.value, (line) => ({
        key: line.id,
        label: `${line.documentNo} - ${line.description}`,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "SHIP-001 - ATHENS Desk", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
