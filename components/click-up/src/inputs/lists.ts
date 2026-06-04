import {
  assigneeInt,
  connectionInput,
  getArchived,
  getAssignee,
  getContent,
  getDueDateInt,
  getDueDateTime,
  getFolderId,
  getListName,
  getlistId,
  getPriority,
  getStatus,
  getTaskId,
  getUnsetStatus,
} from "./common";


const listIdForAdd = getlistId(true);
const taskIdForAdd = getTaskId(true);


const listNameForCreate = getListName(true, "The display name for the new List.");
const folderIdForCreate = getFolderId(true);
const contentForCreate = getContent(false);
const dueDateForCreate = getDueDateInt(
  false,
  "The initial due date for the new List as a Unix timestamp in milliseconds."
);
const dueDateTimeForCreate = getDueDateTime(false, "When true, the due date includes a specific time of day.", false);
const priorityForCreate = getPriority(
  false,
  "The initial priority for the new List, as an integer from 1 (Urgent) to 4 (Low)."
);
const statusForCreate = getStatus(
  false,
  "The List color. Status refers to the List color rather than the task Statuses available in the List."
);


const listIdForDelete = getlistId(true);
const listIdForGet = getlistId(true);


const folderIdForList = getFolderId(true);
const archivedForList = getArchived(false, "When true, includes archived Lists in the results.", false);


const listIdForRemove = getlistId(true);
const taskIdForRemove = getTaskId(true);


const listIdForUpdate = getlistId(true);
const listNameForUpdate = getListName(true, "The display name for the List.");
const contentForUpdate = getContent(true);
const dueDateForUpdate = getDueDateInt(true, "The due date for the List as a Unix timestamp in milliseconds.");
const dueDateTimeForUpdate = getDueDateTime(true, "When true, the due date includes a specific time of day.", false);
const priorityForUpdate = getPriority(true, "The priority for the List, as an integer from 1 (Urgent) to 4 (Low).");
const assigneeForUpdate = getAssignee(true, "The user ID of the List assignee.");
const statusForUpdate = getStatus(
  true,
  "The List color. Status refers to the List color rather than the task Statuses available in the List."
);
const unsetStatusForUpdate = getUnsetStatus(
  true,
  "When true, removes the List color (status). Defaults to false.",
  false
);

export const addTaskToListInputs = {
  clickUpConnection: connectionInput,
  listId: listIdForAdd,
  taskId: taskIdForAdd,
};

export const createListInputs = {
  clickUpConnection: connectionInput,
  folderId: folderIdForCreate,
  listName: listNameForCreate,
  content: contentForCreate,
  dueDate: dueDateForCreate,
  dueDateTime: dueDateTimeForCreate,
  priority: priorityForCreate,
  assigneeInt,
  status: statusForCreate,
  name: listNameForCreate,
};

export const deleteListInputs = {
  clickUpConnection: connectionInput,
  listId: listIdForDelete,
};

export const getListInputs = {
  clickUpConnection: connectionInput,
  listId: listIdForGet,
};

export const getListsInputs = {
  clickUpConnection: connectionInput,
  folderId: folderIdForList,
  archived: archivedForList,
};

export const removeTaskFromListInputs = {
  clickUpConnection: connectionInput,
  listId: listIdForRemove,
  taskId: taskIdForRemove,
};

export const updateListInputs = {
  clickUpConnection: connectionInput,
  listId: listIdForUpdate,
  name: listNameForUpdate,
  content: contentForUpdate,
  dueDate: dueDateForUpdate,
  dueDateTime: dueDateTimeForUpdate,
  priority: priorityForUpdate,
  assignee: assigneeForUpdate,
  status: statusForUpdate,
  unsetStatus: unsetStatusForUpdate,
};
