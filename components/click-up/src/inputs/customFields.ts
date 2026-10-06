import { input, util } from "@prismatic-io/spectral";
import { cleanString, toTimestampIfDate } from "../util";
import {
  connectionInput,
  getCustomTaskIds,
  getlistId,
  getTaskId,
  getTeamId,
} from "./common";
const fieldId = input({
  label: "Field ID",
  type: "string",
  placeholder: "Enter Field ID",
  required: true,
  comments: "The universal unique identifier (UUID) of the Custom Field.",
  clean: util.types.toString,
  dataSource: "customFields",
});
const fieldValue = input({
  label: "Field Value",
  type: "data",
  placeholder: "Field value from previous step",
  comments: "The value to set for the custom field.",
  required: true,
  clean: toTimestampIfDate,
});
const valueType = input({
  label: "Value Type",
  type: "string",
  placeholder: "Enter value type",
  comments:
    "Set to date when Field Value is a date, so it is converted to a Unix timestamp in milliseconds. Leave empty for other values.",
  required: false,
  clean: cleanString,
});
export const getAccessibleCustomFieldsInputs = {
  connection: connectionInput,
  listId: getlistId(
    true,
    "The unique identifier for the List whose Custom Fields are returned.",
  ),
};
export const removeCustomFieldValueInputs = {
  connection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task to update."),
  fieldId,
  customTaskIds: getCustomTaskIds(
    false,
    "When true, the Task ID is treated as a custom task ID. Requires Team ID.",
    true,
  ),
  teamId: getTeamId(
    false,
    "Only used when the custom_task_ids parameter is set to true",
  ),
};
export const setCustomFieldValueInputs = {
  connection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task to update."),
  fieldId,
  fieldValue,
  valueType,
};
