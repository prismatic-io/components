import { input, util } from "@prismatic-io/spectral";
import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../general";


export const generalLedgerEntryId = input({
  label: "General Ledger Entry ID",
  type: "string",
  comments: "The unique identifier of the general ledger entry.",
  required: true,
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  dataSource: "selectGeneralLedgerEntry",
  clean: util.types.toString,
});


export const listGeneralLedgerEntriesInputs = {
  connection: connectionInput,
  companyId,
  ...odataParams,
};

export const getGeneralLedgerEntryInputs = {
  connection: connectionInput,
  companyId,
  generalLedgerEntryId,
};
