import { input, util } from "@prismatic-io/spectral";
import { cleanNumber, cleanStringByRequired } from "../util";
import {
  connectionInput,
  getArchived,
  getAssignee,
  getDueDateInt,
  getDueDateTime,
  getFolderId,
  getlistId,
  getPriority,
  getStatus,
  getTaskId,
} from "./common";
const assigneeInt = input({
  label: "Assignee",
  type: "string",
  placeholder: "Enter assignee ID",
  example: "12345678",
  comments: "Include a user_id to assign this List.",
  required: false,
  clean: cleanNumber,
});
const getListName = (required: boolean, comments: string) =>
  input({
    label: "Name",
    type: "string",
    placeholder: "Enter name",
    comments,
    required,
    clean: util.types.toString,
  });
const getContent = <R extends boolean>(required: R, comments: string) =>
  input({
    label: "Content",
    type: "string",
    placeholder: "Enter content",
    comments,
    required,
    clean: cleanStringByRequired(required),
  });
const getUnsetStatus = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Unset Status",
    type: "boolean",
    comments,
    required,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
    clean: util.types.toBool,
  });
export const addTaskToListInputs = {
  clickUpConnection: connectionInput,
  listId: getlistId(true, "The unique identifier for the List."),
  taskId: getTaskId(true, "The unique identifier for the task."),
};
export const createListInputs = {
  clickUpConnection: connectionInput,
  folderId: getFolderId(true, "The unique identifier for the Folder."),
  listName: getListName(true, "Name of the new list"),
  content: getContent(false, "The description of the List, in plain text."),
  dueDate: getDueDateInt(false, "Initial due date of the new list"),
  dueDateTime: getDueDateTime(
    false,
    "When true, the Due Date includes a time of day rather than only a date.",
    false,
  ),
  priority: getPriority(false, "Initial priority of the new list"),
  assigneeInt,
  status: getStatus(
    false,
    "Status refers to the List color rather than the task Statuses available in the List.",
  ),
  name: getListName(true, "Name of the new list"),
};
export const deleteListInputs = {
  clickUpConnection: connectionInput,
  listId: getlistId(true, "The unique identifier for the List."),
};
export const getListInputs = {
  clickUpConnection: connectionInput,
  listId: getlistId(true, "The unique identifier for the List."),
};
export const getListsInputs = {
  clickUpConnection: connectionInput,
  folderId: getFolderId(true, "The unique identifier for the Folder."),
  archived: getArchived(false, "When true, returns archived Lists.", false),
};
export const removeTaskFromListInputs = {
  clickUpConnection: connectionInput,
  listId: getlistId(true, "The unique identifier for the List."),
  taskId: getTaskId(true, "The unique identifier for the task."),
};
export const updateListInputs = {
  clickUpConnection: connectionInput,
  listId: getlistId(true, "The unique identifier for the List."),
  name: getListName(true, "Name of the list"),
  content: getContent(true, "The description of the List, in plain text."),
  dueDate: getDueDateInt(true, "Due date of the list"),
  dueDateTime: getDueDateTime(
    true,
    "When true, the Due Date includes a time of day rather than only a date.",
    false,
  ),
  priority: getPriority(true, "Priority of the list"),
  assignee: getAssignee(true, "User ID of the list assignee"),
  status: getStatus(
    true,
    "Status refers to the List color rather than the task Statuses available in the List.",
  ),
  unsetStatus: getUnsetStatus(
    true,
    "When true, removes the List color.",
    false,
  ),
};
