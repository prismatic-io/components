import { input, util } from "@prismatic-io/spectral";
import { cleanCommaSeparatedString, cleanNumber, cleanNumberArray, cleanStringArray } from "./helpers";

export const getTeamId = (required: boolean, comments?: string) =>
  input({
    label: "Team ID",
    type: "string",
    placeholder: "Enter Team ID",
    example: "9010065123",
    comments: comments ? comments : "Team ID (Workspace) value.",
    required,
    clean: util.types.toString,
    dataSource: "teams",
  });

export const getWebhookId = (required: boolean, comments: string) =>
  input({
    label: "Webhook ID",
    type: "string",
    placeholder: "Enter Webhook ID",
    example: "e506-4a29-9d42-26e504e3435e",
    comments,
    required,
    clean: util.types.toString,
  });

export const tagsCode = input({
  label: "Tags",
  type: "code",
  language: "json",
  comments:
    "JSON object containing an array of tag objects with name, background color (tag_bg), and foreground color (tag_fg) properties.",
  example: JSON.stringify(
    {
      tags: [
        {
          name: "name of tag",
          tag_bg: "#BF55EC",
          tag_fg: "#FFFFFF",
        },
      ],
    },
    null,
    2
  ),
  required: true,
  clean: util.types.toString,
});

export const customFieldsCode = input({
  label: "Custom Fields",
  type: "code",
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
    2
  ),
  required: false,
  clean: util.types.toString,
});

export const getPermissionLevel = (required: boolean, comments: string, defaultValue?: string) =>
  input({
    label: "Permission Level",
    type: "string",
    placeholder: "Enter permission level",
    example: "read",
    comments,
    required,
    ...(defaultValue && { default: `${defaultValue}` }),
    clean: util.types.toString,
  });

export const getGuestId = (required: boolean, comments: string) =>
  input({
    label: "Guest ID",
    type: "string",
    placeholder: "Enter Guest ID",
    comments,
    required,
    clean: util.types.toString,
  });

export const getEndpoint = (required: boolean, comments: string) =>
  input({
    label: "Endpoint",
    type: "string",
    placeholder: "Enter endpoint URL",
    comments,
    required,
    clean: util.types.toString,
  });

export const groupIds = input({
  label: "Group IDs",
  type: "string",
  placeholder: "Enter Group IDs",
  example: "C9C58BE9-7C73-4002-A6A9-310014852858",
  comments: "Enter one or more Team IDs (user groups) to retrieve information about specific Teams.",
  required: false,
  clean: util.types.toString,
});

export const getSpaceId = (required: boolean, comments?: string) =>
  input({
    label: "Space ID",
    type: "string",
    placeholder: "Enter Space ID",
    comments: comments ? comments : "Space ID value.",
    required,
    clean: util.types.toString,
    dataSource: "spaces",
  });

export const getStartId = (required: boolean, comments: string) =>
  input({
    label: "Start ID",
    type: "string",
    placeholder: "Enter Start ID",
    comments,
    required,
    clean: util.types.toString,
  });

export const folderName = input({
  label: "Name",
  type: "string",
  placeholder: "Enter folder name",
  example: "My Folder",
  comments: "The name of the folder.",
  required: true,
  clean: util.types.toString,
});

export const getCommentText = (required: boolean, comments: string) =>
  input({
    label: "Comment Text",
    type: "string",
    placeholder: "Enter comment text",
    comments,
    required,
    clean: util.types.toString,
  });

export const startDate = input({
  label: "Start Date",
  type: "string",
  placeholder: "Enter start date",
  example: "1609459200000",
  comments: "Unix time in milliseconds.",
  required: false,
  clean: util.types.toString,
});

export const getStartDateInt = (required: boolean, comments: string, example?: string) =>
  input({
    label: "Start Date",
    type: "string",
    placeholder: "Enter start date",
    ...(example?.length && { example }),
    required,
    comments,
    clean: cleanNumber,
  });

export const assigneeId = input({
  label: "Assignee",
  type: "string",
  placeholder: "Enter assignee ID",
  example: "12345678",
  comments: "Assignee by ID.",
  required: true,
  clean: cleanNumber,
});

export const getCommentId = (required: boolean, comments: string) =>
  input({
    label: "Comment ID",
    type: "string",
    placeholder: "Enter Comment ID",
    comments,
    required,
    clean: cleanNumber,
  });

