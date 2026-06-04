import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "./constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const itemsPerPage = input({
  label: "Items Per Page",
  type: "string",
  example: "100",
  required: false,
  comments: "Provide a value for the amount of items to be returned in the response.",
});

export const page = input({
  label: "Page",
  type: "string",
  example: "1",
  required: false,
  comments: "Provide a value for the page of results you would like to be returned.",
});

export const contactId = input({
  label: "Contact Id",
  type: "string",
  example: "example-533242",
  comments: "Provide the unique identifier of a contact.",
  required: true,
  dataSource: "selectContact",
});

export const contactPersonId = input({
  label: "Contact Person Id",
  type: "string",
  example: "example-533242",
  comments: "Provide the unique identifier of a contact person.",
  required: true,
  dataSource: "selectContactPerson",
});

export const salesInvoiceId = input({
  label: "Sales Invoice Id",
  type: "string",
  example: "example-533242",
  comments: "Provide the unique identifier of a sales invoice id.",
  required: true,
  dataSource: "selectSalesInvoice",
});

export const purchaseInvoiceId = input({
  label: "Purchase Invoice Id",
  type: "string",
  example: "example-533242",
  comments: "Provide the unique identifier of a purchase invoice id.",
  required: true,
  dataSource: "selectPurchaseInvoice",
});

export const date = input({
  label: "Date",
  type: "string",
  example: "2022-01-03",
  comments: "Provide a valid date value.",
  required: true,
});

export const dueDate = input({
  label: "Due Date",
  type: "string",
  example: "2022-01-03",
  comments: "Provide a valid date value for the due date of the invoice.",
  required: true,
});

export const totalAmount = input({
  label: "Total Amount",
  type: "string",
  example: "150.00",
  comments: "Provide a total amount for the invoice.",
  required: false,
});

export const invoiceLines = input({
  label: "Invoice Lines",
  type: "code",
  language: "json",
  default: `[
  {
    "description": "string",
    "ledger_account_id": "string",
    "unit_price": 0,
    "product_id": "string",
    "service_id": "string",
    "quantity": 0,
  }
]`,
  comments:
    "Provide a list of javascript objects, each containing information of an an invoice line item.",
  required: true,
});

export const contactName = input({
  label: "Contact Name",
  type: "string",
  example: "John Doe",
  comments: "Provide the name of a contact.",
  required: false,
});

export const notes = input({
  label: "Notes",
  type: "string",
  example: "This is an example note.",
  comments: "Provide a string value for notes.",
  required: false,
});

export const totalQuantity = input({
  label: "Total Quantity",
  type: "string",
  example: "3",
  comments: "Provide a total quantity of the invoice.",
  required: false,
});

export const netAmount = input({
  label: "Net Amount",
  type: "string",
  example: "150.00",
  comments: "Provide the net amount of the invoice.",
  required: false,
});

export const taxAmount = input({
  label: "Tax Amount",
  type: "string",
  example: "150.00",
  comments: "Provide a tax amount for the invoice.",
  required: false,
});

export const currencyId = input({
  label: "Currency Id",
  type: "string",
  example: "example-24525235",
  comments: "Provide the unique identifier of the currency type.",
  required: false,
  dataSource: "selectCurrency",
});

export const ledgerAccountId = input({
  label: "Ledger Account Id",
  type: "string",
  example: "example-2356795",
  comments: "Provide the unique identifier of a ledger account.",
  required: true,
  dataSource: "selectLedgerAccount",
});

export const ledgerAccountTypeId = input({
  label: "Ledger Account Type Id",
  type: "string",
  example: "example-2356795",
  comments: "Provide the unique identifier of a ledger account type.",
  required: true,
  dataSource: "selectLedgerAccountType",
});

export const includedInChart = input({
  label: "Include In Chart",
  type: "boolean",
  example: "true",
  comments: "This flag determines if the account will be included in the chart of accounts.",
  required: true,
});

export const name = input({
  label: "Name",
  type: "string",
  example: "Example Name",
  comments: "Provide a string value for a name.",
  required: true,
});

export const displayName = input({
  label: "Display Name",
  type: "string",
  example: "Example Name",
  comments: "Provide a string value for the display name.",
  required: true,
});

export const nominalCode = input({
  label: "Nominal Code",
  type: "string",
  example: "1",
  comments: "Provide an unique integer value for the nominal code of the ledger account.",
  required: true,
});

export const taxRateId = input({
  label: "Tax Rate Id",
  type: "string",
  example: "example-238953e2",
  comments: "Provide the unique identifier of a tax rate id.",
  required: true,
});

export const contactTypeIds = input({
  label: "Contact Type Ids",
  type: "string",
  example: "example-2356795",
  collection: "valuelist",
  comments: "For each list item, provide an Id of a contact type",
  required: true,
  dataSource: "selectContactType",
});

