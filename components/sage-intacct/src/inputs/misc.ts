import { input, util } from "@prismatic-io/spectral";
import { ALL_DELETE_OBJECTS_MODEL } from "../constants";
import { connection, fieldsInput } from "./common";
const objectNameInput = input({
  label: "Object Name",
  type: "string",
  comments:
    "Name of the object to query. Possible values are: VENDOR, APBILL, APPYMT, ARPYMT, ARADJUSTMENT, ARADJUSTMENTITEM, ARADVANCE, etc.",
  example: "VENDOR",
  placeholder: "Enter object name (e.g., VENDOR, APBILL)",
  required: true,
  clean: util.types.toString,
});
const queryInput = input({
  label: "Query",
  type: "string",
  comments: "Query filter expression to filter the records",
  required: false,
  example: "VENDOR.CREDITLIMIT > 10000",
  placeholder: "Enter query filter",
  clean: util.types.toString,
});
const object = input({
  label: "Object",
  type: "string",
  comments: "Type of object to delete",
  model: ALL_DELETE_OBJECTS_MODEL,
  required: true,
  clean: util.types.toString,
});
const keys = input({
  label: "Keys",
  type: "string",
  comments:
    "A key or comma-separated list (123,456) of keys (RECORDNO's) to delete",
  example: "123",
  placeholder: "Enter record number",
  required: true,
  clean: util.types.toString,
});
export const deleteObjectInputs = {
  connection,
  object,
  keys,
};
export const queryAndListInputs = {
  connection,
  fieldsInput,
  objectNameInput,
  queryInput,
};