export const endDate = input({
  label: "End Date",
  type: "string",
  placeholder: "Enter end date",
  example: "1609459200000",
  comments: "Unix time in milliseconds.",
  required: false,
  clean: util.types.toString,
});

export const getAssignee = (required: boolean, comments: string) =>
  input({
    label: "Assignee",
    type: "string",
    placeholder: "Enter assignee ID",
    comments,
    required,
    clean: util.types.toString,
  });

export const assigneeInt = input({
  label: "Assignee",
  type: "string",
  placeholder: "Enter assignee ID",
  example: "12345678",
  comments: "Include a user_id to assign this List.",
  required: false,
  clean: cleanNumber,
});

export const includeTaskTags = input({
  label: "Include Task Tags",
  type: "boolean",
  comments: "When true, includes task tags in the response for time entries associated with tasks.",
  required: false,
  default: "true",
  clean: util.types.toBool,
});

export const includeLocationNames = input({
  label: "Include Location Names",
  type: "boolean",
  comments:
    "When true, includes the names of the List, Folder, and Space along with the list_id, folder_id, and space_id.",
  required: false,
  default: "true",
  clean: util.types.toBool,
});

export const getFolderId = (required: boolean, comments?: string) =>
  input({
    label: "Folder ID",
    type: "string",
    placeholder: "Enter Folder ID",
    comments: comments ? comments : "Only include time entries associated with tasks in a specific Folder.",
    required,
    clean: util.types.toString,
    dataSource: "folders",
  });

export const getlistId = (required: boolean, comments?: string) =>
  input({
    label: "List ID",
    type: "string",
    placeholder: "Enter List ID",
    comments: comments ? comments : "Only include time entries associated with tasks in a specific List.",
    required,
    clean: util.types.toString,
    dataSource: "lists",
  });

export const getTaskId = (required: boolean, comments?: string) => {
  return input({
    label: "Task ID",
    type: "string",
    placeholder: "Enter Task ID",
    comments: comments ? comments : "Only include time entries associated with a specific task.",
    required,
    clean: util.types.toString,
    dataSource: "tasks",
  });
};

export const getCalendarId = (required: boolean, comments?: string) =>
  input({
    label: "Calendar ID",
    type: "string",
    placeholder: "Enter Calendar ID",
    comments: comments ? comments : "Calendar View ID value.",
    required,
    clean: util.types.toString,
    dataSource: "calendars",
  });

export const getCanEditTags = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Can Edit Tags",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });

export const getStartDateTime = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Start Date Time",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });

export const getIncludeShared = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Include Shared",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });

export const getCanSeeTimeSpent = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Can See Time Spent",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });

export const getCanSeeTimeEstimated = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Can See Time Estimated",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });

export const getCanCreateViews = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Can Create Views",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });

export const getCustomTaskIds = (required: boolean, comments?: string, defaultValue?: boolean) =>
  input({
    label: "Custom Task ID",
    type: "boolean",
    comments: comments ? comments : "When true, allows referencing a task by its custom task ID.",
    required,
    default: defaultValue !== undefined ? `${defaultValue}` : "false",
    clean: util.types.toBool,
  });

export const getArchived = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Archived",
    type: "boolean",
    comments,
    required,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
    clean: util.types.toBool,
  });

export const getCustomTeamId = (required: boolean) =>
  input({
    label: "Custom Team ID",
    type: "string",
    placeholder: "Enter Custom Team ID",
    comments: "Only used when the custom_task_ids parameter is set to true.",
    required,
    clean: util.types.toString,
  });

export const groupId = input({
  label: "Group ID",
  type: "string",
  placeholder: "Enter Group ID",
  example: "7C73-4002-A6A9-310014852858",
  comments: "Team ID (user group).",
  required: true,
  clean: util.types.toString,
});

export const teamName = input({
  label: "Team Name",
  type: "string",
  placeholder: "Enter team name",
  example: "Engineering Team",
  comments: "Desired Team Name.",
  required: false,
  clean: util.types.toString,
});

export const teamHandle = input({
  label: "Team Handle",
  type: "string",
  placeholder: "Enter team handle",
  example: "engineering",
  comments: "You may update the team handle which is used to @mention a Team (user group) in your Workspace.",
  required: false,
  clean: util.types.toString,
});

