import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import { purchaseOrderId } from "../inputs/purchaseOrders/shared";
import type { MultipleItemsResponse, PurchaseOrderLine } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectPurchaseOrderLine = dataSource({
  display: {
    label: "Select Purchase Order Line",
    description: "A picklist of purchase order lines for the selected purchase order.",
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
    purchaseOrderId: { ...purchaseOrderId, dataSource: undefined },
  },
  perform: async (context, { connection, companyId, purchaseOrderId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<PurchaseOrderLine[]>>(
      `/companies(${companyId})/purchaseOrders(${purchaseOrderId})/purchaseOrderLines`,
    );

    return {
      result: toSortedPicklist(data.value, (line) => ({
        key: line.id,
        label: `${line.sequence} - ${line.description}`,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "10000 - ATHENS Desk", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
