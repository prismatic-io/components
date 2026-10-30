import { input, util } from "@prismatic-io/spectral";
import { connectionInput, dynamicValues, fieldValues, issueId } from "./common";

const comment = input({
  label: "Comment",
  type: "string",
  placeholder: "Enter comment text",
  required: true,
  example: "This is an example comment.",
  comments: "The plain-text body of the comment.",
  clean: util.types.toString,
});

const commentId = input({
  label: "Comment ID",
  type: "string",
  placeholder: "Enter comment ID",
  required: true,
  example: "10201",
  comments: "The unique identifier of the comment.",
  clean: util.types.toString,
});

export const addCommentInputs = {
  jiraConnection: connectionInput,
  issueId,
  comment,
  dynamicValues,
  fieldValues,
};

export const deleteCommentInputs = {
  jiraConnection: connectionInput,
  issueId,
  commentId,
};

export const getCommentsInputs = { jiraConnection: connectionInput, issueId };

export const updateCommentInputs = {
  jiraConnection: connectionInput,
  issueId,
  commentId,
  comment,
  dynamicValues,
  fieldValues,
};
