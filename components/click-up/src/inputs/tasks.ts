import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanNumber,
  cleanNumberArray,
  cleanString,
  cleanStringArray,
  cleanStringByRequired,
  toKeyValuePairList,
} from "../util";
import {
  connectionInput,
  getArchived,
  getCustomTaskIds,
  getDescription,
  getDueDateInt,
  getDueDateTime,
  getlistId,
  getNotifyAll,
  getPriority,
  getStatus,
  getTaskId,
  getTeamId,
} from "./common";
const customFieldsCode = input({
  label: "Custom Fields",
  type: "code",
  placeholder: "Enter custom field filters JSON",
  language: "json",
  comments:
    "JSON object containing an array of custom field filters. Each filter has a field_id, operator (=, <, >, <=, >=, !=), and value.",
  example: JSON.stringify(
    {
      custom_fields: [
        {
          field_id: "abcdefghi12345678",
          operator: "=",
          value: "1234",
        },
        {
          field_id: "jklmnop123456",
          operator: "<",
          value: "5",
        },
      ],
    },
    null,
    2,
  ),
  required: false,
  clean: util.types.toString,
});
const getStartDateInt = (
  required: boolean,
  comments: string,
  example?: string,
) =>
  input({
    label: "Start Date",
    type: "string",
    placeholder: "Enter start date",
    ...(example?.length && { example }),
    required,
    comments,
    clean: cleanNumber,
  });
const getStartDateTime = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Start Date Time",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });
const getTags = (required: boolean, comments: string) =>
  input({
    label: "Tag",
    type: "string",
    collection: "valuelist",
    placeholder: "Enter tag name",
    comments,
    required,
    clean: cleanStringArray,
  });
const getTaskName = <R extends boolean>(required: R, comments: string) =>
  input({
    label: "Name",
    type: "string",
    placeholder: "Enter name",
    comments,
    required,
    clean: cleanStringByRequired(required),
  });
const getParent = <R extends boolean>(required: R, comments: string) =>
  input({
    label: "Parent",
    type: "string",
    placeholder: "Enter parent task ID",
    comments,
    required,
    clean: cleanStringByRequired(required),
  });
const getLinksTo = (required: boolean, comments: string) =>
  input({
    label: "Links To",
    type: "string",
    placeholder: "Enter task ID",
    comments,
    required,
    clean: util.types.toString,
  });
const getTimeEstimate = (
  required: boolean,
  comments: string,
  example?: string,
) =>
  input({
    label: "Time Estimate",
    type: "string",
    placeholder: "Enter time estimate",
    comments,
    required,
    ...(example?.length && { example }),
    clean: cleanNumber,
  });
const getCheckRequiredCustomFields = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Check Required Custom Fields",
    type: "boolean",
    comments,
    required,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
    clean: util.types.toBool,
  });
const getAssignees = (required: boolean, comments: string) =>
  input({
    label: "Assignee",
    type: "string",
    collection: "valuelist",
    placeholder: "Enter user ID",
    comments,
    required,
    clean: cleanNumberArray,
  });
const getAddAssignees = (required: boolean, comments: string) =>
  input({
    label: "Add Assignee",
    type: "string",
    collection: "valuelist",
    placeholder: "Enter user ID",
    comments,
    required,
    clean: cleanNumberArray,
  });
const getRemoveAssignees = (required: boolean, comments: string) =>
  input({
    label: "Remove Assignee",
    type: "string",
    collection: "valuelist",
    placeholder: "Enter user ID",
    comments,
    required,
    clean: cleanNumberArray,
  });
