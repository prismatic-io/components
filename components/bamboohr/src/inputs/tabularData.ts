import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { connectionInput, employeeId } from "./common";

const tableName = input({
  label: "Table Name (Alias)",
  type: "string",
  required: true,
  comments:
    "The alias of the BambooHR table to read or modify (for example, jobInfo, compensation, or employmentStatus).",
  placeholder: "Enter table name",
  example: "jobInfo",
  clean: util.types.toString,
});

const tableFieldValues = input({
  label: "Table Fields",
  placeholder: "Enter table fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    'The names of the fields and their values to use when creating or updating a row in a table. Use the "List Tabular Fields" action to list the field names for a table. Values for list-type fields (for example jobTitle, employmentStatus, or relationship) must exactly match an existing option in BambooHR; a value that does not match is rejected.',
  clean: (values: unknown) =>
    util.types.keyValPairListToObject(values as KeyValuePair<unknown>[]),
});

const rowId = input({
  label: "Row ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the row in the table.",
  placeholder: "Enter row ID",
  example: "123",
  clean: util.types.toString,
});

export const getEmployeeTableInputs = {
  connection: connectionInput,
  employeeId,
  tableName,
};

export const getTabularFieldsInputs = {
  connection: connectionInput,
};

export const addEmployeeTableRowInputs = {
  connection: connectionInput,
  employeeId,
  tableName,
  tableFieldValues,
};

export const updateEmployeeTableRowInputs = {
  connection: connectionInput,
  employeeId,
  tableName,
  rowId,
  tableFieldValues,
};
