import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { WORKDAY_API_DOCS_URL } from "../constants";
import { cleanArrayCodeInput, cleanStringInput } from "../util";
import {
  connection,
  modelBooleanUpdateInput,
  paginationQueryStringInputs,
  extraParameters,
  tenant,
} from "./common";

const tableId = input({
  label: "Table ID",
  comments: "Identifies the Prism Analytics table.",
  type: "string",
  placeholder: "Enter table ID",
  example: "0c2e4a6c8e1f43a5b7d9f1b3d5f7a9c1",
  required: true,
  clean: util.types.toString,
  dataSource: "selectTable",
});

const dataChangeId = input({
  label: "Data Change ID",
  comments: "Identifies the Prism Analytics data change transaction.",
  type: "string",
  required: true,
  example: "7a9c1e3f5b2d44a6c8e0a2c4e6a8c0e2",
  placeholder: "Enter data change ID",
  clean: util.types.toString,
  dataSource: "selectDataChange",
});

const fileContainerId = input({
  label: "File Container ID",
  comments: "Identifies the file container whose files will be retrieved.",
  type: "string",
  required: true,
  example: "3b5d7f9a1c2e44b6d8f0a2c4e6b8d0f2",
  placeholder: "Enter file container ID",
  clean: util.types.toString,
});

const file = input({
  label: "File",
  placeholder: "Output data from previous step",
  type: "data",
  required: true,
  comments:
    "The contents to write to a file. Binary data generated from a previous step.",
  example: Buffer.from("example").toString("base64"),
  clean: util.types.toData,
});

const displayName = input({
  label: "Display Name",
  comments: "User-facing display name shown in Prism Analytics.",
  type: "string",
  required: true,
  example: "Worker Headcount",
  placeholder: "Enter display name",
  clean: util.types.toString,
});

const description = input({
  label: "Description",
  comments: "Short description shown alongside the table.",
  type: "string",
  required: false,
  example: "Monthly headcount by cost center",
  placeholder: "Enter description",
  clean: cleanStringInput,
});

const documentation = input({
  label: "Documentation",
  comments: "Long-form documentation describing how the table is used.",
  type: "string",
  required: false,
  example: "Loaded nightly from the HRIS export. One row per worker per month.",
  placeholder: "Enter documentation",
  clean: cleanStringInput,
});

const enableForAnalysis = input({
  label: "Enable for Analysis",
  comments: "When true, enables the table for Prism Analytics.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const name = input({
  label: "Name",
  comments: "Internal name used to reference the table via API.",
  type: "string",
  required: true,
  example: "Worker_Headcount",
  placeholder: "Enter name",
  clean: util.types.toString,
});

const tags = structuredObjectInput({
  label: "Tags",
  comments:
    "Labels used to categorize and find the table. Each row identifies one tag.",
  collection: "valuelist",
  required: false,
  inputs: {
    id: input({
      label: "ID",
      comments: "Identifies the tag.",
      type: "string",
      required: false,
      example: "5e7a9c1e3b4d46f8a0c2e4a6c8e0b2d4",
      placeholder: "Enter tag ID",
      clean: cleanStringInput,
    }),
    name: input({
      label: "Name",
      comments: "Name of the tag.",
      type: "string",
      required: false,
      example: "Headcount",
      placeholder: "Enter tag name",
      clean: cleanStringInput,
    }),
  },
});

const fields = input({
  label: "Fields",
  comments: `The fields of the table. An array of objects. See [Workday API documentation](${WORKDAY_API_DOCS_URL}#prismAnalytics/v3/post-/tables) for more information.`,
  type: "code",
  language: "json",
  required: true,
  placeholder: "Enter fields as a JSON array",
  example: JSON.stringify(
    [
      {
        name: "Hire_Date",
        ordinal: 1,
        comments: "Date the worker was hired.",
        parseFormat: "yyyy-MM-dd",
        type: {
          name: "Date",
          id: "Schema_Field_Type=Date",
        },
        precision: 0,
        scale: 0,
        businessObject: {
          id: "9c1e3a5c7e2f48b0d2f4a6c8e0a2c4e6",
          descriptor: "Worker",
        },
        context: {
          id: "1d3f5b7d9f4a40c2e4a6c8e0b2d4f6a8",
          descriptor: "Hire Date",
        },
        displayName: "Hire Date",
        defaultValue: "2024-01-01",
        fieldId: "Hire_Date",
        required: false,
        externalId: false,
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Fields"),
});

const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments:
    "Additional optional fields: includes Description, Documentation, and Enable for Analysis.",
  required: false,
  inputs: {
    description,
    documentation,
    enableForAnalysis,
  },
});

const updateTableAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments:
    "Additional optional fields: includes Description, Documentation, and Enable for Analysis.",
  required: false,
  inputs: {
    description,
    documentation,
    enableForAnalysis: {
      ...enableForAnalysis,
      ...modelBooleanUpdateInput,
      label: enableForAnalysis.label,
    },
  },
});

const getTableByIdParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#prismAnalytics/v3/get-/tables/-id-).`;
const dataChangeType = input({
  label: "Data Change Type",
  comments:
    "How much data change detail to return: Summary returns the data change summary, Full adds the description, application, categories, tags, and mappings. Either Data Change Type or Data Change Name must be set.",
  type: "string",
  required: false,
  model: [
    { label: "Summary", value: "summary" },
    { label: "Full", value: "full" },
  ],
  example: "summary",
  placeholder: "Select data change type",
  clean: cleanStringInput,
});

const dataChangeName = input({
  label: "Data Change Name",
  comments:
    "The name of the data change to return. Either Data Change Type or Data Change Name must be set.",
  type: "string",
  required: false,
  example: "Monthly_Headcount_Load",
  placeholder: "Enter data change name",
  clean: cleanStringInput,
});

const listDataChangesParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#prismAnalytics/v3/get-/dataChanges).`;
const listTablesParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#prismAnalytics/v3/get-/tables).`;

export const getDataChangesByIdInputs = {
  connection,
  tenant,
  dataChangeId,
};

export const getFilesByContainerIdInputs = {
  connection,
  tenant,
  fileContainerId,
};

export const getTableByIdInputs = {
  connection,
  tenant,
  tableId,
  extraParameters: { ...extraParameters, comments: getTableByIdParamsComments },
};

export const listDataChangesInputs = {
  connection,
  tenant,
  dataChangeType,
  dataChangeName,
  ...paginationQueryStringInputs,
  extraParameters: {
    ...extraParameters,
    comments: listDataChangesParamsComments,
  },
};

export const listTablesInputs = {
  connection,
  tenant,
  ...paginationQueryStringInputs,
  extraParameters: { ...extraParameters, comments: listTablesParamsComments },
};

export const postFileContainersInputs = {
  connection,
  tenant,
};

export const postFilesByContainerIdInputs = {
  connection,
  tenant,
  fileContainerId,
  file,
};

export const postTableInputs = {
  connection,
  tenant,
  displayName,
  name,
  fields,
  tags,
  additionalFields,
};

export const updateTableByIdInputs = {
  connection,
  tenant,
  tableId,
  displayName: { ...displayName, required: false },
  name: { ...name, required: false },
  fields: {
    ...fields,
    required: false,
    comments: `The fields of the table. An array of objects. See [Workday API documentation](${WORKDAY_API_DOCS_URL}#prismAnalytics/v3/put-/tables/-id-) for more information.`,
  },
  tags,
  additionalFields: updateTableAdditionalFields,
};
