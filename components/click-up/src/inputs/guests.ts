import {
  connectionInput,
  customRoleId,
  getCanCreateViews,
  getCanEditTags,
  getCanSeeTimeEstimated,
  getCanSeeTimeSpent,
  getCustomTaskIds,
  getEmail,
  getFolderId,
  getGuestId,
  getIncludeShared,
  getlistId,
  getPermissionLevel,
  getTaskId,
  getTeamId,
  getUsername,
} from "./common";

const includeSharedCommon = getIncludeShared(
  false,
  "When true, includes details of items shared with the guest. Set to false to exclude them.",
  true
);
const customTaskIdsCommon = getCustomTaskIds(
  false,
  "When true, allows referencing the task by its Custom Task ID instead of the regular task ID.",
  true
);
const teamIdCommon = getTeamId(false, "The Workspace (Team) ID. Only used when Custom Task ID is set to true.");


const folderIdForAddFolder = getFolderId(true);
const guestIdForAddFolder = getGuestId(true);
const permissionLevelForAddFolder = getPermissionLevel(
  true,
  "The permission level to grant. Accepted values: read (view only), comment, edit, or create (full).",
  "create"
);


const listIdForAddList = getlistId(true);
const guestIdForAddList = getGuestId(true);
const permissionLevelForAddList = getPermissionLevel(
  true,
  "The permission level to grant. Accepted values: read (view only), comment, edit, or create (full).",
  "create"
);


const taskIdForAddTask = getTaskId(true);
const guestIdForAddTask = getGuestId(true);
const permissionLevelForAddTask = getPermissionLevel(
  true,
  "The permission level to grant. Accepted values: read (view only), comment, edit, or create (full)."
);


const teamIdForEdit = getTeamId(true);
const usernameForEdit = getUsername(true, "The updated username for the guest.");
const canEditTagsForEdit = getCanEditTags(
  true,
  "When true, the guest can create and edit tags on items they have access to.",
  true
);
const canSeeTimeSpentForEdit = getCanSeeTimeSpent(
  true,
  "When true, the guest can see the time tracked on tasks they have access to.",
  true
);
const canSeeTimeEstimatedForEdit = getCanSeeTimeEstimated(
  true,
  "When true, the guest can see time estimates on tasks they have access to.",
  true
);
const canCreateViewsForEdit = getCanCreateViews(
  true,
  "When true, the guest can create new views in shared spaces.",
  true
);
const guestIdForEdit = getGuestId(true);


const teamIdForGet = getTeamId(true);
const guestIdForGet = getGuestId(true);


const teamIdForInvite = getTeamId(true);
const emailForInvite = getEmail(true, "The email address of the guest to invite.");
const canEditTagsForInvite = getCanEditTags(
  true,
  "When true, the guest can create and edit tags on items they have access to.",
  true
);
const canSeeTimeSpentForInvite = getCanSeeTimeSpent(
  true,
  "When true, the guest can see the time tracked on tasks they have access to.",
  true
);
const canSeeTimeEstimatedForInvite = getCanSeeTimeEstimated(
  true,
  "When true, the guest can see time estimates on tasks they have access to.",
  true
);
const canCreateViewsForInvite = getCanCreateViews(
  true,
  "When true, the guest can create new views in shared spaces.",
  true
);


const folderIdForRemoveFolder = getFolderId(true);
const guestIdForRemoveFolder = getGuestId(true);


const listIdForRemoveList = getlistId(true);
const guestIdForRemoveList = getGuestId(true);


const taskIdForRemoveTask = getTaskId(true);
const guestIdForRemoveTask = getGuestId(true);


const teamIdForRemoveWorkspace = getTeamId(true);
const guestIdForRemoveWorkspace = getGuestId(true);

export const addGuestToFolderInputs = {
  clickUpConnection: connectionInput,
  folderId: folderIdForAddFolder,
  guestId: guestIdForAddFolder,
  includeShared: includeSharedCommon,
  permissionLevel: permissionLevelForAddFolder,
};

export const addGuestToListInputs = {
  clickUpConnection: connectionInput,
  listId: listIdForAddList,
  guestId: guestIdForAddList,
  includeShared: includeSharedCommon,
  permissionLevel: permissionLevelForAddList,
};

export const addGuestToTaskInputs = {
  clickUpConnection: connectionInput,
  taskId: taskIdForAddTask,
  guestId: guestIdForAddTask,
  includeShared: includeSharedCommon,
  customTaskIds: customTaskIdsCommon,
  teamId: teamIdCommon,
  permissionLevel: permissionLevelForAddTask,
};

export const editGuestOnWorkspaceInputs = {
  clickUpConnection: connectionInput,
  teamId: teamIdForEdit,
  username: usernameForEdit,
  canEditTags: canEditTagsForEdit,
  canSeeTimeSpent: canSeeTimeSpentForEdit,
  canSeeTimeEstimated: canSeeTimeEstimatedForEdit,
  canCreateViews: canCreateViewsForEdit,
  customRoleId,
  guestId: guestIdForEdit,
};

export const getGuestInputs = {
  clickUpConnection: connectionInput,
  teamId: teamIdForGet,
  guestId: guestIdForGet,
};

export const inviteGuestToWorkspaceInputs = {
  clickUpConnection: connectionInput,
  teamId: teamIdForInvite,
  email: emailForInvite,
  canEditTags: canEditTagsForInvite,
  canSeeTimeSpent: canSeeTimeSpentForInvite,
  canSeeTimeEstimated: canSeeTimeEstimatedForInvite,
  canCreateViews: canCreateViewsForInvite,
  customRoleId,
};

export const removeGuestFromFolderInputs = {
  clickUpConnection: connectionInput,
  folderId: folderIdForRemoveFolder,
  guestId: guestIdForRemoveFolder,
  includeShared: includeSharedCommon,
};

export const removeGuestFromListInputs = {
  clickUpConnection: connectionInput,
  listId: listIdForRemoveList,
  guestId: guestIdForRemoveList,
  includeShared: includeSharedCommon,
};

export const removeGuestFromTaskInputs = {
  clickUpConnection: connectionInput,
  taskId: taskIdForRemoveTask,
  guestId: guestIdForRemoveTask,
  includeShared: includeSharedCommon,
  customTaskIds: customTaskIdsCommon,
  teamId: teamIdCommon,
};

export const removeGuestFromWorkspaceInputs = {
  clickUpConnection: connectionInput,
  teamId: teamIdForRemoveWorkspace,
  guestId: guestIdForRemoveWorkspace,
};
