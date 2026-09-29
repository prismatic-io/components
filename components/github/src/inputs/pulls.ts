import { input } from "@prismatic-io/spectral";
import { cleanString, toOptionalBool } from "../utils";
import { connectionInput, owner, pagination, repo } from "./common";
import { issueNumber } from "./issues";
export const head = input({
  label: "Head",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "Filter pulls by head user or head organization and branch name in the format of 'user:ref-name' or 'organization:ref-name'",
});
export const base = input({
  label: "Base",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "Filter pulls by base branch name",
});
const pullRequestTitle = input({
  label: "Title",
  type: "string",
  required: false,
  placeholder: "Enter pull request title",
  example: "Fix bug in authentication flow",
  clean: cleanString,
  comments:
    "The title of the pull request. Required unless using the issue parameter.",
});
const pullRequestHead = input({
  label: "Head",
  type: "string",
  required: true,
  placeholder: "Enter head branch",
  example: "feature-branch",
  clean: cleanString,
  comments:
    "The name of the branch where the changes are implemented. For cross-repository pull requests, use the format 'username:branch'.",
});
const pullRequestBase = input({
  label: "Base",
  type: "string",
  required: true,
  placeholder: "Enter base branch",
  example: "main",
  clean: cleanString,
  comments:
    "The name of the branch the changes are pulled into. This should be an existing branch in the repository.",
});
const pullRequestBody = input({
  label: "Body",
  type: "text",
  required: false,
  placeholder: "Enter pull request description",
  example:
    "This PR fixes the authentication bug by updating the token validation logic.\n\nFixes #123",
  clean: cleanString,
  comments:
    "The contents/description of the pull request. Supports markdown formatting.",
});
const maintainerCanModify = input({
  label: "Maintainer Can Modify",
  type: "boolean",
  required: false,
  clean: toOptionalBool,
  comments:
    "When true, maintainers can modify the pull request. See [GitHub's documentation](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) for details.",
});
const draft = input({
  label: "Draft",
  type: "boolean",
  required: false,
  clean: toOptionalBool,
  comments:
    "When true, creates the pull request as a draft. Draft pull requests cannot be merged until marked as ready for review.",
});
export const pullsCreateInputs = {
  connection: connectionInput,
  owner,
  repo,
  title: pullRequestTitle,
  head: pullRequestHead,
  base: pullRequestBase,
  body: pullRequestBody,
  maintainerCanModify,
  draft,
  issueNumber,
};
const pullRequestStateFilter = input({
  label: "State",
  type: "string",
  required: false,
  default: "open",
  placeholder: "Select state",
  model: [
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
    { label: "All", value: "all" },
  ],
  clean: cleanString,
  comments: "Filters pull requests by their state (open, closed, or all).",
});
const pullRequestHeadFilter = input({
  label: "Head",
  type: "string",
  required: false,
  placeholder: "Enter head reference",
  example: "octocat:new-feature",
  clean: cleanString,
  comments:
    'Filter pull requests by head user or organization and branch name in the format "user:ref-name" or "organization:ref-name".',
});
const pullRequestBaseFilter = input({
  label: "Base",
  type: "string",
  required: false,
  placeholder: "Enter base branch",
  example: "main",
  clean: cleanString,
  comments: "Filter pull requests by base branch name.",
});
const pullRequestSort = input({
  label: "Sort",
  type: "string",
  required: false,
  default: "created",
  placeholder: "Select sort field",
  model: [
    { label: "Created", value: "created" },
    { label: "Updated", value: "updated" },
    { label: "Popularity", value: "popularity" },
    { label: "Long Running", value: "long-running" },
  ],
  clean: cleanString,
  comments: "The field to sort results by.",
});
const pullRequestDirection = input({
  label: "Direction",
  type: "string",
  required: false,
  placeholder: "Select direction",
  model: [
    { label: "Asc", value: "asc" },
    { label: "Desc", value: "desc" },
  ],
  clean: cleanString,
  comments: "The direction to sort results (ascending or descending).",
});
export const pullsListInputs = {
  connection: connectionInput,
  owner,
  repo,
  state: pullRequestStateFilter,
  head: pullRequestHeadFilter,
  base: pullRequestBaseFilter,
  sort: pullRequestSort,
  direction: pullRequestDirection,
  pagination,
};
