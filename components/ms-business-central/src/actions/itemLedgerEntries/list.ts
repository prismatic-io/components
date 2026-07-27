import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listItemLedgerEntriesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { listItemLedgerEntriesInputs } from "../../inputs/itemLedgerEntries";
export const listItemLedgerEntries = action({
  display: {
    label: "List Item Ledger Entries",
    description:
      "Retrieve all item ledger entries in your Business Central organization.",
  },
  inputs: listItemLedgerEntriesInputs,
  perform: async (
    context,
    {
      $search,
      companyId,
      connection,
      fetchAll,
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
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const params = {
      $search,
      $skip,
      $skipToken,
      $filter,
      $count,
      $expand,
      $format,
      $orderBy,
      $select,
    };
    return await paginateResults<
      (typeof listItemLedgerEntriesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/itemLedgerEntries`,
      params,
      fetchAll,
      pageSize: $top,
    });
  },
  examplePayload: listItemLedgerEntriesExamplePayload,
});
