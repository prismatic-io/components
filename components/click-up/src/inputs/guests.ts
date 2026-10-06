import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  customRoleId,
  getCustomTaskIds,
  getEmail,
  getFolderId,
  getlistId,
  getTaskId,
  getTeamId,
} from "./common";
const getPermissionLevel = (
  required: boolean,
  comments: string,
  defaultValue?: string,
) =>
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
const getGuestId = (required: boolean, comments: string) =>
  input({
    label: "Guest ID",
    type: "string",
    placeholder: "Enter Guest ID",
    comments,
    required,
    clean: util.types.toString,
  });
const getCanEditTags = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Can Edit Tags",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });
const getIncludeShared = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Include Shared",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });
const getCanSeeTimeSpent = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Can See Time Spent",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });
const getCanSeeTimeEstimated = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Can See Time Estimated",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });
const getCanCreateViews = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Can Create Views",
    type: "boolean",
    comments,
    required,
    clean: util.types.toBool,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
  });
const getUsername = (required: boolean, comments: string) =>
  input({
    label: "Username",
    type: "string",
    placeholder: "Enter username",
    comments,
    required,
    clean: util.types.toString,
  });
export const addGuestToFolderInputs = {
  clickUpConnection: connectionInput,
  folderId: getFolderId(true, "The unique identifier for the Folder."),
  guestId: getGuestId(true, "The unique identifier for the guest."),
  permissionLevel: getPermissionLevel(
    true,
    "Can be read (view only), comment, edit, or create (full).",
    "create",
  ),
  includeShared: getIncludeShared(
    false,
    "When true, includes details of items shared with the guest. Set to false to exclude them.",
    true,
  ),
};
export const addGuestToListInputs = {
  clickUpConnection: connectionInput,
  listId: getlistId(true, "The unique identifier for the List."),
  guestId: getGuestId(true, "The unique identifier for the guest."),
  permissionLevel: getPermissionLevel(
    true,
    "Can be read (view only), comment, edit, or create (full).",
    "create",
  ),
  includeShared: getIncludeShared(
    false,
    "When true, includes details of items shared with the guest. Set to false to exclude them.",
    true,
  ),
};
export const addGuestToTaskInputs = {
  clickUpConnection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task."),
  guestId: getGuestId(true, "The unique identifier for the guest."),
  permissionLevel: getPermissionLevel(
    true,
    "Can be read (view only), comment, edit, or create (full).",
  ),
  includeShared: getIncludeShared(
    false,
    "When true, includes details of items shared with the guest. Set to false to exclude them.",
    true,
  ),
  customTaskIds: getCustomTaskIds(
    false,
    "When true, the Task ID is treated as a custom task ID. Requires Team ID.",
    true,
  ),
  teamId: getTeamId(
    false,
    "Only used when the custom_task_ids parameter is set to true",
  ),
};
export const editGuestOnWorkspaceInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  username: getUsername(
    true,
    "The new username for the guest in the Workspace.",
  ),
  canEditTags: getCanEditTags(
    true,
    "When true, the guest can edit tags.",
    true,
  ),
  canSeeTimeSpent: getCanSeeTimeSpent(
    true,
    "When true, the guest can see time spent on tasks.",
    true,
  ),
  canSeeTimeEstimated: getCanSeeTimeEstimated(
    true,
    "When true, the guest can see time estimates on tasks.",
    true,
  ),
  canCreateViews: getCanCreateViews(
    true,
    "When true, the guest can create views.",
    true,
  ),
  customRoleId,
  guestId: getGuestId(true, "The unique identifier for the guest."),
};
export const getGuestInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  guestId: getGuestId(true, "The unique identifier for the guest."),
};
export const inviteGuestToWorkspaceInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  email: getEmail(true, "Email address of the invited guest"),
  canEditTags: getCanEditTags(
    true,
    "When true, the guest can edit tags.",
    true,
  ),
  canSeeTimeSpent: getCanSeeTimeSpent(
    true,
    "When true, the guest can see time spent on tasks.",
    true,
  ),
  canSeeTimeEstimated: getCanSeeTimeEstimated(
    true,
    "When true, the guest can see time estimates on tasks.",
    true,
  ),
  canCreateViews: getCanCreateViews(
    true,
    "When true, the guest can create views.",
    true,
  ),
  customRoleId,
};
export const removeGuestFromFolderInputs = {
  clickUpConnection: connectionInput,
  folderId: getFolderId(true, "The unique identifier for the Folder."),
  guestId: getGuestId(true, "The unique identifier for the guest."),
  includeShared: getIncludeShared(
    false,
    "When true, includes details of items shared with the guest. Set to false to exclude them.",
    true,
  ),
};
export const removeGuestFromListInputs = {
  clickUpConnection: connectionInput,
  listId: getlistId(true, "The unique identifier for the List."),
  guestId: getGuestId(true, "The unique identifier for the guest."),
  includeShared: getIncludeShared(
    false,
    "When true, includes details of items shared with the guest. Set to false to exclude them.",
    true,
  ),
};
export const removeGuestFromTaskInputs = {
  clickUpConnection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task."),
  guestId: getGuestId(true, "The unique identifier for the guest."),
  includeShared: getIncludeShared(
    false,
    "When true, includes details of items shared with the guest. Set to false to exclude them.",
    true,
  ),
  customTaskIds: getCustomTaskIds(
    false,
    "When true, the Task ID is treated as a custom task ID. Requires Team ID.",
    true,
  ),
  teamId: getTeamId(
    false,
    "Only used when the custom_task_ids parameter is set to true",
  ),
};
export const removeGuestFromWorkspaceInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  guestId: getGuestId(true, "The unique identifier for the guest."),
};
