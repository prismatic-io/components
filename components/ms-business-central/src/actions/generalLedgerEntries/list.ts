import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listGeneralLedgerEntriesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { listGeneralLedgerEntriesInputs } from "../../inputs/generalLedgerEntries";
export const listGeneralLedgerEntries = action({
  display: {
    label: "List General Ledger Entries",
    description:
      "Retrieve all general ledger entries in your Business Central organization.",
  },
  inputs: listGeneralLedgerEntriesInputs,
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
      (typeof listGeneralLedgerEntriesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/generalLedgerEntries`,
      params,
      fetchAll,
      pageSize: $top,
    });
  },
  examplePayload: listGeneralLedgerEntriesExamplePayload,
});
