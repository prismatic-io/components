import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { MultipleItemsResponse, PurchaseOrder } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectPurchaseOrder = dataSource({
  display: {
    label: "Select Purchase Order",
    description: "A picklist of purchase orders in your Business Central organization.",
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<PurchaseOrder[]>>(
      `/companies(${companyId})/purchaseOrders`,
    );

    return {
      result: toSortedPicklist(data.value, (po) => ({
        key: po.id,
        label: `${po.number} - ${po.vendorName}`,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "PO-001 - First Up Consultants", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" },
    ],
  },
});
