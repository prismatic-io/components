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
    { companyId, connection, fetchAll, odataQueryParams },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const params = {
      $search: odataQueryParams.$search,
      $skip: odataQueryParams.$skip,
      $skipToken: odataQueryParams.$skipToken,
      $filter: odataQueryParams.$filter,
      $count: odataQueryParams.$count,
      $expand: odataQueryParams.$expand,
      $format: odataQueryParams.$format,
      $orderBy: odataQueryParams.$orderBy,
      $select: odataQueryParams.$select,
    };
    return await paginateResults<
      (typeof listItemLedgerEntriesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/itemLedgerEntries`,
      params,
      fetchAll,
      pageSize: odataQueryParams.$top,
    });
  },
  examplePayload: listItemLedgerEntriesExamplePayload,
});
