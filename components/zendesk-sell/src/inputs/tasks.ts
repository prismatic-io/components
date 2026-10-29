import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "./common";

const resourceType = input({
  label: "Resource Type",
  comments:
    "The type of resource the task is related to. Possible values: lead, contact, deal.",
  placeholder: "Enter resource type",
  example: "lead",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const resourceTypeFilter = input({
  label: "Resource Type",
  comments:
    "Name of the resource type to search for. Possible values: lead, contact, deal.",
  placeholder: "Enter resource type",
  example: "lead",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const resourceId = input({
  label: "Resource ID",
  comments: "The unique identifier of the resource the task is related to.",
  placeholder: "Enter resource ID",
  example: "1",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const resourceIdFilter = input({
  label: "Resource ID",
  comments: "Unique identifier of the resource to search for.",
  placeholder: "Enter resource ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const dueDate = input({
  label: "Due Date",
  comments: "The date and time when the task is due. Format: ISO8601 UTC.",
  placeholder: "Enter due date",
  example: "2014-09-27T16:32:56Z",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const taskCompleted = input({
  label: "Completed",
  comments: "When true, marks the task as completed.",
  type: "string",
  required: false,
  default: "",
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  clean: util.types.toString,
});

const remindAt = input({
  label: "Remind At",
  comments:
    "The date and time to send a reminder for this task. Format: ISO8601 UTC.",
  placeholder: "Enter reminder date",
  example: "2014-09-29T15:32:56Z",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ownerId = input({
  label: "Owner ID",
  placeholder: "Enter Owner ID",
  example: "12345678",
  comments:
    "Defaults to the unique identifier of the user who created the task.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ownerIdFilter = input({
  label: "Owner ID",
  placeholder: "Enter Owner ID",
  example: "12345678",
  comments:
    "Unique identifier of the user. Returns all tasks owned by the user.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const contentRequired = input({
  label: "Content",
  comments: "The description or body of the task.",
  placeholder: "Enter task content",
  example: "Contact Tom",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const contentOptional = input({
  label: "Content",
  comments: "The description or body of the task.",
  placeholder: "Enter task content",
  example: "Contact Tom",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const taskId = input({
  label: "Task ID",
  comments: "The unique identifier of the task.",
  placeholder: "Enter task ID",
  example: "12345678",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectTask",
});

const position = input({
  label: "Position",
  comments:
    "The client position in the Firehose stream. Possible values: top, tail, or a position string from a previous API response.",
  placeholder: "Enter stream position",
  example: "top",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const limit = input({
  label: "Limit",
  comments: "The maximum number of events to return in a single response.",
  placeholder: "Enter limit",
  example: "100",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const sortBy = input({
  label: "Sort By",
  comments:
    "A field to sort by. The default ordering is ascending. To change the sort order to descending, append :desc to the field.",
  placeholder: "Enter field to sort by",
  example: "resource_type:desc",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ids = input({
  label: "IDs",
  comments: "Comma-separated list of task IDs to be returned in a request.",
  placeholder: "Enter comma-separated IDs",
  example: "12345678,87654321",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const creatorId = input({
  label: "Creator ID",
  comments:
    "Unique identifier of the user. Returns all tasks created by the user.",
  placeholder: "Enter Creator ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const q = input({
  label: "Query",
  comments:
    "A query string to search for. Performs a full text search on the content field.",
  placeholder: "Enter search query",
  example: "follow up",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const type = input({
  label: "Type",
  comments: "Type of tasks to search for. Possible values: floating, related.",
  placeholder: "Enter task type",
  example: "floating",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const completed = input({
  label: "Completed",
  comments:
    "Indicates whether the query will return tasks that are completed or not.",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  required: false,
  clean: util.types.toString,
});

const overdue = input({
  label: "Overdue",
  comments:
    "Indicates whether the query will return tasks where the due_date parameter has been passed or not.",
  type: "string",
  required: false,
  default: "",
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  clean: util.types.toString,
});

const remind = input({
  label: "Remind",
  comments:
    "Indicates whether the query will return tasks with reminders or without reminders.",
  type: "string",
  required: false,
  default: "",
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  clean: util.types.toString,
});

const page = input({
  label: "Page",
  comments:
    "Page number to start from. Page numbering starts at 1 and omitting the page parameter will return the first page.",
  placeholder: "Enter page number",
  example: "1",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const perPage = input({
  label: "Per Page",
  comments:
    "Number of records to return per page. The default limit is 25 and the maximum number that can be returned is 100.",
  placeholder: "Enter results per page",
  example: "25",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, perPage },
});

const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields for the request. Includes: Sort By, Query, Resource Type, Resource ID, IDs, Creator ID, Owner ID, Overdue, and Remind.",
  inputs: {
    sortBy,
    q,
    resourceType: resourceTypeFilter,
    resourceId: resourceIdFilter,
    ids,
    creatorId,
    ownerId: ownerIdFilter,
    overdue,
    remind,
  },
});

export const createTaskInputs = {
  connection,
  content: contentRequired,
  resourceType,
  resourceId,
  dueDate,
  completed: taskCompleted,
  remindAt,
  ownerId,
};

export const deleteTaskInputs = {
  connection,
  id: taskId,
};

export const getTaskInputs = {
  connection,
  id: taskId,
};

export const getTasksStreamInputs = {
  connection,
  position,
  limit,
};

export const listTasksInputs = {
  connection,
  fetchAll,
  type,
  completed,
  pagination,
  additionalFields,
};

export const updateTaskInputs = {
  connection,
  id: taskId,
  content: contentOptional,
  resourceType,
  resourceId,
  dueDate,
  completed: taskCompleted,
  remindAt,
  ownerId,
};