const customFields = input({
  label: "Custom Fields",
  type: "string",
  collection: "keyvaluelist",
  placeholder: "Enter custom field ID and value",
  comments: "Custom field key-value pairs to set on the task.",
  example: '{"field_id": "value"}',
  required: false,
  clean: toKeyValuePairList,
});
const orderBy = input({
  label: "Order By",
  type: "string",
  placeholder: "Enter order by field",
  required: false,
  comments:
    "Order by a particular field. By default, tasks are ordered by created.",
  example: "created",
  clean: cleanString,
});
const reverse = input({
  label: "Reverse",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, tasks are displayed in reverse order.",
  clean: util.types.toBool,
});
const includeClosed = input({
  label: "Include Closed",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, includes closed tasks in the results. By default, they are excluded.",
  clean: util.types.toBool,
});
const dueDateGt = input({
  label: "Due Date Greater Than",
  type: "string",
  placeholder: "Enter due date",
  example: "1609459200000",
  required: false,
  comments: "Filter by due date greater than Unix time in milliseconds.",
  clean: cleanString,
});
const dueDateLt = input({
  label: "Due Date Less Than",
  type: "string",
  placeholder: "Enter due date",
  example: "1609459200000",
  required: false,
  comments: "Filter by due date less than Unix time in milliseconds.",
  clean: cleanString,
});
const dateCreatedGt = input({
  label: "Date Created Greater Than",
  type: "string",
  placeholder: "Enter date created",
  example: "1609459200000",
  required: false,
  comments: "Filter by date created greater than Unix time in milliseconds.",
  clean: cleanString,
});
const dateCreatedLt = input({
  label: "Date Created Less Than",
  type: "string",
  placeholder: "Enter date created",
  example: "1609459200000",
  required: false,
  comments: "Filter by date created less than Unix time in milliseconds.",
  clean: cleanString,
});
const dateUpdatedGt = input({
  label: "Date Updated Greater Than",
  type: "string",
  placeholder: "Enter date updated",
  example: "1609459200000",
  required: false,
  comments: "Filter by date updated greater than Unix time in milliseconds.",
  clean: cleanString,
});
const dateUpdatedLt = input({
  label: "Date Updated Less Than",
  type: "string",
  placeholder: "Enter date updated",
  example: "1609459200000",
  required: false,
  comments: "Filter by date updated less than Unix time in milliseconds.",
  clean: cleanString,
});
const dateDoneGt = input({
  label: "Date Done Greater Than",
  type: "string",
  placeholder: "Enter date done",
  example: "1609459200000",
  required: false,
  comments: "Filter by date done greater than Unix time in milliseconds.",
  clean: cleanString,
});
const dateDoneLt = input({
  label: "Date Done Less Than",
  type: "string",
  placeholder: "Enter date done",
  example: "1609459200000",
  required: false,
  comments: "Filter by date done less than Unix time in milliseconds.",
  clean: cleanString,
});
const getSubTasks = (required: boolean, comments: string) =>
  input({
    label: "Include Subtasks",
    type: "boolean",
    required,
    default: "false",
    comments,
    clean: util.types.toBool,
  });
