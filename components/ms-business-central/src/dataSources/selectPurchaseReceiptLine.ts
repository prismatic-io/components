import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { MultipleItemsResponse, PurchaseReceiptLine } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectPurchaseReceiptLine = dataSource({
  display: {
    label: "Select Purchase Receipt Line",
    description: "A picklist of purchase receipt lines in your Business Central organization.",
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<PurchaseReceiptLine[]>>(
      `/companies(${companyId})/purchaseReceiptLines`,
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
