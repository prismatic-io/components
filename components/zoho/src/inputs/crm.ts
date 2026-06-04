import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util/general";
import { connectionInput, fetchAll, page, page_token, per_page, recordId } from "./common";

export const crmRecordType = input({
  label: "Record Type",
  placeholder: "Select record type",
  type: "string",
  model: [
    { label: "Accounts", value: "Accounts" },
    
    { label: "Calls", value: "Calls" },
    { label: "Campaigns", value: "Campaigns" }, 
    { label: "Cases", value: "Cases" }, 
    { label: "Contacts", value: "Contacts" },
    
    { label: "Deals", value: "Deals" },
    { label: "Events", value: "Events" },
    { label: "Invoices", value: "Invoices" }, 
    { label: "Leads", value: "Leads" },
    { label: "Price Books", value: "Price_Books" }, 
    { label: "Products", value: "Products" }, 
    { label: "Purchase Orders", value: "Purchase_Orders" }, 
    { label: "Quotes", value: "Quotes" }, 
    { label: "Sales Orders", value: "Sales_Orders" }, 
    { label: "Solutions", value: "Solutions" }, 
    { label: "Tasks", value: "Tasks" },
    { label: "Vendors", value: "Vendors" }, 
  ],
  required: true,
  comments:
    "The type of CRM record to operate on. See [Zoho CRM Modules](https://www.zoho.com/crm/developer/docs/api/v8/modules-api.html) for details.",
  clean: util.types.toString,
});

export const fields = input({
  label: "Fields",
  placeholder: "Enter field names",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The field names to retrieve. Leave empty to retrieve all fields.",
  example: "Last_Name",
  clean: (values): string[] =>
    (Array.isArray(values) ? values : []).map((value) => util.types.toString(value)),
});

export const sort_order = input({
  label: "Sort Order",
  placeholder: "Select sort order",
  type: "string",
  required: false,
  model: [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ],
  comments: "The direction to sort results (ascending or descending).",
  clean: toOptionalString,
});

export const sort_by = input({
  label: "Sort By",
  placeholder: "Select field to sort by",
  type: "string",
  required: false,
  model: [
    { label: "Id", value: "id" },
    { label: "Created Time", value: "Created_Time" },
    { label: "Modified Time", value: "Modified_Time" },
  ],
  comments: "The field to sort results by.",
  clean: util.types.toString,
});


export const crmGetRecordInputs = {
  connection: connectionInput,
  recordType: crmRecordType,
  recordId: { ...recordId, dataSource: "selectCrmRecord" },
};

export const crmGetRecordsInputs = {
  connection: connectionInput,
  recordType: crmRecordType,
  fields: { ...fields, required: true },
  page,
  per_page,
  page_token,
  sort_order,
  sort_by,
  fetchAll,
};

export const crmCreateRecordInputs = {
  connection: connectionInput,
  recordType: crmRecordType,
};

export const crmUpdateRecordInputs = {
  connection: connectionInput,
  recordType: crmRecordType,
  recordId: { ...recordId, dataSource: "selectCrmRecord" },
};

export const crmRemoveRecordInputs = {
  connection: connectionInput,
  recordType: crmRecordType,
  recordId: { ...recordId, dataSource: "selectCrmRecord" },
};

export const selectCrmRecordInputs = {
  connection: connectionInput,
  recordType: crmRecordType,
};
