import {
  connectionInput,
  fieldId,
  fieldValue,
  getCustomTaskIds,
  getlistId,
  getTaskId,
  getTeamId,
  valueType,
} from "./common";

const listId = getlistId(true);
const taskIdForRemove = getTaskId(true, "The unique identifier of the task to update.");
const customTaskIdsForRemove = getCustomTaskIds(
  false,
  "When true, allows referencing the task by its Custom Task ID instead of the regular task ID.",
  true
);
const teamIdForRemove = getTeamId(false, "The Workspace (Team) ID. Only used when Custom Task ID is set to true.");
const taskIdForSet = getTaskId(true, "The unique identifier of the task to update.");

export const getAccessibleCustomFieldsInputs = {
  connection: connectionInput,
  listId,
};

export const removeCustomFieldValueInputs = {
  connection: connectionInput,
  taskId: taskIdForRemove,
  fieldId,
  customTaskIds: customTaskIdsForRemove,
  teamId: teamIdForRemove,
};

export const setCustomFieldValueInputs = {
  connection: connectionInput,
  taskId: taskIdForSet,
  fieldId,
  fieldValue,
  valueType,
};
