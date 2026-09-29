import { simpleUserSchema } from "./common";
export const issueCommentOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    node_id: { type: "string" },
    url: { type: "string", format: "uri" },
    body: { type: "string" },
    body_text: { type: "string" },
    body_html: { type: "string" },
    html_url: { type: "string", format: "uri" },
    user: simpleUserSchema,
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    issue_url: { type: "string", format: "uri" },
    author_association: { type: "string" },
    performed_via_github_app: { type: ["object", "null"] },
    reactions: { type: "object" as const },
  },
  required: [
    "id",
    "node_id",
    "url",
    "html_url",
    "issue_url",
    "user",
    "created_at",
    "updated_at",
  ],
};
export const issuesCreateCommentOutputSchema = issueCommentOutputSchema;
export const issuesListCommentsOutputSchema = {
  type: "array" as const,
  items: issueCommentOutputSchema,
};
export const issuesListForRepoOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      id: { type: "integer" },
      node_id: { type: "string" },
      number: { type: "integer" },
      state: { type: "string" },
      title: { type: "string" },
      url: { type: "string", format: "uri" },
      repository_url: { type: "string", format: "uri" },
      html_url: { type: "string", format: "uri" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
      closed_at: { type: ["string", "null"], format: "date-time" },
      user: simpleUserSchema,
      labels: { type: "array" as const },
      assignees: {
        type: "array" as const,
        items: simpleUserSchema,
      },
      body: { type: ["string", "null"] },
      pull_request: { type: "object" as const },
    },
    required: [
      "id",
      "node_id",
      "number",
      "state",
      "title",
      "url",
      "html_url",
      "created_at",
      "updated_at",
      "labels",
    ],
  },
};
