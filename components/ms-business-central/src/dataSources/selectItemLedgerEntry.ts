import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { ItemLedgerEntry, MultipleItemsResponse } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectItemLedgerEntry = dataSource({
  display: {
    label: "Select Item Ledger Entry",
    description: "A picklist of item ledger entries in your Business Central organization.",
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<ItemLedgerEntry[]>>(
      `/companies(${companyId})/itemLedgerEntries`,
    );

    return {
      result: toSortedPicklist(data.value, (entry) => ({
        key: entry.id,
        label: `${entry.documentNumber} - ${entry.description}`,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "DOC-001 - Sale of Item", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
