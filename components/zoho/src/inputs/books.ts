import { input, util } from "@prismatic-io/spectral";
import { cleanKeyValList } from "../util/general";
import { connectionInput, fetchAll, page, per_page, recordId } from "./common";

export const booksRecordType = input({
  label: "Record Type",
  placeholder: "Select record type",
  type: "string",
  model: [
    { label: "Bank Accounts", value: "bankaccounts" },
    { label: "Bank Transactions", value: "banktransactions" },
    { label: "Bank Rules", value: "bankaccounts/rules" },
    {
      label: "Base Currency Adjustments",
      value: "basecurrencyadjustment",
    },
    { label: "Bills", value: "bills" },
    { label: "Chart Of Accounts", value: "chartofaccounts" },
    { label: "Contacts", value: "contacts" },
    { label: "Contact Persons", value: "contactpersons" },
    { label: "Credit Notes", value: "creditnotes" },
    { label: "Currency", value: "settings/currencies" },
    { label: "Customer Payments", value: "customerpayments" },
    { label: "Employees", value: "employees" },
    { label: "Estimates", value: "estimates" },
    { label: "Expenses", value: "expenses" },
    { label: "Invoices", value: "invoices" },
    { label: "Items", value: "items" },
    { label: "Journals", value: "journals" },
    { label: "Opening Balances", value: "settings/openingbalances" },
    { label: "Projects", value: "projects" },
    { label: "Purchase Orders", value: "purchaseorders" },
    { label: "Recurring Bills", value: "recurringbills" },
    { label: "Recurring Expenses", value: "recurringexpenses" },
    { label: "Recurring Invoices", value: "recurringinvoices" },
    { label: "Retainer Invoices", value: "retainerinvoices" },
    { label: "Sales Orders", value: "salesorders" },
    { label: "Tasks", value: "tasks" },
    { label: "Taxes", value: "settings/taxes" },
    { label: "Time Entries", value: "projects/timeentries" },
    { label: "Users", value: "users" },
    { label: "Vendor Credits", value: "vendorcredits" },
    { label: "Vendor Payments", value: "vendorpayments" },
  ],
  required: true,
  comments:
    "The type of Books record to operate on. See [Zoho Books API](https://www.zoho.com/books/api/v3/) for details.",
  clean: util.types.toString,
});

export const searchFields = input({
  label: "Search Fields",
  placeholder: "Enter search field key-value pairs",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Key-value pairs for filtering search results. Keys are field names, values are search criteria.",
  example: JSON.stringify({ contact_name: "John", email: "john@example.com" }, null, 2),
  clean: cleanKeyValList,
});

export const parentRecordId = input({
  label: "Parent Record ID",
  placeholder: "Enter parent record ID",
  type: "string",
  required: false,
  comments: "The unique identifier of the parent record under which other records are grouped.",
  clean: util.types.toString,
  example: "5394166000000379001",
});


export const booksGetRecordInputs = {
  connection: connectionInput,
  recordType: booksRecordType,
  recordId: { ...recordId, dataSource: "selectBooksRecord" },
  parentRecordType: {
    ...booksRecordType,
    label: "Parent Record Type",
    placeholder: "Parent Record Type",
    required: false,
  },
  parentRecordId: { ...parentRecordId, dataSource: "selectBooksRecord" },
};

export const booksGetRecordsInputs = {
  connection: connectionInput,
  recordType: booksRecordType,
  parentRecordType: {
    ...booksRecordType,
    label: "Parent Record Type",
    placeholder: "Parent Record Type",
    required: false,
  },
  parentRecordId: { ...parentRecordId, dataSource: "selectBooksRecord" },
  searchFields,
  page,
  per_page,
  fetchAll,
};

export const booksCreateRecordInputs = {
  connection: connectionInput,
  recordType: booksRecordType,
};

export const booksUpdateRecordInputs = {
  connection: connectionInput,
  recordType: booksRecordType,
  recordId: { ...recordId, dataSource: "selectBooksRecord" },
};

export const booksRemoveRecordInputs = {
  connection: connectionInput,
  recordType: booksRecordType,
  recordId: { ...recordId, dataSource: "selectBooksRecord" },
};

export const selectBooksRecordInputs = {
  connection: connectionInput,
  recordType: booksRecordType,
  parentRecordId: { ...parentRecordId, required: false },
};
