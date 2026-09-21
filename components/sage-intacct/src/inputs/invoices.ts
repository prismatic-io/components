import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanFunctionForXml } from "../util";
import {
  attachmentsIdInput,
  baseCurrencyInput,
  billToContactNameInput,
  connection,
  contactNameInput,
  currencyInput,
  customerIdInput,
  dateCreatedInput,
  datePostedInput,
  descriptionInput,
  dueDateInput,
  exchRateTypeInput,
  fieldsInput,
  invoiceNumberInput,
  keyId,
  recordNoInput,
  shipToContactNameInput,
  termNameInput,
} from "./common";
const invoiceLineItemsInput = input({
  label: "Invoice Line Items",
  type: "code",
  language: "xml",
  comments:
    "Invoice lines, must have at least 1. Each item must be wrapped in <lineitem></lineitem> tags.",
  required: true,
  default: `<lineitem>
  <glaccountno>10016</glaccountno>
  <amount>345.43</amount>
  <locationid>oriongroup</locationid>
  <departmentid>D200</departmentid>
  <classid>C12</classid>
</lineitem>
<lineitem>
  <glaccountno>10016</glaccountno>
  <amount>345.43</amount>
  <locationid>oriongroup</locationid>
  <departmentid>D200</departmentid>
  <classid>C12</classid>
</lineitem>`,
  example:
    "https://developer.intacct.com/api/accounts-receivable/invoices/#create-invoice-legacy",
  clean: cleanFunctionForXml,
});
const exchRateDateInput = input({
  label: "Exchange Rate Date",
  type: "string",
  comments: "Exchange rate date for the invoice",
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  required: false,
  clean: util.types.toString,
});
const ponumberInput = input({
  label: "Reference Number",
  type: "string",
  comments: "A reference number for the invoice",
  example: "1234",
  placeholder: "Enter number",
  required: false,
  clean: util.types.toString,
});
const externalIdInput = input({
  label: "External ID",
  type: "string",
  comments: "An external ID for the invoice",
  example: "1234",
  placeholder: "Enter number",
  required: false,
  clean: util.types.toString,
});
const noglInput = input({
  label: "No GL",
  comments: "Do not post to GL. Use false for No, true for Yes.",
  type: "string",
  required: false,
  clean: util.types.toString,
  default: "",
  model: [
    {
      label: "True",
      value: "true",
    },
    {
      label: "False",
      value: "false",
    },
    {
      label: "Empty",
      value: "",
    },
  ],
});
const customFieldsXmlInput = input({
  label: "Custom Fields",
  type: "code",
  language: "xml",
  comments: "Custom field names and values as defined for this object",
  example: `
  <customfield>
    <customfieldname>MYCUSTOMFIELD</customfieldname>
    <customfieldvalue>MYCUSTOMFIELDVALUE</customfieldvalue>
  </customfield>
  `,
  required: false,
  clean: cleanFunctionForXml,
});
const dateDueInput = input({
  label: "Date Due",
  type: "string",
  comments: "Due date. Required if not using termname.",
  required: false,
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  clean: util.types.toString,
});
const exchRateInput = input({
  label: "Exchange Rate",
  type: "string",
  comments:
    "Exchange rate for the invoice. Do not use if Exchange Rate Type is used.",
  required: false,
  clean: util.types.toString,
});
export const invoiceCurrencyAndExchangeRate = structuredObjectInput({
  label: "Currency and Exchange Rate",
  required: false,
  comments: "Base currency, transaction currency, and exchange rate details.",
  inputs: {
    baseCurrencyInput,
    currencyInput: {
      ...currencyInput,
      comments: "The currency of the invoice.",
    },
    exchRateDateInput,
    exchRateTypeInput,
  },
});
export const updateInvoiceCurrencyAndExchangeRate = structuredObjectInput({
  label: "Currency and Exchange Rate",
  required: false,
  comments: "Base currency, transaction currency, and exchange rate details.",
  inputs: {
    baseCurrencyInput,
    currencyInput,
    exchRateDateInput,
    exchRateTypeInput: {
      ...exchRateTypeInput,
      comments: "The exchange rate type. Do not use if exchrate is set.",
    },
    exchRateInput,
  },
});
export const createInvoiceInputs = {
  connection,
  invoiceLineItemsInput,
  customerIdInput: {
    ...customerIdInput,
    required: true,
    comments: "The customer ID to create the invoice for.",
    example: "C-00269",
  },
  dateCreatedInput,
  datePostedInput,
  dueDateInput: { ...dueDateInput, comments: "The due date of the invoice." },
  termNameInput,
  recordNoInput: {
    ...recordNoInput,
    required: false,
    comments: "A Summary RECORDNO for the invoice.",
  },
  invoiceNumberInput,
  ponumberInput,
  descriptionInput: {
    ...descriptionInput,
    required: false,
    comments: "The description of the invoice.",
    example: "Some description",
  },
  externalIdInput,
  billToContactNameInput: {
    ...billToContactNameInput,
    required: false,
    comments:
      "The name of the contact to bill to. This should be an existing contact in Intacct.",
  },
  shipToContactNameInput: {
    ...shipToContactNameInput,
    required: false,
    comments:
      "The name of the contact to ship to. This should be an existing contact in Intacct.",
  },
  currencyAndExchangeRate: invoiceCurrencyAndExchangeRate,
  noglInput,
  attachmentsIdInput,
  customFieldsXmlInput,
};
export const getInvoiceInputs = {
  connection,
  fieldsInput,
  recordNoInput: { ...recordNoInput, dataSource: "selectInvoice" },
};
export const updateInvoiceInputs = {
  connection,
  keyId: { ...keyId, dataSource: "selectInvoice" },
  customerIdInput,
  dateCreatedInput: {
    ...dateCreatedInput,
    required: false,
  },
  datePostedInput,
  dateDueInput,
  termNameInput,
  invoiceNumberInput: {
    ...invoiceNumberInput,
    required: false,
  },
  ponumberInput,
  descriptionInput: {
    ...descriptionInput,
    required: false,
    comments: "The description of the invoice.",
    example: "Some description",
  },
  contactNameInput: {
    ...contactNameInput,
    required: false,
  },
  currencyAndExchangeRate: updateInvoiceCurrencyAndExchangeRate,
  attachmentsIdInput,
  customFieldsXmlInput,
  invoiceLineItemsInput: {
    ...invoiceLineItemsInput,
    required: false,
    comments:
      "To update an existing line use <updatelineitem></updatelineitem> " +
      "otherwise to create a new line item use <lineitem></lineitem> instead." +
      "You can mix types in the array.",
  },
};
