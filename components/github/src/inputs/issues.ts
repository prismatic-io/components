import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../utils";
import { connectionInput, fetchAll, owner, pagination, repo } from "./common";
export const state = (object: string) =>
  input({
    label: "State",
    type: "string",
    required: false,
    default: "open",
    model: [
      { label: "Open", value: "open" },
      { label: "Closed", value: "closed" },
      { label: "All", value: "all" },
    ],
    clean: cleanString,
    comments: `Indicates the state of the ${object} to return`,
  });
export const assignee = input({
  label: "Assignee",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The user that is assigned to the issue, use 'none' for issues with no assignee, or '*' for issues assigned to any user",
});
export const labels = input({
  label: "Labels",
  type: "string",
  required: false,
  clean: cleanString,
  comments: `A list of comma separated label names`,
});
export const sort = (
  model: {
    label: string;
    value: string;
  }[],
  defaultValue: string,
) =>
  input({
    label: "Sort",
    type: "string",
    required: false,
    default: defaultValue,
    model: model,
    clean: cleanString,
    comments: `What to sort results by`,
  });
export const direction = input({
  label: "Direction",
  type: "string",
  required: false,
  default: "asc",
  model: [
    { label: "Asc", value: "asc" },
    { label: "Desc", value: "desc" },
  ],
  clean: cleanString,
  comments: "The direction to sort the results by",
});
export const since = input({
  label: "Since",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "Only show notifications updated after the given time",
});
export const milestone = input({
  label: "Milestone",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    'If an "integer" is passed, it should refer to a milestone by its "number" field',
});
export const creator = input({
  label: "Creator",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The user that created the issue",
});
export const mentioned = input({
  label: "Mentioned",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "A user that is mentioned in the issue.",
});
export const issueNumber = input({
  label: "Issue Number",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The number that identifies the issue",
  dataSource: "selectIssueForAuthenticatedUser",
});
const commentBody = input({
  label: "Body",
  type: "string",
  required: true,
  clean: cleanString,
  comments: "The contents of the comment",
});
export const issuesCreateCommentInputs = {
  connection: connectionInput,
  owner,
  repo,
  issueNumber: { ...issueNumber, dataSource: undefined },
  body: commentBody,
};
export const issuesListCommentsInputs = {
  connection: connectionInput,
  owner,
  repo,
  issueNumber,
  since,
  pagination,
};
export const issuesListForRepoInputs = {
  connection: connectionInput,
  owner,
  repo,
  fetchAll,
  milestone,
  state: state("issues"),
  assignee,
  creator,
  mentioned,
  labels,
  sort: sort(
    [
      { label: "Created", value: "created" },
      { label: "Updated", value: "updated" },
      { label: "Comments", value: "comments" },
    ],
    "created",
  ),
  direction,
  since,
  pagination,
};
