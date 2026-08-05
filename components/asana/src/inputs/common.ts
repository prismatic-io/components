import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { COLOR_INPUT_OPTIONS } from "../constants";
import { cleanCommaSeparatedList, cleanString, validateId } from "../util";
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
export const optFields = input({
  label: "Optional Properties",
  type: "string",
  required: false,
  example: "name,created_at",
  placeholder: "Enter comma-separated field names",
  comments:
    "A comma-separated list of fields to include in the API response. The default value contains the standard fields for this action. Add or remove fields as needed.",
  clean: cleanCommaSeparatedList,
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
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Limit and offset for paginated results.",
  inputs: { limit, offset },
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
export const color = input({
  label: "Color",
  type: "string",
  model: COLOR_INPUT_OPTIONS,
  default: "light-green",
  comments: "The display color associated with the object in the Asana UI.",
  required: true,
  clean: util.types.toString,
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
export const isImportant = input({
  label: "Is Important",
  type: "boolean",
  default: "true",
  comments:
    "When true, the custom field is highlighted as important and displayed prominently in the Asana UI.",
  required: true,
  clean: util.types.toBool,
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
export const assigneeId = input({
  label: "Assignee ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter assignee user ID",
  comments: "The unique identifier of the user assigned to the task.",
  required: false,
  clean: (value) => validateId(value) || undefined,
});