export const addMember = input({
  label: "Add Member",
  type: "string",
  placeholder: "Enter member IDs",
  example: "12345,5678",
  comments: "Add members by ID. Comma separate each user ID.",
  required: false,
  clean: cleanCommaSeparatedString,
});

export const removeMember = input({
  label: "Remove Member",
  type: "string",
  placeholder: "Enter member IDs",
  example: "12345,5678",
  comments: "Remove members by ID. Comma separate each user ID.",
  required: false,
  clean: cleanCommaSeparatedString,
});

export const userId = input({
  label: "User ID",
  type: "string",
  placeholder: "Enter User ID",
  example: "38312345",
  comments: "User ID value.",
  required: true,
  clean: util.types.toString,
});

export const name = input({
  label: "Name",
  type: "string",
  placeholder: "Enter name",
  example: "Engineering Team",
  comments: "Desired Team Name.",
  required: true,
  clean: util.types.toString,
});

export const getListName = (required: boolean, comments: string) =>
  input({
    label: "Name",
    type: "string",
    placeholder: "Enter name",
    comments,
    required,
    clean: util.types.toString,
  });

export const getContent = (required: boolean, comments: string) =>
  input({
    label: "Content",
    type: "string",
    placeholder: "Enter content",
    comments,
    required,
    clean: util.types.toString,
  });

export const spaceName = input({
  label: "Space Name",
  type: "string",
  placeholder: "Enter space name",
  example: "Engineering Space",
  comments: "Space Name.",
  required: true,
  clean: (input) => util.types.toString(input),
});

export const color = input({
  label: "Color",
  type: "string",
  placeholder: "Enter hex color code",
  example: "#7B68EE",
  comments: "Hex color code.",
  required: true,
  clean: (input) => util.types.toString(input),
});

export const privateInput = input({
  label: "Private",
  type: "boolean",
  comments: "When true, the Space is private.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const adminCanManage = input({
  label: "Admin Can Manage",
  type: "boolean",
  comments: "When true, admins can manage the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const multipleAssignees = input({
  label: "Multiple Assignees",
  type: "boolean",
  comments: "When true, the Space allows multiple assignees on tasks.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const enableDueDates = input({
  label: "Enable Due Dates",
  type: "boolean",
  comments: "When true, enables due dates for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const useStartDate = input({
  label: "Use Start Date",
  type: "boolean",
  comments: "When true, enables start dates for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const remapDueDates = input({
  label: "Remap Due Dates",
  type: "boolean",
  comments: "When true, remaps due dates when tasks are moved.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const remapClosedDueDates = input({
  label: "Remap closed Due Dates",
  type: "boolean",
  comments: "When true, remaps due dates for closed tasks when moved.",
  required: true,
  default: "false",
  clean: util.types.toBool,
});

export const enableTimeTracking = input({
  label: "Enable Time Tracking",
  type: "boolean",
  comments: "When true, enables time tracking for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const enableTags = input({
  label: "Enable Tags",
  type: "boolean",
  comments: "When true, enables tags for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const enableTimeEstimates = input({
  label: "Enable Time Estimates",
  type: "boolean",
  comments: "When true, enables time estimates for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const enableChecklists = input({
  label: "Enable Checklists",
  type: "boolean",
  comments: "When true, enables checklists for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const enableCustomFields = input({
  label: "Enable Custom Fields",
  type: "boolean",
  comments: "When true, enables custom fields for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const enableRemapDependencies = input({
  label: "Enable Remap Dependencies",
  type: "boolean",
  comments: "When true, enables remapping of task dependencies when moved.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const enableDependencyWarning = input({
  label: "Enable Dependency Warning",
  type: "boolean",
  comments: "When true, enables warnings for task dependency conflicts.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const enablePortfolios = input({
  label: "Enable Portfolios",
  type: "boolean",
  comments: "When true, enables portfolios for the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const members = input({
  label: "Member",
  type: "string",
  collection: "valuelist",
  comments: "Add user by ID.",
  example: '["12345678", "87654321"]',
  required: true,
  clean: cleanNumberArray,
});

export const getTags = (required: boolean, comments: string) =>
  input({
    label: "Tag",
    type: "string",
    collection: "valuelist",
    comments,
    required,
    clean: cleanStringArray,
  });

