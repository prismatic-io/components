import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getGeneralLedgerEntryExamplePayload } from "../../examplePayloads";
import { getGeneralLedgerEntryInputs } from "../../inputs/generalLedgerEntries";
import type { GeneralLedgerEntry } from "../../interfaces";

export const getGeneralLedgerEntry = action({
  display: {
    label: "Get General Ledger Entry",
    description:
      "Retrieve the properties and relationships of a general ledger entry object in your Business Central organization.",
  },
  inputs: getGeneralLedgerEntryInputs,
  perform: async (context, { connection, generalLedgerEntryId, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<GeneralLedgerEntry>(
      `/companies(${companyId})/generalLedgerEntries(${generalLedgerEntryId})`,
    );

    return { data };
  },
  examplePayload: getGeneralLedgerEntryExamplePayload,
});
