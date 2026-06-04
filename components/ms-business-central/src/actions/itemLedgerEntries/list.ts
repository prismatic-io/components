import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listItemLedgerEntriesExamplePayload } from "../../examplePayloads";
import { listItemLedgerEntriesInputs } from "../../inputs/itemLedgerEntries";
import type { ItemLedgerEntry, MultipleItemsResponse } from "../../interfaces";

export const listItemLedgerEntries = action({
  display: {
    label: "List Item Ledger Entries",
    description: "Retrieve all item ledger entries in your Business Central organization.",
  },
  inputs: listItemLedgerEntriesInputs,
  perform: async (
    context,
    {
      $search,
      companyId,
      connection,
      $skip,
      $skipToken,
      $top,
      $filter,
      $count,
      $expand,
      $format,
      $orderBy,
      $select,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const params = {
      $search,
      $skip,
      $skipToken,
      $top,
      $filter,
      $count,
      $expand,
      $format,
      $orderBy,
      $select,
    };

    const { data } = await client.get<MultipleItemsResponse<ItemLedgerEntry[]>>(
      `/companies(${companyId})/itemLedgerEntries`,
      {
        params,
      },
    );

    return { data };
  },
  examplePayload: listItemLedgerEntriesExamplePayload,
});