export const events = input({
  label: "Event",
  type: "string",
  collection: "valuelist",
  comments: "Event type to trigger the webhook.",
  example: '["taskCreated", "taskUpdated"]',
  required: true,
  clean: cleanStringArray,
});

export const getEmail = (required: boolean, comments: string) =>
  input({
    label: "Email",
    type: "string",
    placeholder: "Enter email address",
    example: "john.doe@example.com",
    comments,
    required,
    clean: util.types.toString,
  });

export const getUsername = (required: boolean, comments: string) =>
  input({
    label: "Username",
    type: "string",
    placeholder: "Enter username",
    comments,
    required,
    clean: util.types.toString,
  });

export const admin = input({
  label: "Admin",
  type: "boolean",
  comments: "When true, grants admin privileges to the user.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});

export const allEvents = input({
  label: "All Events",
  type: "boolean",
  comments: "When true, subscribes to all events and overrides the event inputs.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const customRoleId = input({
  label: "Custom Role ID",
  type: "string",
  placeholder: "Enter Custom Role ID",
  example: "12345",
  comments: "Custom Role ID value.",
  required: true,
  clean: (value) => util.types.toNumber(value),
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The ClickUp connection to use.",
});

export const getDescription = (required: boolean, comments?: string) =>
  input({
    label: "Description",
    type: "string",
    placeholder: "Enter description",
    comments: comments ? comments : "Description text.",
    required,
    clean: util.types.toString,
  });
export const getStatus = (required: boolean, comments: string) =>
  input({
    label: "Status",
    type: "string",
    placeholder: "Enter status",
    comments,
    required,
    clean: util.types.toString,
  });
export const getTaskName = (required: boolean, comments: string) =>
  input({
    label: "Name",
    type: "string",
    placeholder: "Enter name",
    comments,
    required,
    clean: util.types.toString,
  });
export const getParent = (required: boolean, comments: string) =>
  input({
    label: "Parent",
    type: "string",
    placeholder: "Enter parent task ID",
    comments,
    required,
    clean: util.types.toString,
  });

export const getLinksTo = (required: boolean, comments: string) =>
  input({
    label: "Links To",
    type: "string",
    placeholder: "Enter task ID",
    comments,
    required,
    clean: util.types.toString,
  });

export const getPriority = (required: boolean, comments: string) =>
  input({
    label: "Priority",
    type: "string",
    placeholder: "Enter priority",
    comments,
    required,
    clean: cleanNumber,
  });
export const taskStartDate = input({
  label: "Start Date",
  type: "string",
  placeholder: "Enter start date",
  example: "2024-01-01",
  comments: "Task Start Date.",
  required: true,
  clean: util.types.toDate,
});
export const getDueDate = (required: boolean, comments: string) =>
  input({
    label: "Due Date",
    type: "string",
    placeholder: "Enter due date",
    comments,
    required,
    clean: util.types.toDate,
  });

export const getDueDateInt = (required: boolean, comments: string, example?: string) =>
  input({
    label: "Due Date",
    type: "string",
    placeholder: "Enter due date",
    comments,
    required,
    ...(example?.length && { example }),
    clean: cleanNumber,
  });

export const getTimeEstimate = (required: boolean, comments: string, example?: string) =>
  input({
    label: "Time Estimate",
    type: "string",
    placeholder: "Enter time estimate",
    comments,
    required,
    ...(example?.length && { example }),
    clean: cleanNumber,
  });

export const getDueDateTime = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Due Date Time",
    type: "boolean",
    comments,
    required,
    default: `${defaultValue}`,
    clean: util.types.toBool,
  });

export const getCheckRequiredCustomFields = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Check Required Custom Fields",
    type: "boolean",
    comments,
    required,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
    clean: util.types.toBool,
  });

export const getUnsetStatus = (required: boolean, comments: string, defaultValue?: boolean) =>
  input({
    label: "Unset Status",
    type: "boolean",
    comments,
    required,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
    clean: util.types.toBool,
  });
export const assignees = input({
  label: "Assignees",
  comments: "Task Assignees.",
  placeholder: "Assignee data from previous step",
  type: "data",
  required: false,
});

export const getAssignees = (required: boolean, comments: string) =>
  input({
    label: "Assignee",
    type: "string",
    collection: "valuelist",
    comments,
    required,
    clean: cleanNumberArray,
  });
