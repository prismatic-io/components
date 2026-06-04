import { input, util } from "@prismatic-io/spectral";
import {
  BOOLEAN_VALUES,
  INPUT_TYPE_VALUES,
  pollResourceModel,
  SYNC_TYPE_VALUES,
} from "./constants";
import {
  failedSyncsExample,
  optionsExample,
  subsidiariesExample,
  successfulSyncsExample,
} from "./exampleInputs";
import {
  cleanBoolean,
  cleanCode,
  cleanKeyValueList,
  cleanNumber,
  cleanString,
  mapModel,
  mapObjectModel,
} from "./util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const id = input({
  label: "ID",
  type: "string",
  required: true,
  comments: "The ID of the object to retrieve",
  example: "96bb7007-eec5-430f-8d09-e033cbc000c2",
  placeholder: "96bb7007-eec5-430f-8d09-e033cbc000c2",
  clean: util.types.toString,
});

export const billId = {
  ...id,
  label: "Bill ID",
  comments: "The ID of the bill to retrieve",
};

export const businessEntityId = {
  ...id,
  label: "Business Entity ID",
  comments: "The ID of the business entity to retrieve",
};

export const accountingConnectionId = {
  ...id,
  label: "Accounting Connection ID",
  comments: "The ID of the accounting connection to delete",
};

export const customAccountingFieldId = {
  ...id,
  label: "Custom Accounting Field ID",
  comments: "The ID of the custom accounting field to retrieve",
};

export const departmentId = {
  ...id,
  label: "Department ID",
  comments: "The ID of the department to retrieve",
};

export const generalLedgerAccountId = {
  ...id,
  label: "General Ledger Account ID",
  comments: "The ID of the general ledger account to retrieve",
};

export const locationId = {
  ...id,
  label: "Location ID",
  comments: "The ID of the location to retrieve",
};

export const entityId = {
  ...id,
  label: "Entity ID",
  comments: "The ID of the entity to create the location",
  required: false,
};

export const reimbursementId = {
  ...id,
  label: "Reimbursement ID",
  comments: "The ID of the reimbursement to retrieve",
};

export const transactionId = {
  ...id,
  label: "Transaction ID",
  comments: "The ID of the transaction to retrieve",
};

export const vendorId = {
  ...id,
  label: "Vendor ID",
  comments: "The ID of the vendor to retrieve",
};

export const customAccountingFieldOptionId = {
  ...id,
  label: "Custom Accounting Field Option ID",
  comments: "The ID of the custom field option to retrieve",
};

export const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "key1=value1",
  required: false,
  comments: "Custom query parameters to be included in the request",
  placeholder: "key1=value1",
  clean: cleanKeyValueList,
});

export const start = input({
  label: "Start",
  type: "string",
  example: "1",
  required: false,
  comments:
    "The starting point for the list of results. Is fetchAll is true, this option will be ignored",
  placeholder: "2907e304-cac2-4abf-84c4-b3b454ae3b8c",
  clean: cleanString,
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  example: "50",
  placeholder: "50",
  default: "50",
  required: false,
  comments: "Number of results to retrieve per page. Default is 50",
  clean: cleanNumber,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "If true, will fetch all results",
  clean: cleanBoolean,
});

export const defaultListInputs = {
  connection,
  fetchAll,
  start,
  pageSize,
  customQueryParams,
};

export const code = input({
  label: "Code",
  type: "string",
  required: false,
  comments: "Code of the vendor; you could provide an empty string to reset the remote code",
  example: "19566",
  placeholder: "19566",
  clean: cleanString,
});

export const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "Name of a vendor",
  example: "Amazon",
  placeholder: "Amazon",
  clean: cleanString,
});

export const reactivate = input({
  label: "Reactivate",
  type: "string",
  required: false,
  comments: "Reactivate a deleted vendor",
  model: mapObjectModel(BOOLEAN_VALUES),
  clean: cleanBoolean,
});

export const value = input({
  label: "Value",
  type: "string",
  required: false,
  comments: "The value of the custom accounting field option",
  example: "Sales & Marketing",
  placeholder: "Sales & Marketing",
  clean: cleanString,
});

export const subsidiaries = input({
  label: "Subsidiaries",
  type: "code",
  language: "json",
  example: JSON.stringify(subsidiariesExample, null, 2),
  required: false,
  comments:
    "IDs of a list of subsidiaries associated with the vendor. The Ramp-assigned IDs should be used here. You could provide an empty list to reset the subsidiaries list",
  clean: cleanCode,
});

export const failedSyncs = input({
  label: "Failed Syncs",
  type: "code",
  language: "json",
  example: JSON.stringify(failedSyncsExample, null, 2),
  required: false,
  comments: "A list of objects that failed to be synced",
  clean: cleanCode,
});

export const idempotencyKey = input({
  label: "Idempotency Key",
  type: "string",
  required: true,
  comments:
    "An idempotency key is a unique value generated by the client which the server uses to recognize subsequent retries of the same request. To avoid collisions, we encourage clients to use random generated UUIDs",
  example: "d471d830-2e73-4082-8a75-68540f83e86e",
  placeholder: "d471d830-2e73-4082-8a75-68540f83e86e",
  clean: util.types.toString,
});

export const successfulSyncs = input({
  label: "Successful Syncs",
  type: "code",
  language: "json",
  example: JSON.stringify(successfulSyncsExample, null, 2),
  required: false,
  comments: "A list of objects that failed to be synced",
  clean: cleanCode,
});

export const syncType = input({
  label: "Sync Type",
  type: "string",
  required: true,
  comments: "The type of object to sync",
  example: "TRANSACTION_SYNC",
  placeholder: "TRANSACTION_SYNC",
  model: mapObjectModel(SYNC_TYPE_VALUES),
  clean: util.types.toString,
});

export const remoteProviderName = input({
  label: "Remote Provider Name",
  type: "string",
  required: true,
  comments: "Name of the ERP system that you are using",
  example: "ACCOUNTING_SEED",
  placeholder: "ACCOUNTING_SEED",
  clean: util.types.toString,
});

export const isSplittable = input({
  label: "Is Splitable",
  type: "string",
  required: false,
  comments: "If set to True, the accounting field can be used to annotate split line items",
  model: mapObjectModel(BOOLEAN_VALUES),
  clean: cleanBoolean,
});

export const inputType = input({
  label: "Input Type",
  type: "string",
  required: true,
  comments: "The input type could be SINGLE_CHOICE, BOOLEAN or FREE_FORM_TEXT",
  model: mapModel(INPUT_TYPE_VALUES),
  clean: cleanString,
});

export const options = input({
  label: "Options",
  type: "code",
  language: "json",
  example: JSON.stringify(optionsExample, null, 2),
  required: true,
  comments: "A list of field options for a given custom accounting field",
  clean: cleanCode,
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
