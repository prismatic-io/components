import { input, util } from "@prismatic-io/spectral";
import {
  cleanNumber,
  cleanString,
  cleanStringArray,
  cleanStringByRequired,
  cleanTagAction,
} from "../util";
import {
  connectionInput,
  getAssignee,
  getCustomTaskIds,
  getDescription,
  getFolderId,
  getlistId,
  getSpaceId,
  getTaskId,
  getTeamId,
  startDate,
} from "./common";
const tagsCode = input({
  label: "Tags",
  type: "code",
  placeholder: "Enter tags JSON",
  language: "json",
  comments:
    "JSON object containing an array of tag objects with name, background color (tag_bg), and foreground color (tag_fg) properties.",
  example: JSON.stringify(
    {
      tags: [
        {
          name: "urgent",
          tag_bg: "#BF55EC",
          tag_fg: "#FFFFFF",
        },
      ],
    },
    null,
    2,
  ),
  required: true,
  clean: util.types.toString,
});
const endDate = input({
  label: "End Date",
  type: "string",
  placeholder: "Enter end date",
  example: "1609459200000",
  comments: "Unix time in milliseconds.",
  required: false,
  clean: cleanString,
});
const includeTaskTags = input({
  label: "Include Task Tags",
  type: "boolean",
  comments:
    "When true, includes task tags in the response for time entries associated with tasks.",
  required: false,
  default: "true",
  clean: util.types.toBool,
});
const includeLocationNames = input({
  label: "Include Location Names",
  type: "boolean",
  comments:
    "When true, includes the names of the List, Folder, and Space along with the list_id, folder_id, and space_id.",
  required: false,
  default: "true",
  clean: util.types.toBool,
});
const getCustomTeamId = <R extends boolean>(required: R) =>
  input({
    label: "Custom Team ID",
    type: "string",
    placeholder: "Enter Custom Team ID",
    comments: "Only used when the custom_task_ids parameter is set to true.",
    required,
    clean: cleanStringByRequired(required),
  });
const getTagNamesArray = (required: boolean, comments: string) =>
  input({
    label: "Tag Name",
    type: "string",
    collection: "valuelist",
    placeholder: "Enter tag name",
    required,
    comments,
    clean: cleanStringArray,
  });
const timerId = input({
  label: "Timer ID",
  type: "string",
  placeholder: "Enter Timer ID",
  example: "12345678",
  comments: "The ID of a time entry.",
  required: true,
  clean: util.types.toString,
});
const getStart = (required: boolean, comments: string) =>
  input({
    label: "Start",
    type: "string",
    placeholder: "Enter start time",
    comments,
    required,
    clean: cleanNumber,
  });
const getEnd = (required: boolean, comments: string) =>
  input({
    label: "End",
    type: "string",
    placeholder: "Enter end time",
    comments,
    required,
    clean: cleanNumber,
  });
const getBillable = (
  required: boolean,
  comments: string,
  defaultValue: boolean,
) =>
  input({
    label: "Billable",
    type: "boolean",
    required,
    comments,
    default: `${defaultValue}`,
    clean: util.types.toBool,
  });
const getDuration = (required: boolean, comments: string) =>
  input({
    label: "Duration",
    type: "string",
    placeholder: "Enter duration",
    comments,
    required,
    clean: cleanNumber,
  });
const assigneeTimeEntry = input({
  label: "Assignee",
  type: "string",
  placeholder: "Enter assignee ID",
  example: "12345678",
  comments:
    "The user ID to assign the time entry to. Workspace owners and admins can use any user ID; Workspace members can only use their own.",
  required: true,
  clean: cleanNumber,
});
const tagAction = input({
  label: "Tag Action",
  type: "string",
  placeholder: "Enter tag action",
  comments: "Tag Action (use replace, add or remove).",
  example: "replace",
  required: true,
  clean: cleanTagAction,
});
export const createTimeEntryInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  customTaskIds: getCustomTaskIds(true),
  customTeamId: getCustomTeamId(true),
  description: getDescription(true, "The description of the time entry."),
  start: getStart(
    true,
    "The start time of the time entry as a Unix timestamp in milliseconds.",
  ),
  billable: getBillable(
    true,
    "When true, marks the time entry as billable.",
    false,
  ),
  duration: getDuration(
    true,
    "The duration of the time entry, in milliseconds.",
  ),
  assigneeTimeEntry,
  taskId: getTaskId(true, "Associate a time entry with a task by ID"),
  tagsCode,
};
export const deleteTimeEntryInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  timerId,
};
export const getSingularTimeEntryInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  timerId,
  includeTaskTags,
  includeLocationNames,
};
export const getTimeEntriesWithinDateRangeInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  spaceId: getSpaceId(
    false,
    "Only include time entries associated with tasks in a specific Space.",
  ),
  folderId: getFolderId(false),
  listId: getlistId(false),
  startDate,
  endDate,
  assignee: getAssignee(false, "Filter by User ID"),
  includeTaskTags,
  includeLocationNames,
  taskId: getTaskId(false),
  customTaskIds: getCustomTaskIds(false),
  customTeamId: getCustomTeamId(false),
};
export const startTimeEntryInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  description: getDescription(true, "The description of the time entry."),
  billable: getBillable(
    true,
    "When true, marks the time entry as billable.",
    false,
  ),
  taskId: getTaskId(true, "Associate a time entry with a task by ID"),
  tagNamesArray: getTagNamesArray(true, "Add a tag name"),
  customTaskIds: getCustomTaskIds(false),
  customTeamId: getCustomTeamId(false),
};
export const stopTimeEntryInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
};
export const updateTimeEntryInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  customTaskIds: getCustomTaskIds(true),
  customTeamId: getCustomTeamId(true),
  description: getDescription(true, "The description of the time entry."),
  start: getStart(
    true,
    "The start time of the time entry as a Unix timestamp in milliseconds.",
  ),
  billable: getBillable(
    true,
    "When true, marks the time entry as billable.",
    false,
  ),
  duration: getDuration(
    true,
    "The duration of the time entry, in milliseconds.",
  ),
  assigneeTimeEntry,
  taskId: getTaskId(true, "Associate a time entry with a task by ID"),
  timerId,
  tagAction,
  end: getEnd(
    true,
    "The end time of the time entry as a Unix timestamp in milliseconds.",
  ),
  tagsCode,
};
