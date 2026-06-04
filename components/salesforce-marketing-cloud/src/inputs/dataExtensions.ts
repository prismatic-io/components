import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll, page, pageSize } from "./common";





const dataExtensionKey = input({
  label: "Data Extension Key",
  type: "string",
  required: true,
  comments:
    "The external key (customer key) of the data extension. Found in the data extension properties.",
  example: "my-data-extension-key",
  placeholder: "Enter data extension key",
  clean: util.types.toString,
});

const dataExtensionId = input({
  label: "Data Extension ID",
  type: "string",
  required: true,
  comments: "The unique ID of the data extension.",
  example: "abc123de-f456-7890-abcd-ef1234567890",
  placeholder: "Enter data extension ID",
  dataSource: "selectDataExtension",
  clean: util.types.toString,
});

const searchString = input({
  label: "Search String",
  type: "string",
  required: true,
  comments: "A string to search for in the name of the custom object.",
  example: "Contacts",
  placeholder: "Enter search string",
  clean: util.types.toString,
});

const rowData = input({
  label: "Row Data",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON object representing the row to upsert. Keys should match data extension column names.",
  example: JSON.stringify(
    {
      SubscriberKey: "contact-abc-123",
      EmailAddress: "john.doe@example.com",
      FirstName: "John",
      LastName: "Doe",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

const primaryKeys = input({
  label: "Primary Keys",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON object of primary key column name/value pairs that identify the row.",
  example: JSON.stringify(
    {
      SubscriberKey: "contact-abc-123",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

const batchRows = input({
  label: "Batch Rows",
  type: "code",
  language: "json",
  required: true,
  comments:
    "An array of row objects to upsert asynchronously. Each object's keys should match data extension column names.",
  example: JSON.stringify(
    [
      {
        SubscriberKey: "contact-abc-123",
        EmailAddress: "john.doe@example.com",
        FirstName: "John",
      },
      {
        SubscriberKey: "contact-def-456",
        EmailAddress: "jane.smith@example.com",
        FirstName: "Jane",
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const dataExtensionName = input({
  label: "Data Extension Name",
  type: "string",
  required: true,
  comments: "The display name for the data extension.",
  example: "Customer_Data",
  placeholder: "Enter data extension name",
  clean: util.types.toString,
});

const dataExtensionFields = input({
  label: "Fields",
  type: "code",
  language: "json",
  required: true,
  comments:
    "An array of field definitions for the data extension. Each field must include name and fieldType.",
  example: JSON.stringify(
    [
      {
        name: "SubscriberKey",
        fieldType: "Text",
        maxLength: 254,
        isPrimaryKey: true,
        isRequired: true,
      },
      {
        name: "EmailAddress",
        fieldType: "EmailAddress",
        maxLength: 254,
        isRequired: true,
      },
      {
        name: "FirstName",
        fieldType: "Text",
        maxLength: 100,
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const isSendable = input({
  label: "Is Sendable",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "Whether this data extension can be used as a sendable data source for email sends.",
  clean: util.types.toBool,
});





export const upsertRowInputs = {
  connection,
  dataExtensionKey,
  primaryKeys,
  rowData,
};

export const asyncUpsertRowsInputs = {
  connection,
  dataExtensionKey,
  batchRows,
};

export const getDataExtensionFieldsInputs = {
  connection,
  dataExtensionId,
};

export const createDataExtensionInputs = {
  connection,
  dataExtensionName,
  dataExtensionKey: {
    ...dataExtensionKey,
    comments:
      "A unique external key for the data extension. Used to reference it in API calls.",
  },
  dataExtensionFields,
  isSendable,
};

export const listDataExtensionsInputs = {
  connection,
  searchString,
  fetchAll,
  pageSize,
  page,
};
