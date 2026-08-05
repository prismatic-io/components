import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  TAG_OPT_FIELDS,
  TASK_FOLLOWERS_OPT_FIELDS,
  TASK_OPT_FIELDS,
} from "../constants";
import { cleanString, validateId } from "../util";
import {
  assigneeId,
  connectionInput,
  dueOn,
  followersList,
  htmlNotes,
  name,
  notes,
  optFields,
  pagination,
  projectId,
  startOn,
  tagId,
  taskId,
  workspaceId,
} from "./common";
const approvalStatus = input({
  label: "Approval Status",
  type: "string",
  example: "Pending",
  model: [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Changes Requested", value: "changes_requested" },
  ],
  comments: "The approval status to set on the task.",
  required: true,
  clean: cleanString,
});
const assigneeSectionId = input({
  label: "Assignee Section ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter assignee section ID",
  comments:
    "The unique identifier for the section to assign the task to. The assignee section is a subdivision of a project that groups tasks together in the assignee's 'My Tasks' list.",
  required: false,
  clean: (value) => validateId(value) || undefined,
});
const assigneeStatus = input({
  label: "Assignee Status",
  type: "string",
  example: "upcoming",
  placeholder: "Enter assignee status",
  comments:
    "The status the task has in relation to its assignee. This field is deprecated — it can still be used in requests but is not recommended for new records.",
  required: false,
  clean: cleanString,
});
const isCompleted = input({
  label: "Completed",
  type: "string",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "Do not change", value: "" },
  ],
  default: "",
  comments:
    "Whether the task is marked as complete. Select 'Do not change' to leave the existing value untouched.",
  required: false,
  clean: (value) => (value === "" ? undefined : util.types.toBool(value)),
});
const completedBy = input({
  label: "Completed By",
  type: "string",
  example: "John Doe",
  placeholder: "Enter completer name, user ID, or email",
  comments:
    "The name of the user who completed the task. A user gid or email address may also be provided to reference an existing Asana user.",
  required: false,
  clean: (value) => util.types.toString(value).trim() || undefined,
});
const isLiked = input({
  label: "Is Liked",
  type: "string",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "Do not change", value: "" },
  ],
  default: "",
  required: false,
  comments:
    "Whether the task is marked as 'liked' for the authenticated user. Select 'Do not change' to leave the existing value untouched.",
  clean: (value) => (value === "" ? undefined : util.types.toBool(value)),
});
const parentId = input({
  label: "Parent ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter parent ID",
  comments: "The unique identifier of the parent element.",
  required: false,
  clean: (value) => validateId(value) || undefined,
});
const resourceSubtype = input({
  label: "Resource Subtype",
  type: "string",
  example: "task",
  placeholder: "Enter resource subtype",
  comments:
    "The subtype of the resource (e.g., 'default_task', 'milestone'). See [Asana resource subtypes](https://developers.asana.com/docs/object-hierarchy) for valid values.",
  required: false,
  clean: cleanString,
});
const dueAt = input({
  label: "Due At",
  type: "string",
  example: "2019-09-15T02:06:58.147Z",
  placeholder: "Enter due timestamp (ISO 8601)",
  comments:
    "The date and time the task is due. Format: ISO 8601 in UTC. Should not be used together with Due On.",
  required: false,
  clean: (value) => (value ? util.types.toDate(value) : undefined),
});
const startAt = input({
  label: "Start At",
  type: "string",
  comments:
    "The date and time work begins for the task, or null if the task has no start time. Format: ISO 8601 in UTC. Should not be used together with Start On. Due At must be present when setting or unsetting this parameter.",
  example: "2019-09-14T02:06:58.147Z",
  placeholder: "Enter start timestamp (ISO 8601)",
  required: false,
  clean: util.types.toString,
});
const projectList = input({
  label: "Project List",
  type: "string",
  example: "843750385",
  collection: "valuelist",
  placeholder: "Enter project ID",
  comments:
    "A list of project gids the task should belong to. Provide one project ID per entry.",
  required: false,
});
const scheduling = structuredObjectInput({
  label: "Scheduling",
  required: false,
  comments: "Due date, due timestamp, start date, and start timestamp.",
  inputs: { dueAt, dueOn, startAt, startOn },
});
const createTaskStatus = structuredObjectInput({
  label: "Task Status",
  required: false,
  comments: "Assignee Status, Completed By, Completed, and Is Liked.",
  inputs: { assigneeStatus, completedBy, isCompleted, isLiked },
});
const updateTaskStatus = structuredObjectInput({
  label: "Task Status",
  required: false,
  comments:
    "Approval Status, Assignee Status, Completed By, Completed, and Is Liked.",
  inputs: {
    approvalStatus: { ...approvalStatus, required: false },
    assigneeStatus,
    completedBy,
    isCompleted,
    isLiked,
  },
});
export const createTaskInputs = {
  asanaConnection: connectionInput,
  approvalStatus,
  assigneeId,
  assigneeSectionId,
  followersList,
  htmlNotes,
  name,
  notes,
  optFields: { ...optFields, default: TASK_OPT_FIELDS },
  parentId,
  projectList,
  resourceSubtype,
  scheduling,
  taskStatus: createTaskStatus,
  workspaceId,
};
export const updateTaskInputs = {
  asanaConnection: connectionInput,
  assigneeId: { ...assigneeId, required: false },
  assigneeSectionId,
  htmlNotes,
  name,
  notes,
  optFields: { ...optFields, default: TASK_OPT_FIELDS },
  parentId,
  resourceSubtype,
  scheduling,
  taskId,
  taskStatus: updateTaskStatus,
  workspaceId: { ...workspaceId, required: false },
};
export const listTasksInputs = {
  asanaConnection: connectionInput,
  assigneeId: { ...assigneeId, required: false },
  optFields: { ...optFields, default: TASK_OPT_FIELDS },
  pagination,
  projectId: { ...projectId, required: false },
  workspaceId: { ...workspaceId, required: false },
};
export const getTaskInputs = {
  asanaConnection: connectionInput,
  optFields: { ...optFields, default: TASK_OPT_FIELDS },
  taskId,
};
export const deleteTaskInputs = {
  asanaConnection: connectionInput,
  taskId,
};
export const addTagToTaskInputs = {
  asanaConnection: connectionInput,
  optFields: { ...optFields, default: TAG_OPT_FIELDS },
  tagId,
  taskId,
};
export const removeTagFromTaskInputs = {
  asanaConnection: connectionInput,
  tagId,
  taskId,
};
export const addFollowersToTaskInputs = {
  asanaConnection: connectionInput,
  followersList,
  optFields: {
    ...optFields,
    default: TASK_FOLLOWERS_OPT_FIELDS,
  },
  taskId,
};
export const removeFollowersFromTaskInputs = {
  asanaConnection: connectionInput,
  followersList,
  optFields: {
    ...optFields,
    default: TASK_FOLLOWERS_OPT_FIELDS,
  },
  taskId,
};
export const removeAssigneeFromTaskInputs = {
  asanaConnection: connectionInput,
  taskId,
};
export const selectTaskInputs = {
  connection: connectionInput,
  project: {
    ...projectId,
    required: false,
    clean: cleanString,
    dataSource: undefined,
  },
  workspace: {
    ...workspaceId,
    required: false,
    clean: cleanString,
    dataSource: undefined,
    comments: `${workspaceId.comments} Workspace ID must be provided with an Assignee ID.`,
  },
  assignee: {
    ...assigneeId,
    comments: `${assigneeId.comments} Assignee ID must be provided with a Workspace ID.`,
  },
};
