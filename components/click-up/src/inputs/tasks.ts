import {
  connectionInput,
  customFields,
  customFieldsCode,
  dateCreatedGt,
  dateCreatedLt,
  dateDoneGt,
  dateDoneLt,
  dateUpdatedGt,
  dateUpdatedLt,
  dueDateGt,
  dueDateLt,
  getAddAssignees,
  getArchived,
  getAssignees,
  getCheckRequiredCustomFields,
  getCustomTaskIds,
  getDescription,
  getDueDateInt,
  getDueDateTime,
  getLinksTo,
  getlistId,
  getNotifyAll,
  getParent,
  getPriority,
  getRemoveAssignees,
  getStartDateInt,
  getStartDateTime,
  getStatus,
  getSubTasks,
  getTags,
  getTaskId,
  getTaskName,
  getTeamId,
  getTimeEstimate,
  includeClosed,
  markdownDescription,
  orderBy,
  page,
  reverse,
} from "./common";


const listIdForCreate = getlistId(true);
const customTaskIdsForCreate = getCustomTaskIds(
  false,
  "When true, allows referencing the task by its Custom Task ID instead of the regular task ID."
);
const teamIdForCreate = getTeamId(false, "The Workspace (Team) ID. Only used when Custom Task ID is set to true.");
const nameForCreate = getTaskName(true, "The display name of the new task.");
const descriptionForCreate = getDescription(false, "A plain-text description of the task.");
const assigneesForCreate = getAssignees(false, "A list of user IDs to assign to the task.");
const tagsForCreate = getTags(false, "A list of tag names to attach to the task.");
const statusForCreate = getStatus(false, "The initial status to assign to the task.");
const priorityForCreate = getPriority(false, "The priority level as an integer from 1 (Urgent) to 4 (Low).");
const dueDateForCreate = getDueDateInt(
  false,
  "The deadline for the task as a Unix timestamp in milliseconds.",
  "1508369194377"
);
const dueDateTimeForCreate = getDueDateTime(false, "When true, the due date includes a specific time of day.", false);
const timeEstimateForCreate = getTimeEstimate(
  false,
  "The estimated duration to complete the task, expressed in milliseconds.",
  "8640000"
);
const startDateForCreate = getStartDateInt(
  false,
  "The task start date as a Unix timestamp in milliseconds.",
  "1567780450202"
);
const startDateTimeForCreate = getStartDateTime(
  false,
  "When true, the start date includes a specific time of day.",
  false
);
const notifyAllForCreate = getNotifyAll(
  false,
  "When true, sends notifications to everyone affected, including the comment creator.",
  true
);
const parentForCreate = getParent(
  false,
  "An existing task ID to use as the parent task, making this task a subtask. The parent must not itself be a subtask and must live in the same List specified by the List ID."
);
const linksToForCreate = getLinksTo(false, "An existing task ID to create a linked dependency from this new task.");
const checkRequiredCustomFieldsForCreate = getCheckRequiredCustomFields(
  false,
  "When true, the API rejects the task if any required Custom Fields are missing. Defaults to false, which ignores required Custom Fields.",
  false
);


const taskIdForDelete = getTaskId(true);
const customTaskIdsForDelete = getCustomTaskIds(false);
const teamIdForDelete = getTeamId(false, "The Workspace (Team) ID. Only used when Custom Task ID is set to true.");


const taskIdForGet = getTaskId(true);
const customTaskIdsForGet = getCustomTaskIds(false);
const teamIdForGet = getTeamId(true, "The Workspace (Team) ID. Only used when Custom Task ID is set to true.");
const subTasksForGet = getSubTasks(false, "When true, includes subtasks in the response. Defaults to false.");


const listIdForList = getlistId(true);
const subTasksForList = getSubTasks(true, "When true, includes subtasks in the response. Defaults to false.");
const archivedForList = getArchived(false, "When true, includes archived tasks in the results.", false);
const assigneesForList = getAssignees(false, "Filters results to tasks with these assignee user IDs.");
const tagsForList = getTags(false, "Filters results to tasks with these tag names.");


