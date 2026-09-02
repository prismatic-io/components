import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { toOptionalString, valueListInputClean } from "../util";
import { connectionInput, name, objectType, timeout } from "./common";
const importId = input({
  label: "Import ID",
  type: "string",
  required: true,
  placeholder: "Enter Import ID",
  comments: "The unique identifier of the import.",
  example: "43203123",
  dataSource: "selectImport",
  clean: util.types.toString,
});
const importOperations = input({
  label: "Import Operations",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Indicates whether the import should create and update, only create, or only update records for a certain object or activity. Include the objectTypeId for the object/activity and whether to UPSERT (create and update), CREATE, or UPDATE records. For objectTypeId's, check [HubSpot CRM Object Type IDs](https://developers.hubspot.com/docs/api/crm/understanding-the-crm#object-type-id).",
  clean: util.types.toObject,
  example: JSON.stringify({ "0-1": "CREATE" }, null, 2),
});
const dateFormat = input({
  label: "Date Format",
  type: "string",
  model: [
    { label: "MONTH_DAY_YEAR", value: "MONTH_DAY_YEAR" },
    { label: "DAY_MONTH_YEAR", value: "DAY_MONTH_YEAR" },
    { label: "YEAR_MONTH_DAY", value: "YEAR_MONTH_DAY" },
  ],
  required: true,
  default: "MONTH_DAY_YEAR",
  comments:
    "The format for dates included in the file. Defaults to MONTH_DAY_YEAR; DAY_MONTH_YEAR and YEAR_MONTH_DAY are also accepted.",
  example: "YEAR_MONTH_DAY",
  clean: util.types.toString,
});
const marketableContactImport = input({
  label: "Marketable Contact Import",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, the contacts being imported are marketable.",
  clean: util.types.toBool,
});
const createContactListFromImport = input({
  label: "Create Contact List From Import",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, creates a static list of the contacts from the import.",
  clean: util.types.toBool,
});
const files = input({
  label: "Files",
  type: "code",
  language: "json",
  required: true,
  comments:
    "An array containing the import file information. For more information, see [HubSpot CRM Imports API](https://developers.hubspot.com/docs/api/crm/imports).",
  clean: util.types.toObject,
  example: JSON.stringify(
    [
      {
        fileName: "contact-import-file.csv",
        fileFormat: "CSV",
        fileImportPage: {
          hasHeader: true,
          columnMappings: [
            {
              columnObjectTypeId: "0-1",
              columnName: "First name",
              propertyName: "firstname",
            },
            {
              columnObjectTypeId: "0-1",
              columnName: "Last name",
              propertyName: "lastname",
            },
            {
              columnObjectTypeId: "0-1",
              columnName: "Email",
              propertyName: "email",
              associationIdentifierColumn: true,
            },
          ],
        },
      },
    ],
    null,
    2,
  ),
});
const dataFiles = input({
  label: "Data CSV File",
  type: "data",
  collection: "keyvaluelist",
  required: true,
  comments:
    "The CSV file to import, this should be binary data from a previous step. Key name should be the file name and the value should be the binary data.",
  example: "key: 'contact-import-file.csv', value: 'binary data'",
  clean: (values: unknown) =>
    util.types.keyValPairListToObject(values as KeyValuePair[]),
});
const schemaType = input({
  label: "Schema Type",
  type: "string",
  required: true,
  comments:
    "The export schema to use: VIEW for filtered exports, or LIST for list-based exports.",
  default: "VIEW",
  model: [
    { label: "PublicExportViewRequest", value: "VIEW" },
    { label: "PublicExportListRequest", value: "LIST" },
  ],
  clean: util.types.toString,
});
const format = input({
  label: "Format",
  type: "string",
  required: true,
  comments: "The file format for the exported data: CSV, XLSX, or XLS.",
  default: "CSV",
  model: [
    { label: "CSV", value: "CSV" },
    { label: "XLSX", value: "XLSX" },
    { label: "XLS", value: "XLS" },
  ],
  clean: util.types.toString,
});
const exportName = input({
  label: "Export Name",
  type: "string",
  required: true,
  placeholder: "Enter export name",
  comments: "A descriptive name used to identify the export in the HubSpot UI.",
  example: "My Export",
  clean: util.types.toString,
});
const objectProperties = input({
  label: "Object Properties",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "A list of the properties to include in the export.",
  example: "email",
  clean: valueListInputClean,
});
const associatedObjectType = input({
  label: "Associated Object Type",
  type: "string",
  required: false,
  placeholder: "Enter associated object type",
  comments:
    "The name or ID of an associated object to include in the export. When an associated object is included, the export contains the associated record IDs of that object and the records' primary display property value.",
  example: "name",
  clean: toOptionalString,
});
const language = input({
  label: "Language",
  type: "string",
  required: true,
  model: [
    { label: "German", value: "DE" },
    { label: "English", value: "EN" },
    { label: "Spanish", value: "ES" },
    { label: "Finnish", value: "FI" },
    { label: "French", value: "FR" },
    { label: "Italian", value: "IT" },
    { label: "Japanese", value: "JA" },
    { label: "Dutch", value: "NL" },
    { label: "Polish", value: "PL" },
    { label: "Portuguese", value: "PT" },
    { label: "Swedish", value: "SV" },
  ],
  comments:
    "The language code for header labels and system-generated text in the export.",
  clean: util.types.toString,
});
const publicCrmSearchRequest = input({
  label: "Public CRM Search Request (Only for PublicExportViewRequest)",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Indicates which data should be exported based on certain property values and search queries.",
  clean: util.types.toObject,
  example: JSON.stringify(
    {
      filters: [
        {
          value: "string",
          highValue: "string",
          values: ["string"],
          propertyName: "string",
          operator: "EQ",
        },
      ],
      sorts: ["string"],
      query: "string",
    },
    null,
    2,
  ),
});
const listId = input({
  label: "List Id (Only and required for PublicExportListRequest)",
  type: "string",
  required: false,
  placeholder: "Enter list ID",
  comments: "The ILS List ID of the list to export.",
  example: "123456",
  clean: toOptionalString,
});
export const cancelImportInputs = {
  hubspotConnection: connectionInput,
  importId,
  timeout,
};
export const listActiveImportsInputs = {
  hubspotConnection: connectionInput,
  timeout,
};
export const getAnImportInputs = {
  hubspotConnection: connectionInput,
  importId,
  timeout,
};
export const importCRMDataInputs = {
  hubspotConnection: connectionInput,
  name: {
    ...name,
    comments: "The name of the import.",
    example: "Contact Company import",
  },
  files,
  dataFiles,
  importOperations,
  dateFormat,
  marketableContactImport,
  createContactListFromImport,
  timeout,
};
export const exportCRMDataInputs = {
  hubspotConnection: connectionInput,
  schemaType,
  format,
  exportName,
  objectProperties,
  objectType: {
    ...objectType,
    comments:
      "The name or ID of the object you're exporting. For standard objects, you can use the object's name (e.g., CONTACT), but for custom objects, you must use the objectTypeId value, you can find this value in the response of the List Custom Objects action.",
  },
  language,
  listId,
  publicCrmSearchRequest,
  associatedObjectType,
  timeout,
};
