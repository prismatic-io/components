import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { MultipleItemsResponse, PurchaseInvoice } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectPurchaseInvoice = dataSource({
  display: {
    label: "Select Purchase Invoice",
    description: "A picklist of purchase invoices in your Business Central organization.",
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<PurchaseInvoice[]>>(
      `/companies(${companyId})/purchaseInvoices`,
    );

    return {
      result: toSortedPicklist(data.value, (pi) => ({
        key: pi.id,
        label: `${pi.number} - ${pi.vendorName}`,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "PI-001 - First Up Consultants", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" },
    ],
  },
});
