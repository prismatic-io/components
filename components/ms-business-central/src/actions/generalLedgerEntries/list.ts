import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listGeneralLedgerEntriesExamplePayload } from "../../examplePayloads";
import { listGeneralLedgerEntriesInputs } from "../../inputs/generalLedgerEntries";
import type { GeneralLedgerEntry, MultipleItemsResponse } from "../../interfaces";

export const listGeneralLedgerEntries = action({
  display: {
    label: "List General Ledger Entries",
    description: "Retrieve all general ledger entries in your Business Central organization.",
  },
  inputs: listGeneralLedgerEntriesInputs,
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

    const { data } = await client.get<MultipleItemsResponse<GeneralLedgerEntry[]>>(
      `/companies(${companyId})/generalLedgerEntries`,
      {
        params,
      },
    );

    return { data };
  },
  examplePayload: listGeneralLedgerEntriesExamplePayload,
});
