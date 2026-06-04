import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "./utils";

export const owner = input({
  label: "Owner",
  type: "string",
  required: true,
  placeholder: "Enter repository owner",
  example: "octocat",
  clean: util.types.toString,
  comments:
    "The account owner of the repository. For example, in https://github.com/octocat/Hello-World, the owner is 'octocat'.",
  dataSource: "selectUserFromOrganization",
});

export const repo = input({
  label: "Repository Name",
  type: "string",
  required: true,
  placeholder: "Enter repository name",
  example: "Hello-World",
  clean: util.types.toString,
  comments:
    "The name of the repository. For example, in https://github.com/octocat/Hello-World, the repository name is 'Hello-World'.",
  dataSource: "listReposForAuthenticatedUser",
});

const githubEvents = [
  "commit_comment",
  "create",
  "delete",
  "deploy_key",
  "deployment",
  "deployment_status",
  "discussion",
  "discussion_comment",
  "fork",
  "github_app_authorization",
  "gollum",
  "installation",
  "installation_repositories",
  "issue_comment",
  "issues",
  "label",
  "marketplace_purchase",
  "member",
  "membership",
  "meta",
  "milestone",
  "organization",
  "org_block",
  "package",
  "page_build",
  "ping",
  "project",
  "project_card",
  "project_column",
  "projects_v2_item",
  "public",
  "pull_request",
  "pull_request_review",
  "pull_request_review_comment",
  "pull_request_review_thread",
  "push",
  "release",
  "repository_dispatch",
  "repository",
  "repository_import",
  "repository_vulnerability_alert",
  "security_advisory",
  "sponsorship",
  "star",
  "status",
  "team",
  "team_add",
  "watch",
  "workflow_dispatch",
  "workflow_job",
  "workflow_run",
];

export const events = input({
  label: "Events",
  type: "string",
  required: true,
  collection: "valuelist",
  placeholder: "Select event types",
  model: githubEvents.map((event) => ({ label: event, value: event })),
  comments: "The list of event types that will trigger the webhook.",
});

export const hookIdInput = input({
  label: "Hook ID",
  type: "string",
  required: true,
  placeholder: "Enter hook ID",
  example: "12345678",
  clean: util.types.toNumber,
  comments: "The unique identifier of the webhook.",
});

export const webhookSecretInput = input({
  label: "Webhook Secret",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "An optional secret used to verify webhook authenticity. See [GitHub's documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks) for details.",
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

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
  model: { label: string; value: string }[],
  defaultValue: string
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
  comments: 'A user that"s mentioned in the issue',
});

export const perPage = input({
  label: "Per Page",
  type: "string",
  required: false,
  default: "30",
  clean: util.types.toNumber,
  comments: "The number of results per page (max 100)",
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  default: "1",
  clean: util.types.toNumber,
  comments: "Page number of the results to fetch",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments: "Whether to fetch all results",
});

export const issueNumber = input({
  label: "Issue Number",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The number that identifies the issue",
  dataSource: "selectIssueForAuthenticatedUser",
});

export const organization = input({
  label: "Organization",
  type: "string",
  required: true,
  comments: "The name of the organization",
  example: "octocat",
  placeholder: "Enter organization name",
  clean: util.types.toString,
});





const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, issues created after the last poll are emitted on the `created` branch.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, issues updated since the last poll but created earlier are emitted on the `updated` branch.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection: connectionInput,
  owner,
  repo,
  showNewRecords,
  showUpdatedRecords,
};
