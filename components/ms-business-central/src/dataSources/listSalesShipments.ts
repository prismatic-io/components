import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { MultipleItemsResponse, SaleShipment } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const listSalesShipment = dataSource({
  display: {
    label: "Select Sales Shipments",
    description: "A picklist of sales shipment objects in your Business Central organization.",
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<SaleShipment[]>>(
      `/companies(${companyId})/salesShipments`,
    );

    return {
      result: toSortedPicklist(data.value, (ss) => ({
        key: ss.id,
        label: ss.number,
      })),
    };
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "SHIP-001", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