export const getAddAssignees = (required: boolean, comments: string) =>
  input({
    label: "Add Assignee",
    type: "string",
    collection: "valuelist",
    comments,
    required,
    clean: cleanNumberArray,
  });

export const getRemoveAssignees = (required: boolean, comments: string) =>
  input({
    label: "Remove Assignee",
    type: "string",
    collection: "valuelist",
    comments,
    required,
    clean: cleanNumberArray,
  });
export const customFields = input({
  label: "Custom Fields",
  type: "string",
  collection: "keyvaluelist",
  comments: "Custom field key-value pairs to set on the task.",
  example: '{"field_id": "value"}',
  required: false,
});

export const getTagNamesArray = (required: boolean, comments: string) =>
  input({
    label: "Tag name",
    type: "string",
    collection: "valuelist",
    required,
    comments,
  });

export const orderBy = input({
  label: "Order By",
  type: "string",
  placeholder: "Enter order by field",
  required: false,
  comments: "Order by a particular field. By default, tasks are ordered by created.",
  example: "created",
  clean: util.types.toString,
});

export const reverse = input({
  label: "Reverse",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, tasks are displayed in reverse order.",
  clean: util.types.toBool,
});

export const includeClosed = input({
  label: "Include Closed",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, includes closed tasks in the results. By default, they are excluded.",
  clean: util.types.toBool,
});

export const dueDateGt = input({
  label: "Due Date Greater Than",
  type: "string",
  placeholder: "Enter due date",
  example: "1609459200000",
  required: false,
  comments: "Filter by due date greater than Unix time in milliseconds.",
  clean: util.types.toString,
});
export const dueDateLt = input({
  label: "Due Date Less Than",
  type: "string",
  placeholder: "Enter due date",
  example: "1609459200000",
  required: false,
  comments: "Filter by due date less than Unix time in milliseconds.",
  clean: util.types.toString,
});
export const dateCreatedGt = input({
  label: "Date Created Greater Than",
  type: "string",
  placeholder: "Enter date created",
  example: "1609459200000",
  required: false,
  comments: "Filter by date created greater than Unix time in milliseconds.",
  clean: util.types.toString,
});
export const dateCreatedLt = input({
  label: "Date Created Less Than",
  type: "string",
  placeholder: "Enter date created",
  example: "1609459200000",
  required: false,
  comments: "Filter by date created less than Unix time in milliseconds.",
  clean: util.types.toString,
});
export const dateUpdatedGt = input({
  label: "Date Updated Greater Than",
  type: "string",
  placeholder: "Enter date updated",
  example: "1609459200000",
  required: false,
  comments: "Filter by date updated greater than Unix time in milliseconds.",
  clean: util.types.toString,
});
export const dateUpdatedLt = input({
  label: "Date Updated Less Than",
  type: "string",
  placeholder: "Enter date updated",
  example: "1609459200000",
  required: false,
  comments: "Filter by date updated less than Unix time in milliseconds.",
  clean: util.types.toString,
});
export const dateDoneGt = input({
  label: "Date Done Greater Than",
  type: "string",
  placeholder: "Enter date done",
  example: "1609459200000",
  required: false,
  comments: "Filter by date done greater than Unix time in milliseconds.",
  clean: util.types.toString,
});
export const dateDoneLt = input({
  label: "Date Done Less Than",
  type: "string",
  placeholder: "Enter date done",
  example: "1609459200000",
  required: false,
  comments: "Filter by date done less than Unix time in milliseconds.",
  clean: util.types.toString,
});

export const fieldId = input({
  label: "Field ID",
  type: "string",
  placeholder: "Enter Field ID",
  required: true,
  comments: "Enter the universal unique identifier (UUID) of the Custom Field you want to set.",
  clean: util.types.toString,
  dataSource: "customFields",
});
export const fieldValue = input({
  label: "Field Value",
  type: "data",
  placeholder: "Field value from previous step",
  comments: "The value to set for the custom field.",
  required: true,
  clean: (value) => (util.types.isDate(value) ? util.types.toDate(value).getTime() : value),
});
export const valueType = input({
  label: "Value Type",
  type: "string",
  placeholder: "Enter value type",
  comments: "The type of the value being set.",
  required: false,
  clean: util.types.toString,
});

