import { input, util } from "@prismatic-io/spectral";
import { colorInputOptions } from "../util";







export const validateId = (value: unknown) => {
  const strValue = util.types.toString(value).trim();
  if (/[0-9]*/.test(strValue)) {
    return strValue;
  } else {
    throw new Error(
      `Asana global IDs are numbers. "${strValue}" is not a valid Asana global ID.`,
    );
  }
};





const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Asana connection to use.",
});

export const workspaceId = input({
  label: "Workspace ID",
  type: "string",
  example: "375893453",
  placeholder: "Enter workspace ID",
  comments:
    "The unique identifier for the workspace. Required when the account has multiple workspaces.",
  required: true,
  dataSource: "selectWorkspace",
  clean: validateId,
});

export const userId = input({
  label: "User ID",
  type: "string",
  example: "375893453",
  placeholder: "Enter user ID",
  comments: "The unique identifier for the user.",
  required: true,
  dataSource: "selectUser",
  clean: validateId,
});

export const projectColor = input({
  label: "Project Color",
  type: "string",
  model: colorInputOptions,
  default: "light-green",
  comments: "The display color associated with the project in the Asana UI.",
  required: false,
  clean: cleanString,
});

export const archived = input({
  label: "Archived",
  type: "boolean",
  comments:
    "When true, the project is archived and hidden from the UI by default. Archived projects may be treated differently for queries.",
  required: false,
  clean: util.types.toBool,
});

export const statusId = input({
  label: "Status ID",
  type: "string",
  example: "375893453",
  placeholder: "Enter status update ID",
  comments: "The unique identifier for the status update.",
  required: true,
  clean: validateId,
});

export const statusParentIdInput = input({
  label: "Project, Portfolio, or Goal ID",
  comments:
    "The unique identifier for the parent project, portfolio, or goal the status update belongs to.",
  type: "string",
  example: "375893453",
  placeholder: "Enter project, portfolio, or goal ID",
  required: true,
  clean: validateId,
});

export const defaultView = input({
  label: "Default View",
  type: "string",
  comments: "The default view to display when opening the project in Asana.",
  model: [
    { label: "List", value: "list" },
    { label: "Board", value: "board" },
    { label: "Calendar", value: "calendar" },
    { label: "Timeline", value: "timeline" },
  ],
  default: "list",
  required: true,
  clean: util.types.toString,
});

export const dueOn = input({
  label: "Due On",
  type: "string",
  comments:
    "The date the project or task is due. Format: YYYY-MM-DD. Should not be used together with Due At.",
  example: "2019-09-15",
  placeholder: "Enter due date (YYYY-MM-DD)",
  required: false,
  clean: (value) => (value ? util.types.toDate(value) : undefined),
});

export const followers = input({
  label: "Followers",
  type: "string",
  comments:
    "A comma-separated list of user gids to add as followers of the resource.",
  example: "8570756435,375893453",
  placeholder: "Enter comma-separated user IDs",
  required: false,
  clean: cleanString,
});

export const name = input({
  label: "Name",
  type: "string",
  comments:
    "The display name of the resource. A short sentence fragment that fits on a single line in the UI for maximum readability.",
  example: "Example - Populate customers page with live data",
  placeholder: "Enter name",
  required: false,
  clean: cleanString,
});

export const notes = input({
  label: "Notes",
  type: "text",
  comments:
    "Free-form plain-text description associated with the resource. For rich formatting use HTML Notes instead.",
  example: "These are some example notes.",
  placeholder: "Enter notes",
  required: false,
  clean: cleanString,
});

export const isPublic = input({
  label: "Public",
  type: "boolean",
  comments:
    "When true, the resource is visible to every member of the team it belongs to.",
  required: true,
  clean: util.types.toBool,
});

export const owner = input({
  label: "Owner ID",
  type: "string",
  comments:
    "The unique identifier of the user who will own the project. The owner has full administrative rights over the project.",
  example: "375893453",
  placeholder: "Enter owner user ID",
  required: true,
  clean: validateId,
});

export const team = input({
  label: "Team ID",
  type: "string",
  comments:
    "The team that this project is shared with. Only exists for projects in organizations — including this field for non-organization projects causes the request to fail.",
  example: "375893453",
  placeholder: "Enter team ID",
  required: false,
  clean: validateId,
});

export const startOn = input({
  label: "Start On",
  type: "string",
  comments:
    "The date work for this project begins, or null if no start date is set. Format: YYYY-MM-DD.",
  example: "2021-11-14",
  placeholder: "Enter start date (YYYY-MM-DD)",
  required: false,
  clean: (value) => (value ? util.types.toDate(value) : undefined),
});

