import { input, util } from "@prismatic-io/spectral";
import { cleanArrayCodeInput, cleanStringInput } from "../util";
import {
  connection,
  modelBooleanUpdateInput,
  paginationQueryStringInputs,
  params,
  tenant,
} from "./shared";

const tableId = input({
  label: "Table ID",
  comments: "Identifies the Prism Analytics table.",
  type: "string",
  placeholder: "Enter table ID",
  example: "",
  required: true,
  clean: util.types.toString,
  dataSource: "selectTable",
});

const dataChangeId = input({
  label: "Data Change ID",
  comments: "Identifies the Prism Analytics data change transaction.",
  type: "string",
  required: true,
  example: "",
  placeholder: "Enter data change ID",
  clean: util.types.toString,
  dataSource: "selectDataChange",
});

const fileContainerId = input({
  label: "File Container ID",
  comments: "Identifies the file container whose files will be retrieved.",
  type: "string",
  required: true,
  example: "",
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
  example: "",
  placeholder: "Enter display name",
  clean: util.types.toString,
});

const description = input({
  label: "Description",
  comments: "Short description shown alongside the table.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter description",
  clean: cleanStringInput,
});

const documentation = input({
  label: "Documentation",
  comments: "Long-form documentation describing how the table is used.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter documentation",
  clean: cleanStringInput,
});

const enableForAnalysis = input({
  label: "Enable For Analysis",
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
  example: "",
  placeholder: "Enter name",
  clean: util.types.toString,
});

const tags = input({
  label: "Tags",
  comments: "The tags of the table. An array of objects with id and name.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        id: "string",
        name: "string",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Tags"),
});

const fields = input({
  label: "Fields",
  comments:
    "The fields of the table. An array of objects. See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#prismAnalytics/v3/post-/tables) for more information.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        name: "string",
        ordinal: 0,
        comments: "string",
        parseFormat: "string",
        type: {
          name: "Boolean",
          id: "Schema_Field_Type=Boolean",
        },
        precision: 0,
        scale: 0,
        businessObject: {
          id: "string",
          descriptor: "string",
        },
        context: {
          id: "string",
          descriptor: "string",
        },
        displayName: "string",
        defaultValue: "string",
        fieldId: "string",
        required: false,
        externalId: false,
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Fields"),
});

const getTableByIdParamsComments = `${params.comments} See optional (QUERY-STRING PARAMETERS) at https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#prismAnalytics/v3/get-/tables/-id-`;
const listDataChangesParamsComments = `${params.comments} See optional (QUERY-STRING PARAMETERS) at https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#prismAnalytics/v3/get-/dataChanges`;
const listTablesParamsComments = `${params.comments} See optional (QUERY-STRING PARAMETERS) at https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#prismAnalytics/v3/get-/tables`;

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
  params: { ...params, comments: getTableByIdParamsComments },
};

export const listDataChangesInputs = {
  connection,
  tenant,
  ...paginationQueryStringInputs,
  params: { ...params, comments: listDataChangesParamsComments },
};

export const listTablesInputs = {
  connection,
  tenant,
  ...paginationQueryStringInputs,
  params: { ...params, comments: listTablesParamsComments },
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
  description,
  documentation,
  enableForAnalysis,
  name,
  tags,
  fields,
};

export const updateTableByIdInputs = {
  tableId,
  ...postTableInputs,
  displayName: { ...postTableInputs.displayName, required: false },
  name: { ...postTableInputs.name, required: false },
  fields: {
    ...postTableInputs.fields,
    required: false,
    comments:
      "The fields of the table. An array of objects. See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#prismAnalytics/v3/put-/tables/-id-) for more information.",
  },
  enableForAnalysis: {
    ...postTableInputs.enableForAnalysis,
    ...modelBooleanUpdateInput,
    label: postTableInputs.enableForAnalysis.label,
  },
};