const taskIdForUpdate = getTaskId(true);
const customTaskIdsForUpdate = getCustomTaskIds(
  false,
  "When true, allows referencing the task by its Custom Task ID instead of the regular task ID."
);
const teamIdForUpdate = getTeamId(false, "The Workspace (Team) ID. Only used when Custom Task ID is set to true.");
const nameForUpdate = getTaskName(false, "The updated display name for the task.");
const descriptionForUpdate = getDescription(false, "A plain-text description of the task.");
const statusForUpdate = getStatus(false, "The updated status for the task.");
const priorityForUpdate = getPriority(false, "The priority level as an integer from 1 (Urgent) to 4 (Low).");
const dueDateForUpdate = getDueDateInt(
  false,
  "The deadline for the task as a Unix timestamp in milliseconds.",
  "1508369194377"
);
const dueDateTimeForUpdate = getDueDateTime(false, "When true, the due date includes a specific time of day.", false);
const parentForUpdate = getParent(
  false,
  "An existing task ID to set as the new parent, moving this task to be a subtask of that parent."
);
const timeEstimateForUpdate = getTimeEstimate(
  false,
  "The estimated duration to complete the task, expressed in milliseconds.",
  "8640000"
);
const startDateForUpdate = getStartDateInt(
  false,
  "The task start date as a Unix timestamp in milliseconds.",
  "1567780450202"
);
const startDateTimeForUpdate = getStartDateTime(
  false,
  "When true, the start date includes a specific time of day.",
  false
);
const addAssigneesForUpdate = getAddAssignees(false, "A list of user IDs to add as assignees on the task.");
const removeAssigneesForUpdate = getRemoveAssignees(
  false,
  "A list of user IDs to remove from the assignees of the task."
);
const archivedForUpdate = getArchived(false, "When true, marks the task as archived.", false);

export const createTaskInputs = {
  connection: connectionInput,
  listId: listIdForCreate,
  customTaskIds: customTaskIdsForCreate,
  teamId: teamIdForCreate,
  name: nameForCreate,
  description: descriptionForCreate,
  markdownDescription,
  assignees: assigneesForCreate,
  tags: tagsForCreate,
  status: statusForCreate,
  priority: priorityForCreate,
  dueDate: dueDateForCreate,
  dueDateTime: dueDateTimeForCreate,
  timeEstimate: timeEstimateForCreate,
  startDate: startDateForCreate,
  startDateTime: startDateTimeForCreate,
  notifyAll: notifyAllForCreate,
  parent: parentForCreate,
  linksTo: linksToForCreate,
  checkRequiredCustomFields: checkRequiredCustomFieldsForCreate,
  customFields,
};

export const deleteTaskInputs = {
  connection: connectionInput,
  taskId: taskIdForDelete,
  customTaskIds: customTaskIdsForDelete,
  teamId: teamIdForDelete,
};

export const getTaskInputs = {
  connection: connectionInput,
  taskId: taskIdForGet,
  teamId: teamIdForGet,
  customTaskIds: customTaskIdsForGet,
  subTasks: subTasksForGet,
};

export const listTasksInputs = {
  connection: connectionInput,
  listId: listIdForList,
  page,
  archived: archivedForList,
  orderBy,
  reverse,
  subTasks: subTasksForList,
  includeClosed,
  assignees: assigneesForList,
  tags: tagsForList,
  dueDateGt,
  dueDateLt,
  dateCreatedGt,
  dateCreatedLt,
  dateUpdatedGt,
  dateUpdatedLt,
  dateDoneGt,
  dateDoneLt,
  customFieldsCode,
};

export const updateTaskInputs = {
  connection: connectionInput,
  taskId: taskIdForUpdate,
  customTaskIds: customTaskIdsForUpdate,
  teamId: teamIdForUpdate,
  name: nameForUpdate,
  description: descriptionForUpdate,
  markdownDescription,
  status: statusForUpdate,
  priority: priorityForUpdate,
  dueDate: dueDateForUpdate,
  dueDateTime: dueDateTimeForUpdate,
  parent: parentForUpdate,
  timeEstimate: timeEstimateForUpdate,
  startDate: startDateForUpdate,
  startDateTime: startDateTimeForUpdate,
  addAssignees: addAssigneesForUpdate,
  removeAssignees: removeAssigneesForUpdate,
  archived: archivedForUpdate,
};
