import { input, util } from "@prismatic-io/spectral";
import { cleanFunctionForXml } from "../util";
import {
  attachmentsIdInput,
  baseCurrencyInput,
  connection,
  currencyInput,
  descriptionInput,
  dueDateInput,
  fieldsInput,
  onHoldInput,
  paymentPriorityInput,
  recordNoInput,
  termNameInput,
  vendorIdInput,
} from "./common";
const apBillItemsInput = input({
  label: "AP Bill Items",
  type: "code",
  language: "xml",
  comments:
    "AP bill items, must have at least 1. Each item must be wrapped in <APBILLITEM></APBILLITEM> tags.",
  required: true,
  default: `<APBILLITEM>
  <ACCOUNTNO>10000</ACCOUNTNO>
  <TRX_AMOUNT>100.12</TRX_AMOUNT>
  <ENTRYDESCRIPTION>Line 1 of my bill</ENTRYDESCRIPTION>
  <LOCATIONID>Alder</LOCATIONID>
  <DEPARTMENTID>12345</DEPARTMENTID>
</APBILLITEM>
<APBILLITEM>
  <ACCOUNTNO>10000</ACCOUNTNO>
  <TRX_AMOUNT>100.12</TRX_AMOUNT>
  <ENTRYDESCRIPTION>Line 2 of my bill</ENTRYDESCRIPTION>
  <LOCATIONID>Alder</LOCATIONID>
  <DEPARTMENTID>12345</DEPARTMENTID>
</APBILLITEM>`,
  example:
    "https://developer.intacct.com/api/accounts-payable/bills/#create-bill",
  clean: cleanFunctionForXml,
});
const billTransactionDateInput = input({
  label: "Bill Transaction Date",
  type: "string",
  comments: "Transaction date in MM/DD/YYYY format",
  required: true,
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  clean: util.types.toString,
});
const billTransactionGlPostingDateInput = input({
  label: "Bill GL Posting Date",
  type: "string",
  comments: "General ledger posting date in MM/DD/YYYY format",
  required: false,
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  clean: util.types.toString,
});
const billNumberInput = input({
  label: "Bill Number",
  type: "string",
  comments: "A Bill Number identifier",
  example: "BILL-2024-001",
  placeholder: "Enter bill number",
  required: true,
  clean: util.types.toString,
});
const docNumberInput = input({
  label: "Reference Number",
  type: "string",
  comments: "A reference number for the bill",
  example: "REF-2024-5678",
  placeholder: "Enter reference number",
  required: false,
  clean: util.types.toString,
});
const recPaymentDateInput = input({
  label: "Recommended to pay on",
  type: "string",
  comments: "Payment date in MM/DD/YYYY format",
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  required: false,
  clean: util.types.toString,
});
export const createBillInputs = {
  connection,
  billTransactionDateInput,
  billTransactionGlPostingDateInput,
  vendorIdInput: {
    ...vendorIdInput,
    required: true,
    comments: "The vendor ID.",
    example: "V-01879",
  },
  billNumberInput,
  docNumberInput,
  descriptionInput,
  termNameInput,
  recPaymentDateInput,
  attachmentsIdInput,
  dueDateInput,
  paymentPriorityInput: {
    ...paymentPriorityInput,
    model: [
      { label: "urgent", value: "urgent" },
      { label: "high", value: "high" },
      { label: "normal", value: "normal" },
      { label: "low", value: "low" },
    ],
  },
  onHoldInput: { ...onHoldInput, comments: "Place this bill on hold" },
  currencyInput,
  baseCurrencyInput,
  apBillItemsInput,
};
export const getBillInputs = {
  connection,
  fieldsInput,
  recordNoInput,
};
