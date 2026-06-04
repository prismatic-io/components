import {
  assigneeId,
  connectionInput,
  getCommentId,
  getCommentText,
  getCustomTaskIds,
  getNotifyAll,
  getResolved,
  getStartId,
  getTaskId,
  getTeamId,
  startDate,
} from "./common";

const taskIdForComments = getTaskId(true);
const customTaskIdsForComments = getCustomTaskIds(false);
const teamIdForComments = getTeamId(false, "The Workspace (Team) ID. Only used when Custom Task ID is set to true.");
const commentTextForCreate = getCommentText(true);
const notifyAllForCreate = getNotifyAll(
  true,
  "When true, sends notifications to everyone including the creator of the comment.",
  true
);
const commentIdForDelete = getCommentId(true);
const startIdForGet = getStartId(false, "The Comment ID to start the pagination cursor from when listing comments.");
const commentIdForUpdate = getCommentId(true);
const commentTextForUpdate = getCommentText(true);
const resolvedForUpdate = getResolved(true, "When true, marks the comment as resolved.", false);

export const createTaskCommentInputs = {
  connection: connectionInput,
  taskId: taskIdForComments,
  customTaskIds: customTaskIdsForComments,
  teamId: teamIdForComments,
  commentText: commentTextForCreate,
  notifyAll: notifyAllForCreate,
  assigneeId: {
    ...assigneeId,
    required: false,
  },
};

export const deleteCommentInputs = {
  connection: connectionInput,
  commentId: commentIdForDelete,
};

export const getTaskCommentsInputs = {
  connection: connectionInput,
  taskId: taskIdForComments,
  customTaskIds: customTaskIdsForComments,
  teamId: teamIdForComments,
  startId: startIdForGet,
  startDate,
};

export const updateCommentInputs = {
  connection: connectionInput,
  commentId: commentIdForUpdate,
  commentText: commentTextForUpdate,
  resolved: resolvedForUpdate,
  assigneeId,
};
