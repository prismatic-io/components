import type { TriggerPayload } from "@prismatic-io/spectral";
import { BRANCH_DELETED_MESSAGE, ISSUE_DELETED_MESSAGE } from "./constants";
const exampleUser = {
  id: 1001,
  username: "jdoe",
  name: "Jane Doe",
  state: "active",
  locked: false,
  avatar_url:
    "https://gitlab.example.com/uploads/-/system/user/avatar/1001/avatar.png",
  web_url: "https://gitlab.example.com/jdoe",
};
const exampleProject = {
  id: 278964,
  name: "Payments Service",
  name_with_namespace: "Acme / Payments Service",
  path: "payments-service",
  path_with_namespace: "acme/payments-service",
  description: "Handles card and ACH payments.",
  default_branch: "main",
  visibility: "private",
  web_url: "https://gitlab.example.com/acme/payments-service",
  http_url_to_repo: "https://gitlab.example.com/acme/payments-service.git",
  ssh_url_to_repo: "git@gitlab.example.com:acme/payments-service.git",
  archived: false,
  created_at: "2025-03-11T14:02:11.000Z",
  last_activity_at: "2026-09-27T18:44:03.512Z",
  namespace: {
    id: 7412,
    name: "Acme",
    path: "acme",
    kind: "group",
    full_path: "acme",
  },
};
const exampleGroup = {
  id: 7412,
  name: "Acme",
  path: "acme",
  full_name: "Acme",
  full_path: "acme",
  description: "Acme engineering",
  visibility: "private",
  web_url: "https://gitlab.example.com/groups/acme",
  parent_id: null,
  created_at: "2024-11-02T09:15:00.000Z",
};
const exampleMilestone = {
  id: 55120,
  iid: 4,
  project_id: 278964,
  title: "Q4 Release",
  description: "Features shipping in Q4",
  state: "active",
  due_date: "2026-12-15",
  start_date: "2026-10-01",
  web_url: "https://gitlab.example.com/acme/payments-service/-/milestones/4",
};
const exampleLabel = {
  id: 90211,
  name: "bug",
  color: "#d9534f",
  text_color: "#FFFFFF",
  description: "Something is not working",
};
const exampleIssue = {
  id: 1740233,
  iid: 42,
  project_id: 278964,
  title: "Retry failed ACH settlements",
  description:
    "Settlements that fail with a transient error are never retried.",
  state: "opened",
  type: "ISSUE",
  confidential: false,
  created_at: "2026-09-20T15:22:31.118Z",
  updated_at: "2026-09-27T10:05:44.901Z",
  closed_at: null,
  closed_by: null,
  due_date: "2026-10-15",
  labels: ["bug", "backend"],
  milestone: {
    id: 55120,
    iid: 4,
    title: "Q4 Release",
    state: "active",
    due_date: "2026-12-15",
  },
  author: exampleUser,
  assignees: [exampleUser],
  user_notes_count: 3,
  web_url: "https://gitlab.example.com/acme/payments-service/-/issues/42",
  references: {
    short: "#42",
    relative: "#42",
    full: "acme/payments-service#42",
  },
};
const exampleMergeRequest = {
  id: 3310457,
  iid: 17,
  project_id: 278964,
  title: "CU-86b1x2 Retry failed ACH settlements",
  description: "Closes #42",
  state: "opened",
  draft: false,
  created_at: "2026-09-26T12:00:05.221Z",
  updated_at: "2026-09-27T16:31:12.004Z",
  merged_at: null,
  closed_at: null,
  source_branch: "feature/ach-retry",
  target_branch: "main",
  source_project_id: 278964,
  target_project_id: 278964,
  labels: ["backend"],
  author: exampleUser,
  assignees: [exampleUser],
  reviewers: [],
  merge_user: null,
  detailed_merge_status: "mergeable",
  sha: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
  merge_commit_sha: null,
  squash_commit_sha: null,
  web_url:
    "https://gitlab.example.com/acme/payments-service/-/merge_requests/17",
  references: {
    short: "!17",
    relative: "!17",
    full: "acme/payments-service!17",
  },
};
const exampleNote = {
  id: 918273,
  body: "Deployed to staging; settlements now retry up to 3 times.",
  author: exampleUser,
  created_at: "2026-09-27T17:02:40.330Z",
  updated_at: "2026-09-27T17:02:40.330Z",
  system: false,
  noteable_id: 1740233,
  noteable_iid: 42,
  noteable_type: "Issue",
  internal: false,
};
const exampleCommit = {
  id: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
  short_id: "8d2f5c7a",
  title: "CU-86b1x2 Add ACH settlement retry",
  message: "CU-86b1x2 Add ACH settlement retry\n\nRetries transient failures.",
  author_name: "Jane Doe",
  author_email: "jdoe@example.com",
  authored_date: "2026-09-26T11:58:00.000Z",
  committer_name: "Jane Doe",
  committer_email: "jdoe@example.com",
  committed_date: "2026-09-26T11:58:00.000Z",
  created_at: "2026-09-26T11:58:00.000Z",
  parent_ids: ["1a3c5e7f9b2d4f6a8c0e2a4c6e8a0c2e4a6c8e0a"],
  web_url:
    "https://gitlab.example.com/acme/payments-service/-/commit/8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
};
const exampleCommitDetail = {
  ...exampleCommit,
  stats: { additions: 48, deletions: 6, total: 54 },
  status: "success",
};
const exampleBranch = {
  name: "feature/ach-retry",
  merged: false,
  protected: false,
  default: false,
  developers_can_push: false,
  developers_can_merge: false,
  can_push: true,
  web_url:
    "https://gitlab.example.com/acme/payments-service/-/tree/feature/ach-retry",
  commit: exampleCommit,
};
const exampleFile = {
  file_name: "settings.json",
  file_path: "config/settings.json",
  size: 38,
  encoding: "base64",
  content: "eyAicmV0cnlMaW1pdCI6IDMsICJiYWNrb2ZmTXMiOiA1MDAgfQo=",
  content_sha256:
    "4c294617b60715c1d218e61164a3abd4808a4284cbc30e6728a01ad9aada4481",
  ref: "main",
  blob_id: "79f7bbd25901e8334750839545a9bd021f0e4c83",
  commit_id: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
  last_commit_id: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
};
const exampleFileCommit = {
  file_path: "config/settings.json",
  branch: "main",
};
const examplePipeline = {
  id: 61205,
  iid: 312,
  project_id: 278964,
  sha: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
  ref: "main",
  status: "success",
  source: "push",
  created_at: "2026-09-26T12:01:10.000Z",
  updated_at: "2026-09-26T12:09:52.000Z",
  web_url: "https://gitlab.example.com/acme/payments-service/-/pipelines/61205",
};
const examplePipelineDetail = {
  ...examplePipeline,
  started_at: "2026-09-26T12:01:14.000Z",
  finished_at: "2026-09-26T12:09:52.000Z",
  duration: 518,
  user: exampleUser,
};
const exampleMember = {
  ...exampleUser,
  access_level: 40,
  expires_at: null,
  membership_state: "active",
};
const exampleHook = {
  id: 14982,
  url: "https://hooks.example.com/trigger/EXAMPLE",
  project_id: 278964,
  created_at: "2026-09-27T09:00:00.000Z",
  push_events: true,
  push_events_branch_filter: "",
  tag_push_events: false,
  issues_events: true,
  confidential_issues_events: false,
  note_events: true,
  confidential_note_events: false,
  merge_requests_events: true,
  pipeline_events: false,
  job_events: false,
  releases_events: false,
  deployment_events: false,
  milestone_events: false,
  enable_ssl_verification: true,
  alert_status: "executable",
  disabled_until: null,
};
const syntheticTriggerPayload = (
  data: unknown,
  headers: Record<string, string> = {},
): TriggerPayload => ({
  headers,
  queryParameters: {},
  rawBody: { data: null },
  body: { data },
  pathFragment: "",
  webhookUrls: {},
  webhookApiKeys: {},
  invokeUrl: "",
  executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
  customer: {
    id: "testCustomerId",
    name: "Test Customer",
    externalId: "testExternalId",
  },
  instance: { id: "testInstanceId", name: "Test Instance" },
  user: {
    id: "testUserId",
    email: "user@example.com",
    name: "Test User",
    externalId: "testUserExternalId",
  },
  integration: {
    id: "testIntegrationId",
    name: "Test Integration",
    versionSequenceId: "1",
    externalVersion: "",
  },
  flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
  startedAt: "2024-01-15T00:00:00.000Z",
  globalDebug: false,
});
export const listProjectsExamplePayload = { data: [exampleProject] };
export const getProjectExamplePayload = { data: exampleProject };
export const listGroupsExamplePayload = { data: [exampleGroup] };
export const getGroupExamplePayload = {
  data: {
    ...exampleGroup,
    request_access_enabled: false,
    repository_storage: "default",
    enabled_git_access_protocol: "all",
    shared_with_groups: [],
    prevent_sharing_groups_outside_hierarchy: false,
    only_allow_merge_if_pipeline_succeeds: false,
    allow_merge_on_skipped_pipeline: false,
    only_allow_merge_if_all_discussions_are_resolved: false,
  },
};
export const getCurrentUserExamplePayload = {
  data: {
    ...exampleUser,
    public_email: null,
    email: "jdoe@example.com",
    created_at: "2024-11-02T09:20:00.000Z",
    bio: "",
    location: null,
    bot: false,
    last_sign_in_at: "2026-09-27T08:12:44.000Z",
    confirmed_at: "2024-11-02T09:21:10.000Z",
    last_activity_on: "2026-09-27",
    projects_limit: 100000,
    current_sign_in_at: "2026-09-27T08:12:44.000Z",
    identities: [],
    can_create_group: true,
    can_create_project: true,
    two_factor_enabled: true,
    external: false,
    private_profile: false,
    commit_email: "jdoe@example.com",
  },
};
export const listUsersExamplePayload = { data: [exampleUser] };
export const selectProjectExamplePayload = {
  result: [{ label: "acme/payments-service", key: "278964" }],
};
export const selectGroupExamplePayload = {
  result: [{ label: "acme", key: "7412" }],
};
export const listIssuesExamplePayload = { data: [exampleIssue] };
export const getIssueExamplePayload = { data: exampleIssue };
export const createIssueExamplePayload = { data: exampleIssue };
export const updateIssueExamplePayload = {
  data: {
    ...exampleIssue,
    state: "closed",
    closed_at: "2026-09-28T09:00:00.000Z",
    closed_by: exampleUser,
  },
};
export const deleteIssueExamplePayload = {
  data: { success: true, message: ISSUE_DELETED_MESSAGE },
};
export const selectLabelExamplePayload = {
  result: [{ label: "bug", key: "bug" }],
};
export const selectMilestoneExamplePayload = {
  result: [{ label: "Q4 Release", key: "55120" }],
};
export const selectUserExamplePayload = {
  result: [{ label: "Jane Doe (@jdoe)", key: "1001" }],
};
export const listMergeRequestsExamplePayload = { data: [exampleMergeRequest] };
export const getMergeRequestExamplePayload = { data: exampleMergeRequest };
export const createMergeRequestExamplePayload = { data: exampleMergeRequest };
export const updateMergeRequestExamplePayload = {
  data: {
    ...exampleMergeRequest,
    title: "CU-86b1x2 Retry failed ACH settlements (v2)",
  },
};
export const acceptMergeRequestExamplePayload = {
  data: {
    ...exampleMergeRequest,
    state: "merged",
    merged_at: "2026-09-28T10:12:00.000Z",
    merge_user: exampleUser,
    detailed_merge_status: "not_open",
    merge_commit_sha: "2b4d6f8a0c2e4a6c8e0a2c4e6a8c0e2a4c6e8a0c",
  },
};
export const listIssueNotesExamplePayload = { data: [exampleNote] };
export const createIssueNoteExamplePayload = { data: exampleNote };
export const listMergeRequestNotesExamplePayload = {
  data: [
    {
      ...exampleNote,
      noteable_id: 3310457,
      noteable_iid: 17,
      noteable_type: "MergeRequest",
    },
  ],
};
export const createMergeRequestNoteExamplePayload = {
  data: {
    ...exampleNote,
    noteable_id: 3310457,
    noteable_iid: 17,
    noteable_type: "MergeRequest",
  },
};
export const listBranchesExamplePayload = { data: [exampleBranch] };
export const getBranchExamplePayload = { data: exampleBranch };
export const createBranchExamplePayload = {
  data: {
    ...exampleBranch,
    name: "feature/CU-86b1x2-ach-retry",
    web_url:
      "https://gitlab.example.com/acme/payments-service/-/tree/feature/CU-86b1x2-ach-retry",
  },
};
export const deleteBranchExamplePayload = {
  data: { success: true, message: BRANCH_DELETED_MESSAGE },
};
export const listCommitsExamplePayload = { data: [exampleCommit] };
export const getCommitExamplePayload = { data: exampleCommitDetail };
export const selectBranchExamplePayload = {
  result: [{ label: "feature/ach-retry", key: "feature/ach-retry" }],
};
export const getFileExamplePayload = { data: exampleFile };
export const createFileExamplePayload = { data: exampleFileCommit };
export const updateFileExamplePayload = { data: exampleFileCommit };
export const listPipelinesExamplePayload = { data: [examplePipeline] };
export const getPipelineExamplePayload = { data: examplePipelineDetail };
export const listLabelsExamplePayload = { data: [exampleLabel] };
export const listMilestonesExamplePayload = { data: [exampleMilestone] };
export const listProjectMembersExamplePayload = { data: [exampleMember] };
export const listProjectWebhooksExamplePayload = { data: [exampleHook] };
export const deleteInstancedWebhooksExamplePayload = {
  data: { deleted: [{ projectId: "278964", hookId: 14982 }] },
};
const examplePushEvent = {
  object_kind: "push",
  event_name: "push",
  before: "1a3c5e7f9b2d4f6a8c0e2a4c6e8a0c2e4a6c8e0a",
  after: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
  ref: "refs/heads/feature/CU-86b1x2-ach-retry",
  checkout_sha: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
  user_id: 1001,
  user_name: "Jane Doe",
  user_username: "jdoe",
  project_id: 278964,
  project: {
    id: 278964,
    name: "Payments Service",
    path_with_namespace: "acme/payments-service",
    web_url: "https://gitlab.example.com/acme/payments-service",
    default_branch: "main",
  },
  commits: [
    {
      id: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
      message: "CU-86b1x2 Add ACH settlement retry",
      title: "CU-86b1x2 Add ACH settlement retry",
      timestamp: "2026-09-26T11:58:00Z",
      url: "https://gitlab.example.com/acme/payments-service/-/commit/8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
      author: { name: "Jane Doe", email: "jdoe@example.com" },
      added: ["src/settlements/retry.ts"],
      modified: [],
      removed: [],
    },
  ],
  total_commits_count: 1,
};
const exampleWebhookHeaders = {
  "Content-Type": "application/json",
  "X-Gitlab-Event": "Push Hook",
  "X-Gitlab-Event-UUID": "4c4e1bd8-1f7a-4a2e-9d7c-2b6c1f0e9a11",
};
export const webhookExamplePayload = {
  payload: syntheticTriggerPayload(examplePushEvent, exampleWebhookHeaders),
  branch: "Push",
};
export const webhookEventsExamplePayload = {
  payload: syntheticTriggerPayload(examplePushEvent, exampleWebhookHeaders),
  branch: "Push",
};
const exampleUpdatedIssue = {
  ...exampleIssue,
  id: 1739877,
  iid: 38,
  title: "Reconcile duplicate ledger entries",
  created_at: "2026-09-02T08:14:07.512Z",
  updated_at: "2026-09-27T16:41:19.330Z",
  web_url: "https://gitlab.example.com/acme/payments-service/-/issues/38",
  references: {
    short: "#38",
    relative: "#38",
    full: "acme/payments-service#38",
  },
};
export const pollChangesTriggerExamplePayload = {
  payload: syntheticTriggerPayload({
    created: [exampleIssue],
    updated: [exampleUpdatedIssue],
  }),
  polledNoChanges: false,
};
