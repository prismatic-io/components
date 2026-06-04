import { input, util } from "@prismatic-io/spectral";
import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../general";


export const itemLedgerEntryId = input({
  label: "Item Ledger Entry ID",
  type: "string",
  comments: "The unique identifier of the item ledger entry.",
  required: true,
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  dataSource: "selectItemLedgerEntry",
  clean: util.types.toString,
});


export const listItemLedgerEntriesInputs = {
  connection: connectionInput,
  companyId,
  ...odataParams,
};

export const getItemLedgerEntryInputs = {
  connection: connectionInput,
  companyId,
  itemLedgerEntryId,
};
