import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { DEFAULT_SF_VERSION } from "../constants";
import { cleanNumberInput, cleanStringInput, cleanVersionInput, dynamicFieldsClean } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Salesforce connection to use.",
});

export const version = input({
  label: "Version",
  placeholder: "Enter Salesforce API version number",
  type: "string",
  required: false,
  default: DEFAULT_SF_VERSION,
  comments: "The Salesforce API version number to use for requests.",
  example: DEFAULT_SF_VERSION,
  clean: cleanVersionInput,
});

export const filterQuery = input({
  label: "Filter Query",
  type: "string",
  required: false,
  comments: "Filter results by matching this text.",
  example: "Some text to filter by",
  placeholder: "Enter text to filter by",
  clean: cleanStringInput,
});

export const recordType = input({
  label: "Record Type",
  placeholder: "Enter record type (e.g., Account, Contact)",
  type: "string",
  required: true,
  comments: "The Salesforce object API name to act on (e.g., Account, Contact, Opportunity).",
  example: "Account",
  clean: (value: unknown): string => {
    const rt = util.types.toString(value).trim();
    if (!rt) {
      throw new Error("Must specify a valid Record Type");
    }
    return rt;
  },
  dataSource: "selectRecordType",
});

export const workflowRecordType = input({
  label: "Record Type",
  placeholder: "Enter record type",
  type: "string",
  required: true,
  comments: "The Salesforce object API name to act on (e.g., Account, Contact, Opportunity).",
  dataSource: "selectRecordType",
  example: "Account",
  clean: util.types.toString,
});

export const recordId = input({
  label: "Record ID",
  placeholder: "Enter record ID",
  type: "string",
  required: true,
  comments: "The unique identifier for a Salesforce record.",
  example: "0017000000hOMChAAO",
  clean: util.types.toString,
});

export const fieldValues = input({
  label: "Field Values",
  placeholder: "Enter field name and value",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Key-value pairs mapping Salesforce field API names to the values to set on the record.",
  clean: (val) => util.types.keyValPairListToObject((val || []) as KeyValuePair[]),
});

export const fieldValueTypes = input({
  label: "Field Value Types",
  placeholder: "Enter field name and type",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "For each item, provide the key and the type corresponding to the field value entered above. Valid types are Boolean, Number, or String.",
  example: "Name:string,Phone:string",
});

export const externalIdFieldName = input({
  label: "External ID Field Name",
  placeholder: "Enter external ID field name",
  type: "string",
  required: true,
  comments: "The name of the column that refers to the External ID Field",
  example: "ExtId__c",
  clean: util.types.toString,
});

export const dynamicRecordType = input({
  label: "Record Type",
  placeholder: "Enter or select a record type",
  type: "dynamicObjectSelection",
  required: true,
  comments: "The Salesforce object API name to act on (e.g., Account, Contact, Opportunity).",
  example: "Account",
  clean: (value: unknown): string => {
    const rt = util.types.toString(value).trim();
    if (!rt) {
      throw new Error("Must specify a valid Record Type");
    }
    return rt;
  },
});

export const dynamicValues = input({
  label: "Dynamic Fields",
  placeholder: "Enter dynamic field values as JSON",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A field for dynamic inputs that can be configured at deploy time with the use of a key value config variable.",
  example: JSON.stringify(
    [
      { key: "Name", value: "My Example Account" },
      { key: "Phone", value: "5551234567" },
    ],
    null,
    2,
  ),
  clean: (value) =>
    util.types.keyValPairListToObject(
      util.types.toObject(dynamicFieldsClean(value) || []) as KeyValuePair[],
    ),
});

export const sortInput = input({
  label: "Sort Criteria",
  placeholder: "Enter sort criteria",
  comments:
    "The criteria by which to sort the records. Use a string to specify the field and order. Prefix with '-' for descending order. For example, '-CreatedDate Name' will sort by 'CreatedDate' in descending order and by 'Name' in ascending order.",
  type: "string",
  example: "-CreatedDate Name",
  required: false,
  clean: (value: unknown): string => {
    const sort = util.types.toString(value).trim();
    if (sort === "") {
      return "-CreatedDate Name";
    }
    return sort;
  },
});

export const pageSize = input({
  label: "Page Size",
  placeholder: "Enter page size",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page when paginating results.",
  example: "20",
  clean: cleanNumberInput,
});

export const pageNumber = input({
  label: "Page Number",
  placeholder: "Enter page number",
  type: "string",
  required: false,
  comments: "The page number to retrieve when paginating results. Uses 1-based indexing.",
  example: "3",
  clean: cleanNumberInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, automatically fetches all pages of results instead of a single page.",
  clean: util.types.toBool,
});

export const maxRecordsToFetch = input({
  label: "Max Records To Fetch",
  type: "string",
  required: false,
  comments:
    "The maximum number of records to fetch when Fetch All is enabled. Defaults to 20,000 records.",
  example: "20000",
  placeholder: "Enter max records to fetch",
  default: "20000",
  clean: cleanNumberInput,
});

export const queryString = input({
  label: "SOQL Query",
  placeholder: "Enter SOQL query",
  type: "string",
  required: true,
  comments:
    "A Salesforce Object Query Language (SOQL) query to execute against the Salesforce API.",
  example: "SELECT Id, Name FROM Opportunity",
  clean: util.types.toString,
});

export const name = input({
  label: "Name",
  type: "string",
  required: true,
  placeholder: "Enter name",
  comments: "The name assigned to the Salesforce record.",
  example: "myExampleObject",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "A text description of the object.",
  example: "This is a description of the object",
  placeholder: "Enter description",
  clean: cleanStringInput,
});

export const listInputs = {
  version,
  dynamicValues,
  fieldValues,
  fieldValueTypes,
  pageSize,
  pageNumber,
  sort: sortInput,
  fetchAll,
  maxRecordsToFetch,
  connection: connectionInput,
};

export const getCurrentUserInputs = { version, connection: connectionInput };

export const validateConnectionInputs = { version, connection: connectionInput };
