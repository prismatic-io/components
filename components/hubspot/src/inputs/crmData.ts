import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
export const importId = input({
  label: "Import ID",
  type: "string",
  required: true,
  placeholder: "Enter Import ID",
  comments: "The unique identifier of the import.",
  example: "43203123",
  dataSource: "selectImport",
});
export const importOperations = input({
  label: "Import Operations",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Indicates whether the import should create and update, only create, or only update records for a certain object or activity. Include the objectTypeId for the object/activity and whether to UPSERT (create and update), CREATE, or UPDATE records. For objectTypeId's, check [HubSpot CRM Object Type IDs](https://developers.hubspot.com/docs/api/crm/understanding-the-crm#object-type-id).",
  clean: util.types.toObject,
  example: JSON.stringify({ "0-1": "CREATE" }),
});
export const dateFormat = input({
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
export const marketableContactImport = input({
  label: "Marketable Contact Import",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, the contacts being imported are marketable.",
  clean: util.types.toBool,
});
export const createContactListFromImport = input({
  label: "Create Contact List From Import",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, creates a static list of the contacts from the import.",
  clean: util.types.toBool,
});
export const files = input({
  label: "Files",
  type: "code",
  language: "json",
  required: true,
  comments:
    "An array containing the import file information. For more information, see [HubSpot CRM Imports API](https://developers.hubspot.com/docs/api/crm/imports).",
  clean: util.types.toObject,
  example: JSON.stringify([
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
  ]),
});
export const dataFiles = input({
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
export const schemaType = input({
  label: "Schema Type",
  type: "string",
  required: true,
  comments: "Schema type for the export.",
  default: "VIEW",
  model: [
    { label: "PublicExportViewRequest", value: "VIEW" },
    { label: "PublicExportListRequest", value: "LIST" },
  ],
});
export const format = input({
  label: "Format",
  type: "string",
  required: true,
  comments: "The format of the export file.",
  default: "CSV",
  model: [
    { label: "CSV", value: "CSV" },
    { label: "XLSX", value: "XLSX" },
    { label: "XLS", value: "XLS" },
  ],
});
export const exportName = input({
  label: "Export Name",
  type: "string",
  required: true,
  comments: "The name of the export.",
  example: "My Export",
});
export const objectProperties = input({
  label: "Object Properties",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "A list of the properties to include in the export.",
  example: "email",
});
export const associatedObjectType = input({
  label: "Associated Object Type",
  type: "string",
  required: false,
  comments:
    "The name or ID of an associated object to include in the export. When an associated object is included, the export contains the associated record IDs of that object and the records' primary display property value.",
  example: "name",
});
export const language = input({
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
  comments: "The language of the export file.",
});
export const publicCrmSearchRequest = input({
  label: "Public CRM Search Request (Only for PublicExportViewRequest)",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Indicates which data should be exported based on certain property values and search queries.",
  clean: util.types.toObject,
  example: JSON.stringify({
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
  }),
});
export const listId = input({
  label: "List Id (Only and required for PublicExportListRequest)",
  type: "string",
  required: false,
  comments: "The ILS List ID of the list to export.",
  example: "123456",
});