export const startAt = input({
  label: "Start At",
  type: "string",
  comments:
    "The date and time work begins for the task, or null if the task has no start time. Format: ISO 8601 in UTC. Should not be used together with Start On. Due At must be present when setting or unsetting this parameter.",
  example: "2019-09-14T02:06:58.147Z",
  placeholder: "Enter start timestamp (ISO 8601)",
  required: false,
  clean: util.types.toString,
});

export const htmlNotes = input({
  label: "HTML Notes",
  type: "code",
  language: "html",
  comments:
    "The rich-text notes for the resource as HTML. See [Rich text in the Asana API](https://developers.asana.com/docs/rich-text) for supported markup.",
  example: "<body>Mittens is a <em>really</em> good cat.</body>",
  required: false,
  clean: util.types.toString,
});

export const author = input({
  label: "Author",
  type: "string",
  comments:
    "The display name of the author. A user gid or email address may also be provided to reference an existing Asana user.",
  example: "John Doe",
  placeholder: "Enter author name, user ID, or email",
  required: false,
  clean: cleanString,
});

export const createdBy = input({
  label: "Created By",
  type: "string",
  comments:
    "The Asana account that created the object. A user gid or email address may also be provided to reference an existing Asana user.",
  example: "John Doe",
  placeholder: "Enter creator name, user ID, or email",
  required: false,
  clean: cleanString,
});

export const statusUpdateColor = input({
  label: "Status Update Color",
  type: "string",
  comments: "The display color associated with the status update.",
  model: colorInputOptions,
  default: "light-green",
  required: true,
  clean: util.types.toString,
});

export const projectId = input({
  label: "Project ID",
  type: "string",
  comments: "The unique identifier for the project.",
  example: "375893453",
  placeholder: "Enter project ID",
  required: true,
  dataSource: "selectProject",
  clean: validateId,
});

export const taskId = input({
  label: "Task ID",
  type: "string",
  example: "375893453",
  placeholder: "Enter task ID",
  comments: "The unique identifier for the task.",
  required: true,
  dataSource: "selectTask",
  clean: validateId,
});

export const teamDescription = input({
  label: "Description",
  type: "string",
  example: "This is an example description",
  placeholder: "Enter team description",
  comments:
    "Free-form description of the team's purpose, shown on the team page in Asana.",
  required: false,
  clean: util.types.toString,
});

export const teamName = input({
  label: "Name",
  type: "string",
  example: "Engineering Team",
  placeholder: "Enter team name",
  comments: "The display name for the team.",
  required: true,
  clean: util.types.toString,
});

export const organizationId = input({
  label: "Organization or Workspace ID",
  type: "string",
  example: "375893453",
  placeholder: "Enter organization or workspace ID",
  comments: "The unique identifier for the organization or workspace.",
  required: true,
  clean: validateId,
});

export const teamId = input({
  label: "Team ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter team ID",
  comments: "The unique identifier for the team.",
  required: true,
  dataSource: "selectTeam",
  clean: validateId,
});

