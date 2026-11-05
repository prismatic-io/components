import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { MultipleItemsResponse, PurchaseReceipt } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectPurchaseReceipt = dataSource({
  display: {
    label: "Select Purchase Receipt",
    description: "A picklist of purchase receipts in your Business Central organization.",
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<PurchaseReceipt[]>>(
      `/companies(${companyId})/purchaseReceipts`,
    );

    return {
      result: toSortedPicklist(data.value, (pr) => ({
        key: pr.id,
        label: `${pr.number} - ${pr.vendorName}`,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "PR-001 - First Up Consultants", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" },
    ],
  },
});
