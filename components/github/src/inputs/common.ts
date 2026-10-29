import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanString, toOptionalNumber } from "../utils";

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
  "branch_protection_configuration",
  "branch_protection_rule",
  "check_run",
  "check_suite",
  "code_scanning_alert",
  "commit_comment",
  "create",
  "custom_property_values",
  "delete",
  "dependabot_alert",
  "deploy_key",
  "deployment",
  "deployment_status",
  "discussion",
  "discussion_comment",
  "fork",
  "gollum",
  "issue_comment",
  "issue_dependencies",
  "issue_relates_to",
  "issues",
  "label",
  "member",
  "meta",
  "milestone",
  "package",
  "page_build",
  "ping",
  "project",
  "project_card",
  "project_column",
  "public",
  "pull_request",
  "pull_request_review",
  "pull_request_review_comment",
  "pull_request_review_thread",
  "push",
  "registry_package",
  "release",
  "repository",
  "repository_advisory",
  "repository_import",
  "repository_ruleset",
  "repository_vulnerability_alert",
  "secret_scanning_alert",
  "secret_scanning_alert_location",
  "secret_scanning_scan",
  "security_and_analysis",
  "star",
  "status",
  "sub_issues",
  "team_add",
  "watch",
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

export const webhookSecretInput = input({
  label: "Webhook Secret",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "An optional secret used to verify webhook authenticity. See [GitHub's documentation](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries) for details.",
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const perPage = input({
  label: "Per Page",
  type: "string",
  required: false,
  default: "30",
  placeholder: "Enter number of results per page",
  example: "30",
  clean: toOptionalNumber,
  comments: "The number of results per page (max 100)",
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  default: "1",
  placeholder: "Enter page number",
  example: "1",
  clean: toOptionalNumber,
  comments: "Page number of the results to fetch",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments: "When true, automatically fetches all pages of results.",
});

export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page number and results-per-page controls.",
  inputs: { page, perPage },
});
