import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanNumber, cleanStringByRequired } from "../util";
import {
  connectionInput,
  getCustomTaskIds,
  getNotifyAll,
  getTaskId,
  getTeamId,
  startDate,
} from "./common";
const getStartId = <R extends boolean>(required: R, comments: string) =>
  input({
    label: "Start ID",
    type: "string",
    placeholder: "Enter Start ID",
    comments,
    required,
    clean: cleanStringByRequired(required),
  });
const getCommentText = (required: boolean, comments: string) =>
  input({
    label: "Comment Text",
    type: "string",
    placeholder: "Enter comment text",
    comments,
    required,
    clean: util.types.toString,
  });
const assigneeId = input({
  label: "Assignee",
  type: "string",
  placeholder: "Enter assignee ID",
  example: "12345678",
  comments: "The user ID of the person to assign the comment to.",
  required: true,
  clean: cleanNumber,
});
const getCommentId = (required: boolean, comments: string) =>
  input({
    label: "Comment ID",
    type: "string",
    placeholder: "Enter Comment ID",
    comments,
    required,
    clean: cleanNumber,
  });
const getResolved = (
  required: boolean,
  comments: string,
  defaultValue: boolean,
) =>
  input({
    label: "Resolved",
    type: "boolean",
    required,
    comments,
    default: `${defaultValue}`,
    clean: util.types.toBool,
  });
const startId = getStartId(
  false,
  "The ID of the oldest comment from the previous response. Use with Start Date to retrieve the next page of comments.",
);
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments:
    "Start timestamp and start ID cursor controls for paging through results.",
  inputs: { startDate, startId },
});
export const createTaskCommentInputs = {
  connection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task."),
  commentText: getCommentText(true, "The text content of the comment."),
  notifyAll: getNotifyAll(
    true,
    "When true, sends notifications to everyone, including the creator of the comment.",
    true,
  ),
  customTaskIds: getCustomTaskIds(false),
  teamId: getTeamId(
    false,
    "Only used when the custom_task_ids parameter is set to true.",
  ),
  assigneeId: {
    ...assigneeId,
    required: false,
  },
};
export const deleteCommentInputs = {
  connection: connectionInput,
  commentId: getCommentId(true, "The unique identifier for the comment."),
};
export const getTaskCommentsInputs = {
  connection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task."),
  customTaskIds: getCustomTaskIds(false),
  teamId: getTeamId(
    false,
    "Only used when the custom_task_ids parameter is set to true.",
  ),
  pagination,
};
export const updateCommentInputs = {
  connection: connectionInput,
  commentId: getCommentId(true, "The unique identifier for the comment."),
  commentText: getCommentText(true, "The text content of the comment."),
  resolved: getResolved(
    true,
    "When true, marks the comment as resolved.",
    false,
  ),
  assigneeId,
};
