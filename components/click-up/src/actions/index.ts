import { createTaskAttachment } from "./attachments/createTaskAttachment";
import { createTaskComment } from "./comments/createTaskComment";
import { deleteComment } from "./comments/deleteComment";
import { getTaskComments } from "./comments/getTaskComments";
import { updateComment } from "./comments/updateComment";
import { getAccessibleCustomFields } from "./custom-fields/getAccessibleCustomFields";
import { removeCustomFieldValue } from "./custom-fields/removeCustomFieldValue";
import { setCustomFieldValue } from "./custom-fields/setCustomFieldValue";
import { createFolder } from "./folders/createFolder";
import { deleteFolder } from "./folders/deleteFolder";
import { getFolder } from "./folders/getFolder";
import { listFolders } from "./folders/listFolders";
import { updateFolder } from "./folders/updateFolder";
import { addGuestToFolder } from "./guests/addGuestToFolder";
import { addGuestToList } from "./guests/addGuestToList";
import { addGuestToTask } from "./guests/addGuestToTask";
import { editGuestOnWorkspace } from "./guests/editGuestOnWorkspace";
import { getGuest } from "./guests/getGuest";
import { inviteGuestToWorkspace } from "./guests/inviteGuestToWorkspace";
import { removeGuestFromFolder } from "./guests/removeGuestFromFolder";
import { removeGuestFromList } from "./guests/removeGuestFromList";
import { removeGuestFromTask } from "./guests/removeGuestFromTask";
import { removeGuestFromWorkspace } from "./guests/removeGuestFromWorkspace";
import { addTaskToList } from "./lists/addTaskToList";
import { createList } from "./lists/createList";
import { deleteList } from "./lists/deleteList";
import { getList } from "./lists/getList";
import { getLists } from "./lists/getLists";
import { removeTaskFromList } from "./lists/removeTaskFromList";
import { updateList } from "./lists/updateList";
import { getListMembers } from "./members/getListMembers";
import { getTaskMembers } from "./members/getTaskMembers";
import { rawRequest } from "./misc/rawRequest";
import { createSpace } from "./spaces/createSpace";
import { deleteSpace } from "./spaces/deleteSpace";
import { getSpace } from "./spaces/getSpace";
import { listSpaces } from "./spaces/listSpaces";
import { updateSpace } from "./spaces/updateSpace";
import { createTask } from "./tasks/createTask";
import { deleteTask } from "./tasks/deleteTask";
import { getTask } from "./tasks/getTask";
import { listTasks } from "./tasks/listTasks";
import { updateTask } from "./tasks/updateTask";
import { createTeam } from "./teams-user-groups/createTeam";
import { deleteTeam } from "./teams-user-groups/deleteTeam";
import { getTeam } from "./teams-user-groups/getTeam";
import { updateTeam } from "./teams-user-groups/updateTeam";
import { getAuthorizedTeams } from "./teams-workspaces/getAuthorizedTeams";
import { getWorkspacePlan } from "./teams-workspaces/getWorkspacePlan";
import { getWorkspaceSeats } from "./teams-workspaces/getWorkspaceSeats";
import { createTimeEntry } from "./time-tracking/createTimeEntry";
import { deleteTimeEntry } from "./time-tracking/deleteTimeEntry";
import { getSingularTimeEntry } from "./time-tracking/getSingularTimeEntry";
import { getTimeEntriesWithinDateRange } from "./time-tracking/getTimeEntriesWithinDateRange";
import { startTimeEntry } from "./time-tracking/startTimeEntry";
import { stopTimeEntry } from "./time-tracking/stopTimeEntry";
import { updateTimeEntry } from "./time-tracking/updateTimeEntry";
import { editUserOnWorkspace } from "./users/editUserOnWorkspace";
import { getUser } from "./users/getUser";
import { inviteUserToWorkspace } from "./users/inviteUserToWorkspace";
import { removeUserFromWorkspace } from "./users/removeUserFromWorkspace";
import { createWebhook } from "./webhooks/createWebhook";
import { deleteWebhook } from "./webhooks/deleteWebhook";
import { getWebhooks } from "./webhooks/getWebhooks";
import { updateWebhook } from "./webhooks/updateWebhook";

export default {
  getUser,
  inviteUserToWorkspace,
  editUserOnWorkspace,
  removeUserFromWorkspace,
  getAuthorizedTeams,
  getWorkspaceSeats,
  getWorkspacePlan,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  getSpace,
  listSpaces,
  createSpace,
  updateSpace,
  deleteSpace,
  getTimeEntriesWithinDateRange,
  listFolders,
  getAccessibleCustomFields,
  getLists,
  createTask,
  updateTask,
  setCustomFieldValue,
  listTasks,
  getSingularTimeEntry,
  createTimeEntry,
  updateTimeEntry,
  startTimeEntry,
  stopTimeEntry,
  deleteTimeEntry,
  getTask,
  deleteTask,
  createTaskAttachment,
  getTaskComments,
  createTaskComment,
  updateComment,
  deleteComment,
  removeCustomFieldValue,
  getFolder,
  createFolder,
  updateFolder,
  deleteFolder,
  inviteGuestToWorkspace,
  getGuest,
  editGuestOnWorkspace,
  removeGuestFromWorkspace,
  addGuestToTask,
  removeGuestFromTask,
  addGuestToList,
  removeGuestFromList,
  addGuestToFolder,
  removeGuestFromFolder,
  getList,
  createList,
  updateList,
  deleteList,
  addTaskToList,
  removeTaskFromList,
  getTaskMembers,
  getListMembers,
  getWebhooks,
  createWebhook,
  updateWebhook,
  deleteWebhook,
  rawRequest,
};