const markdownDescription = input({
  label: "Markdown Description",
  type: "string",
  placeholder: "Enter markdown description",
  example: "# Task Description\n\nThis task involves...",
  comments: "Markdown formatted description.",
  required: false,
  clean: cleanString,
});
const page = input({
  label: "Page",
  type: "string",
  placeholder: "Enter page number",
  example: "0",
  comments: "The page number to retrieve (starts at 0).",
  required: true,
  default: "0",
  clean: util.types.toNumber,
});
const dueDate = getDueDateInt(
  false,
  "The task due date as a Unix timestamp in milliseconds.",
  "1508369194377",
);
const dueDateTime = getDueDateTime(
  false,
  "When true, the Due Date includes a time of day rather than only a date.",
  false,
);
const timeEstimate = getTimeEstimate(
  false,
  "The time estimate for the task, in milliseconds.",
  "8640000",
);
const startDate = getStartDateInt(
  false,
  "The task start date as a Unix timestamp in milliseconds.",
  "1567780450202",
);
const startDateTime = getStartDateTime(
  false,
  "When true, the Start Date includes a time of day rather than only a date.",
  false,
);
const notifyAll = getNotifyAll(
  false,
  "When true, sends notifications to everyone, including the creator of the task.",
  true,
);
const checkRequiredCustomFields = getCheckRequiredCustomFields(
  false,
  "When true, enforces required Custom Fields when creating the task. By default, they are ignored.",
  false,
);
const archivedFilter = getArchived(
  false,
  "When true, returns archived tasks.",
  false,
);
const schedule = structuredObjectInput({
  label: "Schedule",
  required: false,
  comments:
    "Start and due dates, whether each includes a time of day, and time estimate.",
  inputs: { startDate, startDateTime, dueDate, dueDateTime, timeEstimate },
});
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Markdown Description, Notify All, and Check Required Custom Fields.",
  inputs: { markdownDescription, notifyAll, checkRequiredCustomFields },
});
const dateRangeFilters = structuredObjectInput({
  label: "Date Range Filters",
  required: false,
  comments:
    "Optional date-range filters. Narrow results by when tasks are due, were created, were last updated, or were done.",
  inputs: {
    dueDateGt,
    dueDateLt,
    dateCreatedGt,
    dateCreatedLt,
    dateUpdatedGt,
    dateUpdatedLt,
    dateDoneGt,
    dateDoneLt,
  },
});
const filters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    orderBy,
    reverse,
    archived: archivedFilter,
    includeClosed,
    customFieldsCode,
  },
});
export const createTaskInputs = {
  connection: connectionInput,
  listId: getlistId(true, "The unique identifier for the List."),
  name: getTaskName(true, "The name of the task."),
  customTaskIds: getCustomTaskIds(
    false,
    "When true, task IDs in this request are treated as custom task IDs. Requires Team ID.",
  ),
  teamId: getTeamId(
    false,
    "Only used when the custom_task_ids parameter is set to true.",
  ),
  description: getDescription(false, "The description of the task."),
  assignees: getAssignees(
    false,
    "User IDs of the people to assign to the task.",
  ),
  tags: getTags(false, "Tag names to apply to the task."),
  status: getStatus(
    false,
    "The name of the status to apply to the task, as configured in the List.",
  ),
  priority: getPriority(
    false,
    "The task priority: 1 (Urgent), 2 (High), 3 (Normal), or 4 (Low).",
  ),
  schedule,
  parent: getParent(
    false,
    "An existing task ID to create this task as a subtask of. The parent task cannot itself be a subtask and must be in the List specified by List ID.",
  ),
  linksTo: getLinksTo(
    false,
    "A task ID to create a linked dependency with the new task.",
  ),
  additionalFields,
  customFields,
};
export const deleteTaskInputs = {
  connection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task."),
  customTaskIds: getCustomTaskIds(false),
  teamId: getTeamId(
    false,
    "Only used when the custom_task_ids parameter is set to true.",
  ),
};
export const getTaskInputs = {
  connection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task."),
  teamId: getTeamId(
    true,
    "Only used when the custom_task_ids parameter is set to true.",
  ),
  customTaskIds: getCustomTaskIds(false),
  subTasks: getSubTasks(
    false,
    "When true, includes subtasks in the results. By default, subtasks are excluded.",
  ),
};
export const listTasksInputs = {
  connection: connectionInput,
  listId: getlistId(
    true,
    "The unique identifier for the List whose tasks are returned.",
  ),
  page,
  subTasks: getSubTasks(
    true,
    "When true, includes subtasks in the results. By default, subtasks are excluded.",
  ),
  filters,
  assignees: getAssignees(false, "User IDs to filter tasks by assignee."),
  tags: getTags(false, "Filter by tags. Add a tag to filter."),
  dateRangeFilters,
};
export const updateTaskInputs = {
  connection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task."),
  customTaskIds: getCustomTaskIds(
    false,
    "When true, task IDs in this request are treated as custom task IDs. Requires Team ID.",
  ),
  teamId: getTeamId(
    false,
    "Only used when the custom_task_ids parameter is set to true.",
  ),
  name: getTaskName(false, "The name of the task."),
  description: getDescription(false, "The description of the task."),
  markdownDescription,
  status: getStatus(
    false,
    "The name of the status to apply to the task, as configured in the List.",
  ),
  priority: getPriority(
    false,
    "The task priority: 1 (Urgent), 2 (High), 3 (Normal), or 4 (Low).",
  ),
  schedule,
  parent: getParent(false, "A task ID to move this subtask under."),
  addAssignees: getAddAssignees(
    false,
    "User IDs to add as assignees on the task.",
  ),
  removeAssignees: getRemoveAssignees(
    false,
    "User IDs to remove as assignees from the task.",
  ),
  archived: getArchived(
    false,
    "When true, archives the task. When false, the task is unarchived.",
    false,
  ),
};
