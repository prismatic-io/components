import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getItemLedgerEntryExamplePayload } from "../../examplePayloads";
import { getItemLedgerEntryInputs } from "../../inputs/itemLedgerEntries";
import type { ItemLedgerEntry } from "../../interfaces";

export const getItemLedgerEntry = action({
  display: {
    label: "Get Item Ledger Entry",
    description:
      "Retrieve the properties and relationships of an item ledger entry object in your Business Central organization.",
  },
  inputs: getItemLedgerEntryInputs,
  perform: async (context, { connection, itemLedgerEntryId, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<ItemLedgerEntry>(
      `/companies(${companyId})/itemLedgerEntries(${itemLedgerEntryId})`,
    );

    return { data };
  },
  examplePayload: getItemLedgerEntryExamplePayload,
});