export const reference = input({
  label: "Reference",
  type: "string",
  example: "uniqueValue",
  comments: "Provide a string value for the reference of the contact.",
  required: false,
});

export const defaultSalesLedgerId = input({
  label: "Default Sales Ledger Id",
  type: "string",
  example: "example-80430964",
  comments: "Provide the unique identifier of the default sales ledger.",
  required: false,
  dataSource: "selectLedgerAccount",
});

export const defaultSalesTaxRateId = input({
  label: "Default Sales Tax Rate Id",
  type: "string",
  example: "example-80430964",
  comments: "Provide the unique identifier of the sales tax rate for the contact.",
  required: false,
});

export const defaultPurchaseLedgerId = input({
  label: "Default Purchase Ledger Id",
  type: "string",
  example: "example-80430964",
  comments: "Provide the unique identifier of the default purchase ledger for the contact.",
  required: false,
  dataSource: "selectLedgerAccount",
});

export const taxNumber = input({
  label: "Tax Number",
  type: "string",
  example: "80430964",
  comments: "Provide a string value for the VAT registration number for the contact.",
  required: false,
});

export const creditLimit = input({
  label: "Credit Limit",
  type: "string",
  example: "350.00",
  comments: "Provide a number value for the credit limit of the contact.",
  required: false,
});

export const creditDays = input({
  label: "Credit Days",
  type: "string",
  example: "10",
  comments: "Provide a number value for the credit days of the contact.",
  required: false,
});

export const sourceGuid = input({
  label: "Source GUID",
  type: "string",
  example: "example-80430964",
  comments: "Provide a valid GUID, used for importing/exporting contacts from 3rd party services.",
  required: false,
});

export const addressLine1 = input({
  label: "Address Line 1",
  type: "string",
  example: "4 Privet Drive",
  comments: "Provide a valid street address",
  required: false,
});

export const addressLine2 = input({
  label: "Address Line 2",
  type: "string",
  example: "apt 319",
  comments: "Provide a string value for the 2nd address line.",
  required: false,
});

export const city = input({
  label: "City",
  type: "string",
  example: "Beverly Hills",
  comments: "Provide a string value for the city of the address.",
  required: false,
});

export const countryId = input({
  label: "Country Id",
  type: "string",
  example: "",
  comments: "Provide a unique identifier for the contact's country.",
  required: false,
  dataSource: "selectCountry",
});

export const postalCode = input({
  label: "Postal Code",
  type: "string",
  example: "90211",
  comments: "Provide a value for the postal code.",
  required: false,
});

export const bankAccountId = input({
  label: "Bank Account Id",
  type: "string",
  example: "example-9489210",
  comments: "Provide a value for the postal code.",
  required: false,
});

export const addressTypeId = input({
  label: "Address Type Id",
  type: "string",
  example: "90211",
  comments: "Provide a unique identifier for the address type",
  required: false,
  dataSource: "selectAddressType",
});

export const accountName = input({
  label: "Account Name",
  type: "string",
  example: "Example Account",
  comments: "Provide a string value for the name of the bank account.",
  required: false,
});

export const isMainAddress = input({
  label: "Is Main Address",
  type: "boolean",
  comments: "This flag will determine if this is the contacts main address.",
  required: false,
});

export const accountNumber = input({
  label: "Account Number",
  type: "string",
  example: "Example Account No",
  comments: "Provide a valid bank account number.",
  required: false,
});

export const sortCode = input({
  label: "Sort Code",
  type: "string",
  example: "12-34-56",
  comments: "Provide a sort code for the bank account.",
  required: false,
});

export const bic = input({
  label: "BIC",
  type: "string",
  example: "BOFA",
  comments: "Provide a valid BIC for the bank account.",
  required: false,
});

export const iban = input({
  label: "IBAN",
  type: "string",
  example: "CY 17 002 00128 00000012005276002﻿",
  comments: "Provide a valid IBAN for the bank account.",
  required: false,
});

export const region = input({
  label: "Region",
  type: "string",
  example: "North America",
  comments: "Provide a valid region for the contact.",
  required: false,
});

export const gifiCode = input({
  label: "Gifi Code",
  type: "string",
  example: "NA",
  comments: "Provide a value for The General Index of Financial Information.",
  required: false,
});

export const accountId = input({
  label: "Account Id",
  type: "string",
  example: "example-2356795",
  comments: "Provide the unique identifier of the account Id.",
  required: true,
  dataSource: "selectLedgerAccount",
});

export const updated_or_created_since = input({
  label: "Update or Created Since",
  type: "string",
  example: "2015-10-27T16:24:52Z",
  comments:
    "Use this to limit the response to Contacts changed since a given date (format: YYYY-MM-DDT(+|-)hh:mm) or date-time (format: YYYY-MM-DDThh:mm:ss(+|-)hh:mm). Inclusive of the passed timestamp.",
  required: false,
});

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new and updated records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include updated records in trigger results.",
  clean: util.types.toBool,
});