export const page = input({
  label: "Page",
  type: "string",
  placeholder: "Enter page number",
  example: "0",
  comments: "The page number for pagination.",
  required: true,
  default: "0",
  clean: cleanNumber,
});
export const getSubTasks = (required: boolean, comments: string) =>
  input({
    label: "Include Subtasks",
    type: "boolean",
    required,
    default: "false",
    comments,
    clean: util.types.toBool,
  });

export const getNotifyAll = (required: boolean, comments: string, defaultValue: boolean) =>
  input({
    label: "Notify All",
    type: "boolean",
    required,
    comments,
    default: `${defaultValue}`,
    clean: util.types.toBool,
  });

export const getResolved = (required: boolean, comments: string, defaultValue: boolean) =>
  input({
    label: "Resolved",
    type: "boolean",
    required,
    comments,
    default: `${defaultValue}`,
    clean: util.types.toBool,
  });

export const customFieldId = input({
  label: "Custom Field ID",
  type: "string",
  placeholder: "Enter Custom Field ID",
  comments: "The ID of the custom field.",
  required: true,
  clean: util.types.toString,
  dataSource: "customFields",
});
export const value = input({
  label: "Custom Field Value",
  type: "string",
  placeholder: "Enter custom field value",
  comments: "The value to set for the custom field.",
  required: true,
  clean: util.types.toString,
});

export const timerId = input({
  label: "Timer ID",
  type: "string",
  placeholder: "Enter Timer ID",
  example: "12345678",
  comments: "The ID of a time entry.",
  required: true,
  clean: util.types.toString,
});

export const getStart = (required: boolean, comments: string) =>
  input({
    label: "Start",
    type: "string",
    placeholder: "Enter start time",
    comments,
    required,
    clean: cleanNumber,
  });

export const getEnd = (required: boolean, comments: string) =>
  input({
    label: "End",
    type: "string",
    placeholder: "Enter end time",
    comments,
    required,
    clean: cleanNumber,
  });

export const getBillable = (required: boolean, comments: string, defaultValue: boolean) =>
  input({
    label: "Billable",
    type: "boolean",
    required,
    comments,
    default: `${defaultValue}`,
    clean: util.types.toBool,
  });

export const getDuration = (required: boolean, comments: string) =>
  input({
    label: "Duration",
    type: "string",
    placeholder: "Enter duration",
    comments,
    required,
    clean: cleanNumber,
  });

export const assigneeTimeEntry = input({
  label: "Assignee",
  type: "string",
  placeholder: "Enter assignee ID",
  example: "12345678",
  comments:
    "Workspace owners and admins can include unknown user id. Workspace members can only include their own user id.",
  required: true,
  clean: cleanNumber,
});

export const tagAction = input({
  label: "Tag Action",
  type: "string",
  placeholder: "Enter tag action",
  comments: "Tag Action (use replace, add or remove).",
  example: "replace",
  required: true,
  clean: util.types.toString,
});

export const getFile = (required: boolean) =>
  input({
    label: "File",
    placeholder: "File from previous step",
    comments: "File to attach.",
    type: "data",
    required,
    clean: util.types.toBufferDataPayload,
  });

export const getFileName = (required: boolean) =>
  input({
    label: "File Name",
    placeholder: "Enter file name",
    comments: "Name of the file to attach.",
    type: "string",
    required,
    example: "my-image.png",
    clean: util.types.toString,
  });

export const markdownDescription = input({
  label: "Markdown Description",
  type: "string",
  placeholder: "Enter markdown description",
  example: "# Task Description\n\nThis task involves...",
  comments: "Markdown formatted description.",
  required: false,
  clean: util.types.toString,
});

export const pollScopeType = input({
  label: "Scope",
  type: "string",
  required: true,
  model: [
    { label: "Team (Workspace)", value: "team" },
    { label: "List", value: "list" },
  ],
  clean: util.types.toString,
  comments: "Whether to poll tasks across an entire Team (Workspace) or scoped to a single List.",
});

export const pollScopeId = input({
  label: "Scope ID",
  type: "string",
  required: true,
  example: "9010065123",
  placeholder: "Enter the Team or List ID",
  clean: util.types.toString,
  comments: "The Team ID or List ID to monitor for changes, depending on the Scope selected above.",
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments: "When enabled, tasks created since the last poll are returned in the trigger payload.",
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments: "When enabled, tasks updated since the last poll are returned in the trigger payload.",
});