export const approvalStatus = input({
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

export const assigneeId = input({
  label: "Assignee ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter assignee user ID",
  comments: "The unique identifier of the user assigned to the task.",
  required: false,
  clean: (value) => validateId(value) || undefined,
});

export const assigneeSectionId = input({
  label: "Assignee Section ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter assignee section ID",
  comments:
    "The unique identifier for the section to assign the task to. The assignee section is a subdivision of a project that groups tasks together in the assignee's 'My Tasks' list.",
  required: false,
  clean: (value) => validateId(value) || undefined,
});

export const assigneeStatus = input({
  label: "Assignee Status",
  type: "string",
  example: "upcoming",
  placeholder: "Enter assignee status",
  comments:
    "The status the task has in relation to its assignee. This field is deprecated — it can still be used in requests but is not recommended for new records.",
  required: false,
  clean: cleanString,
});

export const isCompleted = input({
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

export const completedBy = input({
  label: "Completed By",
  type: "string",
  example: "John Doe",
  placeholder: "Enter completer name, user ID, or email",
  comments:
    "The name of the user who completed the task. A user gid or email address may also be provided to reference an existing Asana user.",
  required: false,
  clean: (value) => util.types.toString(value).trim() || undefined,
});

export const dueAt = input({
  label: "Due At",
  type: "string",
  example: "2019-09-15T02:06:58.147Z",
  placeholder: "Enter due timestamp (ISO 8601)",
  comments:
    "The date and time the task is due. Format: ISO 8601 in UTC. Should not be used together with Due On.",
  required: false,
  clean: (value) => (value ? util.types.toDate(value) : undefined),
});

export const projectList = input({
  label: "Project List",
  type: "string",
  example: "843750385",
  collection: "valuelist",
  placeholder: "Enter project ID",
  comments:
    "A list of project gids the task should belong to. Provide one project ID per entry.",
  required: false,
});

export const parentId = input({
  label: "Parent ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter parent ID",
  comments: "The unique identifier of the parent element.",
  required: false,
  clean: (value) => validateId(value) || undefined,
});

export const isLiked = input({
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

export const followersList = input({
  label: "Followers List",
  type: "string",
  example: "843750385",
  collection: "valuelist",
  placeholder: "Enter user ID",
  comments:
    "A list of user gids to add as followers. Provide one user ID per entry.",
  required: false,
});

export const resourceSubtype = input({
  label: "Resource Subtype",
  type: "string",
  example: "task",
  placeholder: "Enter resource subtype",
  comments:
    "The subtype of the resource (e.g., 'default_task', 'milestone'). See [Asana resource subtypes](https://developers.asana.com/docs/object-hierarchy) for valid values.",
  required: false,
  clean: cleanString,
});

export const limit = input({
  label: "Limit",
  type: "string",
  example: "20",
  placeholder: "Enter page size (1-100)",
  comments:
    "The maximum number of items to return per page (between 1 and 100).",
  required: false,
  clean: (value) => util.types.toInt(value) || undefined,
});

export const offset = input({
  label: "Offset",
  type: "string",
  example: "eyJ0eXAiOJiKV1iQLCJhbGciOiJIUzI1NiJ9",
  placeholder: "Enter pagination offset token",
  comments:
    "The pagination offset token returned from a previous query that had a next_page property.",
  required: false,
  clean: cleanString,
});

export const portfolioId = input({
  label: "Portfolio ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter portfolio ID",
  comments: "The unique identifier for the portfolio.",
  required: true,
  dataSource: "selectPortfolio",
  clean: validateId,
});

export const color = input({
  label: "Color",
  type: "string",
  model: colorInputOptions,
  default: "light-green",
  comments: "The display color associated with the object in the Asana UI.",
  required: true,
  clean: util.types.toString,
});

export const members = input({
  label: "Members",
  type: "string",
  example: "843750385",
  placeholder: "Enter member identifier (gid, email, or 'me')",
  comments:
    "A list of users to add as members. Each value can be the string 'me', an email address, or the gid of a user.",
  required: false,
  collection: "valuelist",
});

export const portfolioName = input({
  label: "Portfolio Name",
  type: "string",
  example: "My Portfolio",
  placeholder: "Enter portfolio name",
  comments: "The display name for the portfolio.",
  required: true,
  clean: util.types.toString,
});

export const itemId = input({
  label: "Item ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter item ID",
  comments: "The unique identifier for the item (a project or portfolio).",
  required: true,
  clean: validateId,
});

export const fieldId = input({
  label: "Field ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter custom field ID",
  comments: "The unique identifier for the custom field.",
  required: true,
  dataSource: "selectCustomField",
  clean: validateId,
});

export const sectionId = input({
  label: "Section ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter section ID",
  comments: "The unique identifier for the section.",
  required: true,
  dataSource: "selectSection",
  clean: validateId,
});

export const tagId = input({
  label: "Tag ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter tag ID",
  comments: "The unique identifier for the tag.",
  required: true,
  dataSource: "selectTag",
  clean: validateId,
});

export const insertAfter = input({
  label: "Insert After",
  type: "string",
  example: "843750385",
  placeholder: "Enter sibling ID",
  comments:
    "The gid of a sibling field or section after which the new item will be inserted.",
  required: false,
  clean: cleanString,
});

export const insertBefore = input({
  label: "Insert Before",
  type: "string",
  example: "843750385",
  placeholder: "Enter sibling ID",
  comments:
    "The gid of a sibling field or section before which the new item will be inserted.",
  required: false,
  clean: cleanString,
});

export const sectionName = input({
  label: "Section Name",
  type: "string",
  example: "Untriaged",
  placeholder: "Enter section name",
  comments: "The display name for the section.",
  required: true,
  clean: util.types.toString,
});

export const attachmentId = input({
  label: "Attachment ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter attachment ID",
  comments: "The unique identifier for the attachment.",
  required: true,
  dataSource: "selectAttachment",
  clean: validateId,
});

export const isImportant = input({
  label: "Is Important",
  type: "boolean",
  default: "true",
  comments:
    "When true, the custom field is highlighted as important and displayed prominently in the Asana UI.",
  required: true,
  clean: util.types.toBool,
});

export const currencyCode = input({
  label: "Currency Code",
  type: "string",
  example: "USD",
  placeholder: "Enter ISO 4217 currency code",
  comments:
    "The ISO 4217 currency code used to format the custom field value (e.g., USD, EUR).",
  required: false,
  clean: cleanString,
});

export const customLabel = input({
  label: "Custom Label",
  type: "string",
  example: "USD",
  placeholder: "Enter custom label",
  comments:
    "A short string (max 4 characters) displayed alongside the number value as a unit label.",
  required: false,
  clean: cleanString,
});

export const customLabelPosition = input({
  label: "Custom Label Position",
  type: "string",
  example: "suffix",
  placeholder: "Enter label position (prefix or suffix)",
  comments:
    "Where the custom label appears relative to the value. Valid values: 'prefix' or 'suffix'.",
  required: false,
  clean: cleanString,
});

export const description = input({
  label: "Description",
  type: "string",
  example: "This is an example description.",
  placeholder: "Enter description",
  comments: "Free-form description of the resource.",
  required: false,
  clean: cleanString,
});

export const enabled = input({
  label: "Enabled",
  type: "boolean",
  comments:
    "When true, the custom field is enabled and available for use on tasks.",
  required: false,
  clean: util.types.toBool,
});

export const enumOptions = input({
  label: "Enum Options",
  type: "code",
  language: "json",
  example: `[
  {
    "color": "blue",
    "enabled": true,
    "name": "Low"
  }
]`,
  placeholder: "Enter enum options as JSON array",
  comments:
    "The list of selectable values for an enum custom field. Provide a JSON array of objects with color, enabled, and name properties.",
  required: false,
  clean: (value) => {
    const str = util.types.toString(value);
    if (!str) return undefined;
    if (!util.types.isJSON(str)) {
      throw new Error("Invalid JSON provided for Enum Options.");
    }
    return JSON.parse(str);
  },
});

export const enableNotifications = input({
  label: "Enable Notifications",
  type: "boolean",
  comments: "When true, members are notified when the custom field is updated.",
  required: false,
  clean: util.types.toBool,
});

export const numberValue = input({
  label: "Number Value",
  type: "string",
  comments: "The numeric value to set on the custom field.",
  required: false,
  example: "5.2",
  placeholder: "Enter numeric value",
  clean: util.types.toNumber,
});

export const precision = input({
  label: "Precision",
  type: "string",
  comments:
    "The number of digits to display after the decimal point for number custom fields.",
  required: false,
  example: "2",
  placeholder: "Enter precision (0-6)",
  clean: (value) => util.types.toInt(value) || undefined,
});

export const textValue = input({
  label: "Text Value",
  type: "string",
  comments: "The text value to set on the custom field.",
  required: false,
  example: "In progress",
  placeholder: "Enter text value",
  clean: cleanString,
});

export const fileData = input({
  label: "File Data",
  type: "data",
  comments: "The binary file data to upload as an attachment on the task.",
  required: true,
  example: "These are my file contents.",
});

export const filter = input({
  label: "Filter",
  type: "code",
  language: "json",
  default: JSON.stringify(
    [
      {
        action: "changed",
        fields: ["due_at", "due_on", "dependencies"],
        resource_subtype: "milestone",
        resource_type: "task",
      },
    ],
    null,
    2,
  ),
  required: false,
  comments:
    "The filter parameters for the webhook expressed as a JSON array. See the [Asana webhooks guide](https://developers.asana.com/docs/webhooks-guide) for available filter options.",
  clean: (filterInput: unknown) => {
    if (filterInput !== "") {
      const value = util.types.toString(filterInput);
      if (!util.types.isJSON(value)) {
        throw new Error("Invalid JSON provided for Filter.");
      }
      return JSON.parse(value);
    }
    return undefined;
  },
});

export const triggerWhenAdded = input({
  label: "Trigger When Added",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a new resource is added.",
  required: true,
  clean: util.types.toBool,
});

export const triggerWhenRemoved = input({
  label: "Trigger When Removed",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a resource is removed.",
  required: true,
  clean: util.types.toBool,
});

export const triggerWhenChanged = input({
  label: "Trigger When Changed",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a resource is changed.",
  required: true,
  clean: util.types.toBool,
});

export const triggerWhenDeleted = input({
  label: "Trigger When Deleted",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a resource is deleted.",
  required: true,
  clean: util.types.toBool,
});

export const triggerWhenUndeleted = input({
  label: "Trigger When Undeleted",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a resource is undeleted.",
  required: true,
  clean: util.types.toBool,
});

export const listAllNestedSubtasks = input({
  label: "List All Nested Subtasks",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, recursively lists subtasks of subtasks rather than only direct subtasks of the parent task.",
  clean: util.types.toBool,
});

export const privacySetting = input({
  label: "Privacy Setting",
  type: "string",
  comments:
    "The privacy setting of the project. Administrators in the organization may restrict these values.",
  required: false,
  model: [
    {
      label: "Public To Workspace",
      value: "public_to_workspace",
    },
    {
      label: "Private To Team",
      value: "private_to_team",
    },
    {
      label: "Private",
      value: "private",
    },
  ],
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, tasks created since the last poll are returned in the trigger payload.",
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, tasks modified since the last poll are returned in the trigger payload.",
});
