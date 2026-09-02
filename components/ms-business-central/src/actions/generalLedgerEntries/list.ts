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
      (typeof listGeneralLedgerEntriesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/generalLedgerEntries`,
      params,
      fetchAll,
      pageSize: odataQueryParams.$top,
    });
  },
  examplePayload: listGeneralLedgerEntriesExamplePayload,
});
