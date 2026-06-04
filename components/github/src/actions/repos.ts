import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

import {
  issuesListForRepoExamplePayload,
  issuesCreateCommentExamplePayload,
  issuesListCommentsExamplePayload,
  pullsCreateExamplePayload,
  pullsListExamplePayload,
  gitCreateBlobExamplePayload,
  gitCreateRefExamplePayload,
  gitGetRefExamplePayload,
  gitCreateTreeExamplePayload,
  actionsCreateWorkflowDispatchExamplePayload,
} from "../examplePayloads";

import {
  assignee,
  connectionInput,
  creator,
  labels,
  mentioned,
  milestone,
  owner,
  repo,
  sort,
  state,
  direction,
  since,
  perPage,
  page,
  fetchAll,
  issueNumber,
} from "../inputs";
import { paginateResults } from "../utils";
import { Issue } from "../interfaces/Issue";

const reposGet = action({
  display: {
    label: "Repos Get",
    description: "Get a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposUpdate = action({
  display: {
    label: "Repos Update",
    description: "Update a repository",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      name,
      description,
      homepage,
      isPrivate,
      visibility,
      securityAndAnalysis,
      hasIssues,
      hasProjects,
      hasWiki,
      isTemplate,
      defaultBranch,
      allowSquashMerge,
      allowMergeCommit,
      allowRebaseMerge,
      allowAutoMerge,
      deleteBranchOnMerge,
      archived,
      allowForking,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/repos/${owner}/${repo}`, {
      name,
      description,
      homepage,
      private: isPrivate,
      visibility,
      security_and_analysis: securityAndAnalysis,
      has_issues: hasIssues,
      has_projects: hasProjects,
      has_wiki: hasWiki,
      is_template: isTemplate,
      default_branch: defaultBranch,
      allow_squash_merge: allowSquashMerge,
      allow_merge_commit: allowMergeCommit,
      allow_rebase_merge: allowRebaseMerge,
      allow_auto_merge: allowAutoMerge,
      delete_branch_on_merge: deleteBranchOnMerge,
      archived,
      allow_forking: allowForking,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    name: {
      label: "Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the repository",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A short description of the repository",
    },
    homepage: {
      label: "Homepage",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A URL with more information about the repository",
    },
    isPrivate: {
      label: "Private",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to make the repository private or "false" to make it public',
    },
    visibility: {
      label: "Visibility",
      type: "string",
      required: false,
      model: [
        { label: "Public", value: "public" },
        { label: "Private", value: "private" },
        { label: "Internal", value: "internal" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Can be "public" or "private"',
    },
    securityAndAnalysis: {
      label: "Security And Analysis",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Specify which security and analysis features to enable or disable",
    },
    hasIssues: {
      label: "Has Issues",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to enable issues for this repository or "false" to disable them',
    },
    hasProjects: {
      label: "Has Projects",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to enable projects for this repository or "false" to disable them',
    },
    hasWiki: {
      label: "Has Wiki",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to enable the wiki for this repository or "false" to disable it',
    },
    isTemplate: {
      label: "Is Template",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to make this repo available as a template repository or "false" to prevent it',
    },
    defaultBranch: {
      label: "Default Branch",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Updates the default branch for this repository",
    },
    allowSquashMerge: {
      label: "Allow Squash Merge",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to allow squash-merging pull requests, or "false" to prevent squash-merging',
    },
    allowMergeCommit: {
      label: "Allow Merge Commit",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to allow merging pull requests with a merge commit, or "false" to prevent merging pull requests with merge commits',
    },
    allowRebaseMerge: {
      label: "Allow Rebase Merge",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to allow rebase-merging pull requests, or "false" to prevent rebase-merging',
    },
    allowAutoMerge: {
      label: "Allow Auto Merge",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to allow auto-merge on pull requests, or "false" to disallow auto-merge',
    },
    deleteBranchOnMerge: {
      label: "Delete Branch On Merge",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to allow automatically deleting head branches when pull requests are merged, or "false" to prevent automatic deletion',
    },
    archived: {
      label: "Archived",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: '"true" to archive this repository',
    },
    allowForking: {
      label: "Allow Forking",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Either "true" to allow private forks, or "false" to prevent private forks',
    },
  },
});

const reposDelete = action({
  display: {
    label: "Repos Delete",
    description: "Delete a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/repos/${owner}/${repo}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsListArtifactsForRepo = action({
  display: {
    label: "Actions List Artifacts For Repo",
    description: "List artifacts for a repository",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/artifacts`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const actionsGetArtifact = action({
  display: {
    label: "Actions Get Artifact",
    description: "Get an artifact",
  },
  perform: async (context, { connection, owner, repo, artifactId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/artifacts/${artifactId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    artifactId: {
      label: "Artifact Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the artifact",
    },
  },
});

const actionsDeleteArtifact = action({
  display: {
    label: "Actions Delete Artifact",
    description: "Delete an artifact",
  },
  perform: async (context, { connection, owner, repo, artifactId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/actions/artifacts/${artifactId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    artifactId: {
      label: "Artifact Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the artifact",
    },
  },
});

const actionsDownloadArtifact = action({
  display: {
    label: "Actions Download Artifact",
    description: "Download an artifact",
  },
  perform: async (
    context,
    { connection, owner, repo, artifactId, archiveFormat }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/artifacts/${artifactId}/${archiveFormat}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    artifactId: {
      label: "Artifact Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the artifact",
    },
    archiveFormat: {
      label: "Archive Format",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const actionsGetActionsCacheUsage = action({
  display: {
    label: "Actions Get Actions Cache Usage",
    description: "Get GitHub Actions cache usage for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/cache/usage`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsGetJobForWorkflowRun = action({
  display: {
    label: "Actions Get Job For Workflow Run",
    description: "Get a job for a workflow run",
  },
  perform: async (context, { connection, owner, repo, jobId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/jobs/${jobId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    jobId: {
      label: "Job Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the job",
    },
  },
});

const actionsDownloadJobLogsForWorkflowRun = action({
  display: {
    label: "Actions Download Job Logs For Workflow Run",
    description: "Download job logs for a workflow run",
  },
  perform: async (context, { connection, owner, repo, jobId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/jobs/${jobId}/logs`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    jobId: {
      label: "Job Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the job",
    },
  },
});

const actionsReRunJobForWorkflowRun = action({
  display: {
    label: "Actions Re Run Job For Workflow Run",
    description: "Re-run a job from a workflow run",
  },
  perform: async (
    context,
    { connection, owner, repo, jobId, enableDebugLogging }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/jobs/${jobId}/rerun`,
      { enable_debug_logging: enableDebugLogging }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    jobId: {
      label: "Job Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the job",
    },
    enableDebugLogging: {
      label: "Enable Debug Logging",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to enable debug logging for the re-run",
    },
  },
});

const actionsGetGithubActionsPermissionsRepository = action({
  display: {
    label: "Actions Get Github Actions Permissions Repository",
    description: "Get GitHub Actions permissions for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/permissions`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsSetGithubActionsPermissionsRepository = action({
  display: {
    label: "Actions Set Github Actions Permissions Repository",
    description: "Set GitHub Actions permissions for a repository",
  },
  perform: async (
    context,
    { connection, owner, repo, enabled, allowedActions }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/actions/permissions`,
      {
        enabled,
        allowed_actions: allowedActions,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    enabled: {
      label: "Enabled",
      type: "boolean",
      required: true,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether GitHub Actions is enabled on the repository",
    },
    allowedActions: {
      label: "Allowed Actions",
      type: "string",
      required: false,
      model: [
        { label: "All", value: "all" },
        { label: "Local Only", value: "local_only" },
        { label: "Selected", value: "selected" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The permissions policy that controls the actions and reusable workflows that are allowed to run",
    },
  },
});

const actionsGetWorkflowAccessToRepository = action({
  display: {
    label: "Actions Get Workflow Access To Repository",
    description:
      "Get the level of access for workflows outside of the repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/permissions/access`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsSetWorkflowAccessToRepository = action({
  display: {
    label: "Actions Set Workflow Access To Repository",
    description:
      "Set the level of access for workflows outside of the repository",
  },
  perform: async (context, { connection, owner, repo, accessLevel }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/actions/permissions/access`,
      {
        access_level: accessLevel,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    accessLevel: {
      label: "Access Level",
      type: "string",
      required: true,
      model: [
        { label: "None", value: "none" },
        { label: "Organization", value: "organization" },
        { label: "Enterprise", value: "enterprise" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Defines the level of access that workflows outside of the repository have to actions and reusable workflows within the",
    },
  },
});

const actionsGetAllowedActionsRepository = action({
  display: {
    label: "Actions Get Allowed Actions Repository",
    description: "Get allowed actions and reusable workflows for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/permissions/selected-actions`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsSetAllowedActionsRepository = action({
  display: {
    label: "Actions Set Allowed Actions Repository",
    description: "Set allowed actions and reusable workflows for a repository",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      githubOwnedAllowed,
      verifiedAllowed,
      patternsAllowed,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/actions/permissions/selected-actions`,
      {
        github_owned_allowed: githubOwnedAllowed,
        verified_allowed: verifiedAllowed,
        patterns_allowed: patternsAllowed,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    githubOwnedAllowed: {
      label: "Github Owned Allowed",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether GitHub-owned actions are allowed",
    },
    verifiedAllowed: {
      label: "Verified Allowed",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether actions from GitHub Marketplace verified creators are allowed",
    },
    patternsAllowed: {
      label: "Patterns Allowed",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s)",
    },
  },
});

const actionsGetGithubActionsDefaultWorkflowPermissionsRepository = action({
  display: {
    label: "Actions Get Github Actions Default Workflow Permissions Repository",
    description: "Get default workflow permissions for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/permissions/workflow`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsSetGithubActionsDefaultWorkflowPermissionsRepository = action({
  display: {
    label: "Actions Set Github Actions Default Workflow Permissions Repository",
    description: "Set default workflow permissions for a repository",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      defaultWorkflowPermissions,
      canApprovePullRequestReviews,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/actions/permissions/workflow`,
      {
        default_workflow_permissions: defaultWorkflowPermissions,
        can_approve_pull_request_reviews: canApprovePullRequestReviews,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    defaultWorkflowPermissions: {
      label: "Default Workflow Permissions",
      type: "string",
      required: false,
      model: [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The default workflow permissions granted to the GITHUB_TOKEN when running workflows",
    },
    canApprovePullRequestReviews: {
      label: "Can Approve Pull Request Reviews",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether GitHub Actions can approve pull requests",
    },
  },
});

const actionsListSelfHostedRunnersForRepo = action({
  display: {
    label: "Actions List Self Hosted Runners For Repo",
    description: "List self-hosted runners for a repository",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runners`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const actionsListRunnerApplicationsForRepo = action({
  display: {
    label: "Actions List Runner Applications For Repo",
    description: "List runner applications for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runners/downloads`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsCreateRegistrationTokenForRepo = action({
  display: {
    label: "Actions Create Registration Token For Repo",
    description: "Create a registration token for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/runners/registration-token`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsCreateRemoveTokenForRepo = action({
  display: {
    label: "Actions Create Remove Token For Repo",
    description: "Create a remove token for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/runners/remove-token`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsGetSelfHostedRunnerForRepo = action({
  display: {
    label: "Actions Get Self Hosted Runner For Repo",
    description: "Get a self-hosted runner for a repository",
  },
  perform: async (context, { connection, owner, repo, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runners/${runnerId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsDeleteSelfHostedRunnerFromRepo = action({
  display: {
    label: "Actions Delete Self Hosted Runner From Repo",
    description: "Delete a self-hosted runner from a repository",
  },
  perform: async (context, { connection, owner, repo, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/actions/runners/${runnerId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsListLabelsForSelfHostedRunnerForRepo = action({
  display: {
    label: "Actions List Labels For Self Hosted Runner For Repo",
    description: "List labels for a self-hosted runner for a repository",
  },
  perform: async (context, { connection, owner, repo, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runners/${runnerId}/labels`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsAddCustomLabelsToSelfHostedRunnerForRepo = action({
  display: {
    label: "Actions Add Custom Labels To Self Hosted Runner For Repo",
    description: "Add custom labels to a self-hosted runner for a repository",
  },
  perform: async (context, { connection, owner, repo, runnerId, labels }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/runners/${runnerId}/labels`,
      { labels }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
    labels: {
      label: "Labels",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The names of the custom labels to add to the runner",
    },
  },
});

const actionsSetCustomLabelsForSelfHostedRunnerForRepo = action({
  display: {
    label: "Actions Set Custom Labels For Self Hosted Runner For Repo",
    description: "Set custom labels for a self-hosted runner for a repository",
  },
  perform: async (context, { connection, owner, repo, runnerId, labels }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/actions/runners/${runnerId}/labels`,
      { labels }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
    labels: {
      label: "Labels",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The names of the custom labels to set for the runner",
    },
  },
});

const actionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo = action({
  display: {
    label: "Actions Remove All Custom Labels From Self Hosted Runner For Repo",
    description:
      "Remove all custom labels from a self-hosted runner for a repository",
  },
  perform: async (context, { connection, owner, repo, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/actions/runners/${runnerId}/labels`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsRemoveCustomLabelFromSelfHostedRunnerForRepo = action({
  display: {
    label: "Actions Remove Custom Label From Self Hosted Runner For Repo",
    description:
      "Remove a custom label from a self-hosted runner for a repository",
  },
  perform: async (context, { connection, owner, repo, runnerId, name }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/actions/runners/${runnerId}/labels/${name}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The name of a self-hosted runner"s custom label',
    },
  },
});

const actionsListWorkflowRunsForRepo = action({
  display: {
    label: "Actions List Workflow Runs For Repo",
    description: "List workflow runs for a repository",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      actor,
      branch,
      event,
      status,
      perPage,
      page,
      created,
      excludePullRequests,
      checkSuiteId,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/actions/runs`, {
      params: {
        actor,
        branch,
        event,
        status,
        per_page: perPage,
        page,
        created,
        exclude_pull_requests: excludePullRequests,
        check_suite_id: checkSuiteId,
      },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    actor: {
      label: "Actor",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Returns someone"s workflow runs',
    },
    branch: {
      label: "Branch",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns workflow runs associated with a branch",
    },
    event: {
      label: "Event",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns workflow run triggered by the event you specify",
    },
    status: {
      label: "Status",
      type: "string",
      required: false,
      model: [
        { label: "Completed", value: "completed" },
        { label: "Action Required", value: "action_required" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Failure", value: "failure" },
        { label: "Neutral", value: "neutral" },
        { label: "Skipped", value: "skipped" },
        { label: "Stale", value: "stale" },
        { label: "Success", value: "success" },
        { label: "Timed Out", value: "timed_out" },
        { label: "In Progress", value: "in_progress" },
        { label: "Queued", value: "queued" },
        { label: "Requested", value: "requested" },
        { label: "Waiting", value: "waiting" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Returns workflow runs with the check run "status" or "conclusion" that you specify',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
    created: {
      label: "Created",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Returns workflow runs created within the given date-time range",
    },
    excludePullRequests: {
      label: "Exclude Pull Requests",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If "true" pull requests are omitted from the response (empty array)',
    },
    checkSuiteId: {
      label: "Check Suite Id",
      type: "string",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        'Returns workflow runs with the "check_suite_id" that you specify',
    },
  },
});

const actionsGetWorkflowRun = action({
  display: {
    label: "Actions Get Workflow Run",
    description: "Get a workflow run",
  },
  perform: async (
    context,
    { connection, owner, repo, runId, excludePullRequests }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}`,
      {
        params: { exclude_pull_requests: excludePullRequests },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
    excludePullRequests: {
      label: "Exclude Pull Requests",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If "true" pull requests are omitted from the response (empty array)',
    },
  },
});

const actionsDeleteWorkflowRun = action({
  display: {
    label: "Actions Delete Workflow Run",
    description: "Delete a workflow run",
  },
  perform: async (context, { connection, owner, repo, runId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/actions/runs/${runId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
  },
});

const actionsGetReviewsForRun = action({
  display: {
    label: "Actions Get Reviews For Run",
    description: "Get the review history for a workflow run",
  },
  perform: async (context, { connection, owner, repo, runId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}/approvals`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
  },
});

const actionsApproveWorkflowRun = action({
  display: {
    label: "Actions Approve Workflow Run",
    description: "Approve a workflow run for a fork pull request",
  },
  perform: async (context, { connection, owner, repo, runId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/runs/${runId}/approve`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
  },
});

const actionsListWorkflowRunArtifacts = action({
  display: {
    label: "Actions List Workflow Run Artifacts",
    description: "List workflow run artifacts",
  },
  perform: async (
    context,
    { connection, owner, repo, runId, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const actionsGetWorkflowRunAttempt = action({
  display: {
    label: "Actions Get Workflow Run Attempt",
    description: "Get a workflow run attempt",
  },
  perform: async (
    context,
    { connection, owner, repo, runId, attemptNumber, excludePullRequests }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}/attempts/${attemptNumber}`,
      { params: { exclude_pull_requests: excludePullRequests } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
    attemptNumber: {
      label: "Attempt Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The attempt number of the workflow run",
    },
    excludePullRequests: {
      label: "Exclude Pull Requests",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If "true" pull requests are omitted from the response (empty array)',
    },
  },
});

const actionsListJobsForWorkflowRunAttempt = action({
  display: {
    label: "Actions List Jobs For Workflow Run Attempt",
    description: "List jobs for a workflow run attempt",
  },
  perform: async (
    context,
    { connection, owner, repo, runId, attemptNumber, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}/attempts/${attemptNumber}/jobs`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
    attemptNumber: {
      label: "Attempt Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The attempt number of the workflow run",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const actionsDownloadWorkflowRunAttemptLogs = action({
  display: {
    label: "Actions Download Workflow Run Attempt Logs",
    description: "Download workflow run attempt logs",
  },
  perform: async (
    context,
    { connection, owner, repo, runId, attemptNumber }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}/attempts/${attemptNumber}/logs`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
    attemptNumber: {
      label: "Attempt Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The attempt number of the workflow run",
    },
  },
});

const actionsCancelWorkflowRun = action({
  display: {
    label: "Actions Cancel Workflow Run",
    description: "Cancel a workflow run",
  },
  perform: async (context, { connection, owner, repo, runId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/runs/${runId}/cancel`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
  },
});

const actionsListJobsForWorkflowRun = action({
  display: {
    label: "Actions List Jobs For Workflow Run",
    description: "List jobs for a workflow run",
  },
  perform: async (
    context,
    { connection, owner, repo, runId, filter, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
      {
        params: { filter, per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
    filter: {
      label: "Filter",
      type: "string",
      required: false,
      default: "latest",
      model: [
        { label: "Latest", value: "latest" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Filters jobs by their "completed_at" timestamp',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const actionsDownloadWorkflowRunLogs = action({
  display: {
    label: "Actions Download Workflow Run Logs",
    description: "Download workflow run logs",
  },
  perform: async (context, { connection, owner, repo, runId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}/logs`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
  },
});

const actionsDeleteWorkflowRunLogs = action({
  display: {
    label: "Actions Delete Workflow Run Logs",
    description: "Delete workflow run logs",
  },
  perform: async (context, { connection, owner, repo, runId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/actions/runs/${runId}/logs`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
  },
});

const actionsGetPendingDeploymentsForRun = action({
  display: {
    label: "Actions Get Pending Deployments For Run",
    description: "Get pending deployments for a workflow run",
  },
  perform: async (context, { connection, owner, repo, runId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}/pending_deployments`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
  },
});

const actionsReviewPendingDeploymentsForRun = action({
  display: {
    label: "Actions Review Pending Deployments For Run",
    description: "Review pending deployments for a workflow run",
  },
  perform: async (
    context,
    { connection, owner, repo, runId, environmentIds, state, comment }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/runs/${runId}/pending_deployments`,
      { environment_ids: environmentIds, state, comment }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
    environmentIds: {
      label: "Environment Ids",
      type: "string",
      required: true,
      example: "161171787,161171795",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The list of environment ids to approve or reject",
    },
    state: {
      label: "State",
      type: "string",
      required: true,
      model: [
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
      example: "approved",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Whether to approve or reject deployment to the specified environments",
    },
    comment: {
      label: "Comment",
      type: "string",
      required: true,
      example: "Ship it!",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A comment to accompany the deployment review",
    },
  },
});

const actionsReRunWorkflow = action({
  display: {
    label: "Actions Re Run Workflow",
    description: "Re-run a workflow",
  },
  perform: async (
    context,
    { connection, owner, repo, runId, enableDebugLogging }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/runs/${runId}/rerun`,
      { enable_debug_logging: enableDebugLogging }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
    enableDebugLogging: {
      label: "Enable Debug Logging",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to enable debug logging for the re-run",
    },
  },
});

const actionsReRunWorkflowFailedJobs = action({
  display: {
    label: "Actions Re Run Workflow Failed Jobs",
    description: "Re-run failed jobs from a workflow run",
  },
  perform: async (
    context,
    { connection, owner, repo, runId, enableDebugLogging }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/runs/${runId}/rerun-failed-jobs`,
      { enable_debug_logging: enableDebugLogging }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
    enableDebugLogging: {
      label: "Enable Debug Logging",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to enable debug logging for the re-run",
    },
  },
});

const actionsGetWorkflowRunUsage = action({
  display: {
    label: "Actions Get Workflow Run Usage",
    description: "Get workflow run usage",
  },
  perform: async (context, { connection, owner, repo, runId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/runs/${runId}/timing`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    runId: {
      label: "Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the workflow run",
    },
  },
});

const actionsListRepoSecrets = action({
  display: {
    label: "Actions List Repo Secrets",
    description: "List repository secrets",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/secrets`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const actionsGetRepoPublicKey = action({
  display: {
    label: "Actions Get Repo Public Key",
    description: "Get a repository public key",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/secrets/public-key`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const actionsGetRepoSecret = action({
  display: {
    label: "Actions Get Repo Secret",
    description: "Get a repository secret",
  },
  perform: async (context, { connection, owner, repo, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/secrets/${secretName}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const actionsCreateOrUpdateRepoSecret = action({
  display: {
    label: "Actions Create Or Update Repo Secret",
    description: "Create or update a repository secret",
  },
  perform: async (
    context,
    { connection, owner, repo, secretName, encryptedValue, keyId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/actions/secrets/${secretName}`,
      { encrypted_value: encryptedValue, key_id: keyId }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
    encryptedValue: {
      label: "Encrypted Value",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Value for your secret, encrypted with [LibSodium](https://libsodium",
    },
    keyId: {
      label: "Key Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ID of the key you used to encrypt the secret",
    },
  },
});

const actionsDeleteRepoSecret = action({
  display: {
    label: "Actions Delete Repo Secret",
    description: "Delete a repository secret",
  },
  perform: async (context, { connection, owner, repo, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/actions/secrets/${secretName}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const actionsListRepoWorkflows = action({
  display: {
    label: "Actions List Repo Workflows",
    description: "List repository workflows",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/workflows`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const actionsGetWorkflow = action({
  display: {
    label: "Actions Get Workflow",
    description: "Get a workflow",
  },
  perform: async (context, { connection, owner, repo, workflowId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/workflows/${workflowId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    workflowId: {
      label: "Workflow Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The ID of the workflow",
    },
  },
});

const actionsDisableWorkflow = action({
  display: {
    label: "Actions Disable Workflow",
    description: "Disable a workflow",
  },
  perform: async (context, { connection, owner, repo, workflowId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/actions/workflows/${workflowId}/disable`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    workflowId: {
      label: "Workflow Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The ID of the workflow",
    },
  },
});

const actionsCreateWorkflowDispatch = action({
  display: {
    label: "Actions Create Workflow Dispatch",
    description: "Create a workflow dispatch event",
  },
  examplePayload: actionsCreateWorkflowDispatchExamplePayload,
  perform: async (
    context,
    { connection, owner, repo, workflowId, ref, inputs }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
      { ref, inputs }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    workflowId: {
      label: "Workflow Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The ID of the workflow",
    },
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The git reference for the workflow",
    },
    inputs: {
      label: "Inputs",
      type: "string",
      required: false,
      clean: (value) => {
        if (!value) {
          return undefined;
        }
        if (util.types.isJSON(util.types.toString(value))) {
          return JSON.parse(util.types.toString(value));
        }
        return value;
      },
      default: `{"input1":"My Value","input2":"My Other Value"}`,
      comments:
        "Input keys and values configured in the workflow file. This can be a JSON input mapping, or a reference to a previous step that returned an object.",
    },
  },
});

const actionsEnableWorkflow = action({
  display: {
    label: "Actions Enable Workflow",
    description: "Enable a workflow",
  },
  perform: async (context, { connection, owner, repo, workflowId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/actions/workflows/${workflowId}/enable`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    workflowId: {
      label: "Workflow Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The ID of the workflow",
    },
  },
});

const actionsListWorkflowRuns = action({
  display: {
    label: "Actions List Workflow Runs",
    description: "List workflow runs",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      workflowId,
      actor,
      branch,
      event,
      status,
      perPage,
      page,
      created,
      excludePullRequests,
      checkSuiteId,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`,
      {
        params: {
          actor,
          branch,
          event,
          status,
          per_page: perPage,
          page,
          created,
          exclude_pull_requests: excludePullRequests,
          check_suite_id: checkSuiteId,
        },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    workflowId: {
      label: "Workflow Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The ID of the workflow",
    },
    actor: {
      label: "Actor",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Returns someone"s workflow runs',
    },
    branch: {
      label: "Branch",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns workflow runs associated with a branch",
    },
    event: {
      label: "Event",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns workflow run triggered by the event you specify",
    },
    status: {
      label: "Status",
      type: "string",
      required: false,
      model: [
        { label: "Completed", value: "completed" },
        { label: "Action Required", value: "action_required" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Failure", value: "failure" },
        { label: "Neutral", value: "neutral" },
        { label: "Skipped", value: "skipped" },
        { label: "Stale", value: "stale" },
        { label: "Success", value: "success" },
        { label: "Timed Out", value: "timed_out" },
        { label: "In Progress", value: "in_progress" },
        { label: "Queued", value: "queued" },
        { label: "Requested", value: "requested" },
        { label: "Waiting", value: "waiting" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Returns workflow runs with the check run "status" or "conclusion" that you specify',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
    created: {
      label: "Created",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Returns workflow runs created within the given date-time range",
    },
    excludePullRequests: {
      label: "Exclude Pull Requests",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If "true" pull requests are omitted from the response (empty array)',
    },
    checkSuiteId: {
      label: "Check Suite Id",
      type: "string",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        'Returns workflow runs with the "check_suite_id" that you specify',
    },
  },
});

const actionsGetWorkflowUsage = action({
  display: {
    label: "Actions Get Workflow Usage",
    description: "Get workflow usage",
  },
  perform: async (context, { connection, owner, repo, workflowId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/actions/workflows/${workflowId}/timing`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    workflowId: {
      label: "Workflow Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The ID of the workflow",
    },
  },
});

const issuesListAssignees = action({
  display: {
    label: "Issues List Assignees",
    description: "List assignees",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/assignees`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const issuesCheckUserCanBeAssigned = action({
  display: {
    label: "Issues Check User Can Be Assigned",
    description: "Check if a user can be assigned",
  },
  perform: async (context, { connection, owner, repo, assignee }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/assignees/${assignee}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    assignee: {
      label: "Assignee",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const reposListAutolinks = action({
  display: {
    label: "Repos List Autolinks",
    description: "List all autolinks of a repository",
  },
  perform: async (context, { connection, owner, repo, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/autolinks`, {
      params: { page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposCreateAutolink = action({
  display: {
    label: "Repos Create Autolink",
    description: "Create an autolink reference for a repository",
  },
  perform: async (
    context,
    { connection, owner, repo, keyPrefix, urlTemplate }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/autolinks`, {
      key_prefix: keyPrefix,
      url_template: urlTemplate,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    keyPrefix: {
      label: "Key Prefix",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The prefix appended by a number will generate a link any time it is found in an issue, pull request, or commit",
    },
    urlTemplate: {
      label: "Url Template",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The URL must contain  for the reference number",
    },
  },
});

const reposGetAutolink = action({
  display: {
    label: "Repos Get Autolink",
    description: "Get an autolink reference of a repository",
  },
  perform: async (context, { connection, owner, repo, autolinkId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/autolinks/${autolinkId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    autolinkId: {
      label: "Autolink Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the autolink",
    },
  },
});

const reposDeleteAutolink = action({
  display: {
    label: "Repos Delete Autolink",
    description: "Delete an autolink reference from a repository",
  },
  perform: async (context, { connection, owner, repo, autolinkId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/autolinks/${autolinkId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    autolinkId: {
      label: "Autolink Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the autolink",
    },
  },
});

const reposEnableAutomatedSecurityFixes = action({
  display: {
    label: "Repos Enable Automated Security Fixes",
    description: "Enable automated security fixes",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/automated-security-fixes`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposDisableAutomatedSecurityFixes = action({
  display: {
    label: "Repos Disable Automated Security Fixes",
    description: "Disable automated security fixes",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/automated-security-fixes`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposListBranches = action({
  display: {
    label: "Repos List Branches",
    description: "List branches",
  },
  perform: async (
    context,
    { connection, owner, repo, isProtected, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/branches`, {
      params: { protected: isProtected, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    isProtected: {
      label: "Protected",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: 'Setting to "true" returns only protected branches',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposGetBranch = action({
  display: {
    label: "Repos Get Branch",
    description: "Get a branch",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetBranchProtection = action({
  display: {
    label: "Repos Get Branch Protection",
    description: "Get branch protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposUpdateBranchProtection = action({
  display: {
    label: "Repos Update Branch Protection",
    description: "Update branch protection",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      branch,
      requiredStatusChecks,
      enforceAdmins,
      requiredPullRequestReviews,
      restrictions,
      requiredLinearHistory,
      allowForcePushes,
      allowDeletions,
      blockCreations,
      requiredConversationResolution,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/branches/${branch}/protection`,
      {
        required_status_checks: requiredStatusChecks,
        enforce_admins: enforceAdmins,
        required_pull_request_reviews: requiredPullRequestReviews,
        restrictions,
        required_linear_history: requiredLinearHistory,
        allow_force_pushes: allowForcePushes,
        allow_deletions: allowDeletions,
        block_creations: blockCreations,
        required_conversation_resolution: requiredConversationResolution,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
    requiredStatusChecks: {
      label: "Required Status Checks",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Require status checks to pass before merging",
    },
    enforceAdmins: {
      label: "Enforce Admins",
      type: "boolean",
      required: true,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Enforce all configured restrictions for administrators",
    },
    requiredPullRequestReviews: {
      label: "Required Pull Request Reviews",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Require at least one approving review on a pull request, before merging",
    },
    restrictions: {
      label: "Restrictions",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Restrict who can push to the protected branch",
    },
    requiredLinearHistory: {
      label: "Required Linear History",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Enforces a linear commit Git history, which prevents anyone from pushing merge commits to a branch",
    },
    allowForcePushes: {
      label: "Allow Force Pushes",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Permits force pushes to the protected branch by anyone with write access to the repository",
    },
    allowDeletions: {
      label: "Allow Deletions",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Allows deletion of the protected branch by anyone with write access to the repository",
    },
    blockCreations: {
      label: "Block Creations",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If set to "true", the "restrictions" branch protection settings which limits who can push will also block pushes which create new branches, unless the push is initiated by a user, team, or app which has the ability to push',
    },
    requiredConversationResolution: {
      label: "Required Conversation Resolution",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Requires all conversations on code to be resolved before a pull request can be merged into a branch that matches this rule",
    },
  },
});

const reposDeleteBranchProtection = action({
  display: {
    label: "Repos Delete Branch Protection",
    description: "Delete branch protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetAdminBranchProtection = action({
  display: {
    label: "Repos Get Admin Branch Protection",
    description: "Get admin branch protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposSetAdminBranchProtection = action({
  display: {
    label: "Repos Set Admin Branch Protection",
    description: "Set admin branch protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposDeleteAdminBranchProtection = action({
  display: {
    label: "Repos Delete Admin Branch Protection",
    description: "Delete admin branch protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetPullRequestReviewProtection = action({
  display: {
    label: "Repos Get Pull Request Review Protection",
    description: "Get pull request review protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_pull_request_reviews`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposUpdatePullRequestReviewProtection = action({
  display: {
    label: "Repos Update Pull Request Review Protection",
    description: "Update pull request review protection",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      branch,
      dismissalRestrictions,
      dismissStaleReviews,
      requireCodeOwnerReviews,
      requiredApprovingReviewCount,
      bypassPullRequestAllowances,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_pull_request_reviews`,
      {
        dismissal_restrictions: dismissalRestrictions,
        dismiss_stale_reviews: dismissStaleReviews,
        require_code_owner_reviews: requireCodeOwnerReviews,
        required_approving_review_count: requiredApprovingReviewCount,
        bypass_pull_request_allowances: bypassPullRequestAllowances,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
    dismissalRestrictions: {
      label: "Dismissal Restrictions",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Specify which users, teams, and apps can dismiss pull request reviews",
    },
    dismissStaleReviews: {
      label: "Dismiss Stale Reviews",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Set to "true" if you want to automatically dismiss approving reviews when someone pushes a new commit',
    },
    requireCodeOwnerReviews: {
      label: "Require Code Owner Reviews",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Blocks merging pull requests until [code owners](https://docs",
    },
    requiredApprovingReviewCount: {
      label: "Required Approving Review Count",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        "Specifies the number of reviewers required to approve pull requests",
    },
    bypassPullRequestAllowances: {
      label: "Bypass Pull Request Allowances",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Allow specific users, teams, or apps to bypass pull request requirements",
    },
  },
});

const reposDeletePullRequestReviewProtection = action({
  display: {
    label: "Repos Delete Pull Request Review Protection",
    description: "Delete pull request review protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_pull_request_reviews`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetCommitSignatureProtection = action({
  display: {
    label: "Repos Get Commit Signature Protection",
    description: "Get commit signature protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_signatures`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposCreateCommitSignatureProtection = action({
  display: {
    label: "Repos Create Commit Signature Protection",
    description: "Create commit signature protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_signatures`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposDeleteCommitSignatureProtection = action({
  display: {
    label: "Repos Delete Commit Signature Protection",
    description: "Delete commit signature protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_signatures`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetStatusChecksProtection = action({
  display: {
    label: "Repos Get Status Checks Protection",
    description: "Get status checks protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposUpdateStatusCheckProtection = action({
  display: {
    label: "Repos Update Status Check Protection",
    description: "Update status check protection",
  },
  perform: async (
    context,
    { connection, owner, repo, branch, strict, contexts, checks }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`,
      { strict, contexts, checks }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
    strict: {
      label: "Strict",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Require branches to be up to date before merging",
    },
    contexts: {
      label: "Contexts",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "**Deprecated**: The list of status checks to require in order to merge into this branch",
    },
    checks: {
      label: "Checks",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The list of status checks to require in order to merge into this branch",
    },
  },
});

const reposRemoveStatusCheckProtection = action({
  display: {
    label: "Repos Remove Status Check Protection",
    description: "Remove status check protection",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetAllStatusCheckContexts = action({
  display: {
    label: "Repos Get All Status Check Contexts",
    description: "Get all status check contexts",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposAddStatusCheckContexts = action({
  display: {
    label: "Repos Add Status Check Contexts",
    description: "Add status check contexts",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposSetStatusCheckContexts = action({
  display: {
    label: "Repos Set Status Check Contexts",
    description: "Set status check contexts",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposRemoveStatusCheckContexts = action({
  display: {
    label: "Repos Remove Status Check Contexts",
    description: "Remove status check contexts",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetAccessRestrictions = action({
  display: {
    label: "Repos Get Access Restrictions",
    description: "Get access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposDeleteAccessRestrictions = action({
  display: {
    label: "Repos Delete Access Restrictions",
    description: "Delete access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetAppsWithAccessToProtectedBranch = action({
  display: {
    label: "Repos Get Apps With Access To Protected Branch",
    description: "Get apps with access to the protected branch",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposAddAppAccessRestrictions = action({
  display: {
    label: "Repos Add App Access Restrictions",
    description: "Add app access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposSetAppAccessRestrictions = action({
  display: {
    label: "Repos Set App Access Restrictions",
    description: "Set app access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposRemoveAppAccessRestrictions = action({
  display: {
    label: "Repos Remove App Access Restrictions",
    description: "Remove app access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetTeamsWithAccessToProtectedBranch = action({
  display: {
    label: "Repos Get Teams With Access To Protected Branch",
    description: "Get teams with access to the protected branch",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposAddTeamAccessRestrictions = action({
  display: {
    label: "Repos Add Team Access Restrictions",
    description: "Add team access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposSetTeamAccessRestrictions = action({
  display: {
    label: "Repos Set Team Access Restrictions",
    description: "Set team access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposRemoveTeamAccessRestrictions = action({
  display: {
    label: "Repos Remove Team Access Restrictions",
    description: "Remove team access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposGetUsersWithAccessToProtectedBranch = action({
  display: {
    label: "Repos Get Users With Access To Protected Branch",
    description: "Get users with access to the protected branch",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposAddUserAccessRestrictions = action({
  display: {
    label: "Repos Add User Access Restrictions",
    description: "Add user access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposSetUserAccessRestrictions = action({
  display: {
    label: "Repos Set User Access Restrictions",
    description: "Set user access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposRemoveUserAccessRestrictions = action({
  display: {
    label: "Repos Remove User Access Restrictions",
    description: "Remove user access restrictions",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
  },
});

const reposRenameBranch = action({
  display: {
    label: "Repos Rename Branch",
    description: "Rename a branch",
  },
  perform: async (context, { connection, owner, repo, branch, newName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/branches/${branch}/rename`,
      {
        new_name: newName,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch",
    },
    newName: {
      label: "New Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new name of the branch",
    },
  },
});

const checksCreate = action({
  display: {
    label: "Checks Create",
    description: "Create a check run",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      name,
      headSha,
      detailsUrl,
      externalId,
      status,
      startedAt,
      conclusion,
      completedAt,
      output,
      actions,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/check-runs`, {
      name,
      head_sha: headSha,
      details_url: detailsUrl,
      external_id: externalId,
      status,
      started_at: startedAt,
      conclusion,
      completed_at: completedAt,
      output,
      actions,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the check",
    },
    headSha: {
      label: "Head Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the commit",
    },
    detailsUrl: {
      label: "Details Url",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'The URL of the integrator"s site that has the full details of the check',
    },
    externalId: {
      label: "External Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'A reference for the run on the integrator"s system',
    },
    status: {
      label: "Status",
      type: "string",
      required: false,
      default: "queued",
      model: [
        { label: "Queued", value: "queued" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The current status",
    },
    startedAt: {
      label: "Started At",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The time that the check run began",
    },
    conclusion: {
      label: "Conclusion",
      type: "string",
      required: false,
      model: [
        { label: "Action Required", value: "action_required" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Failure", value: "failure" },
        { label: "Neutral", value: "neutral" },
        { label: "Success", value: "success" },
        { label: "Skipped", value: "skipped" },
        { label: "Stale", value: "stale" },
        { label: "Timed Out", value: "timed_out" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        '**Required if you provide "completed_at" or a "status" of "completed"**',
    },
    completedAt: {
      label: "Completed At",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The time the check completed",
    },
    output: {
      label: "Output",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Check runs can accept a variety of data in the "output" object, including a "title" and "summary" and can optionally provide descriptive details about the run',
    },
    actions: {
      label: "Actions",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Displays a button on GitHub that can be clicked to alert your app to do additional tasks",
    },
  },
});

const checksGet = action({
  display: {
    label: "Checks Get",
    description: "Get a check run",
  },
  perform: async (context, { connection, owner, repo, checkRunId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/check-runs/${checkRunId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    checkRunId: {
      label: "Check Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the check run",
    },
  },
});

const checksUpdate = action({
  display: {
    label: "Checks Update",
    description: "Update a check run",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      checkRunId,
      name,
      detailsUrl,
      externalId,
      startedAt,
      status,
      conclusion,
      completedAt,
      output,
      actions,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/check-runs/${checkRunId}`,
      {
        name,
        details_url: detailsUrl,
        external_id: externalId,
        started_at: startedAt,
        status,
        conclusion,
        completed_at: completedAt,
        output,
        actions,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    checkRunId: {
      label: "Check Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the check run",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the check",
    },
    detailsUrl: {
      label: "Details Url",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'The URL of the integrator"s site that has the full details of the check',
    },
    externalId: {
      label: "External Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'A reference for the run on the integrator"s system',
    },
    startedAt: {
      label: "Started At",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "This is a timestamp in [ISO 8601](https://en",
    },
    status: {
      label: "Status",
      type: "string",
      required: false,
      model: [
        { label: "Queued", value: "queued" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The current status",
    },
    conclusion: {
      label: "Conclusion",
      type: "string",
      required: false,
      model: [
        { label: "Action Required", value: "action_required" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Failure", value: "failure" },
        { label: "Neutral", value: "neutral" },
        { label: "Success", value: "success" },
        { label: "Skipped", value: "skipped" },
        { label: "Stale", value: "stale" },
        { label: "Timed Out", value: "timed_out" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        '**Required if you provide "completed_at" or a "status" of "completed"**',
    },
    completedAt: {
      label: "Completed At",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The time the check completed",
    },
    output: {
      label: "Output",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Check runs can accept a variety of data in the "output" object, including a "title" and "summary" and can optionally provide descriptive details about the run',
    },
    actions: {
      label: "Actions",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Possible further actions the integrator can perform, which a user may trigger",
    },
  },
});

const checksListAnnotations = action({
  display: {
    label: "Checks List Annotations",
    description: "List check run annotations",
  },
  perform: async (
    context,
    { connection, owner, repo, checkRunId, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/check-runs/${checkRunId}/annotations`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    checkRunId: {
      label: "Check Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the check run",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const checksRerequestRun = action({
  display: {
    label: "Checks Rerequest Run",
    description: "Rerequest a check run",
  },
  perform: async (context, { connection, owner, repo, checkRunId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/check-runs/${checkRunId}/rerequest`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    checkRunId: {
      label: "Check Run Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the check run",
    },
  },
});

const checksCreateSuite = action({
  display: {
    label: "Checks Create Suite",
    description: "Create a check suite",
  },
  perform: async (context, { connection, owner, repo, headSha }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/check-suites`, {
      head_sha: headSha,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    headSha: {
      label: "Head Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The sha of the head commit",
    },
  },
});

const checksSetSuitesPreferences = action({
  display: {
    label: "Checks Set Suites Preferences",
    description: "Update repository preferences for check suites",
  },
  perform: async (context, { connection, owner, repo, autoTriggerChecks }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/check-suites/preferences`,
      {
        auto_trigger_checks: autoTriggerChecks,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    autoTriggerChecks: {
      label: "Auto Trigger Checks",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Enables or disables automatic creation of CheckSuite events upon pushes to the repository",
    },
  },
});

const checksGetSuite = action({
  display: {
    label: "Checks Get Suite",
    description: "Get a check suite",
  },
  perform: async (context, { connection, owner, repo, checkSuiteId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/check-suites/${checkSuiteId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    checkSuiteId: {
      label: "Check Suite Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the check suite",
    },
  },
});

const checksListForSuite = action({
  display: {
    label: "Checks List For Suite",
    description: "List check runs in a check suite",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      checkSuiteId,
      checkName,
      status,
      filter,
      perPage,
      page,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/check-suites/${checkSuiteId}/check-runs`,
      {
        params: {
          check_name: checkName,
          status,
          filter,
          per_page: perPage,
          page,
        },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    checkSuiteId: {
      label: "Check Suite Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the check suite",
    },
    checkName: {
      label: "Check Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Returns check runs with the specified "name"',
    },
    status: {
      label: "Status",
      type: "string",
      required: false,
      model: [
        { label: "Queued", value: "queued" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Returns check runs with the specified "status"',
    },
    filter: {
      label: "Filter",
      type: "string",
      required: false,
      default: "latest",
      model: [
        { label: "Latest", value: "latest" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Filters check runs by their "completed_at" timestamp',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const checksRerequestSuite = action({
  display: {
    label: "Checks Rerequest Suite",
    description: "Rerequest a check suite",
  },
  perform: async (context, { connection, owner, repo, checkSuiteId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/check-suites/${checkSuiteId}/rerequest`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    checkSuiteId: {
      label: "Check Suite Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the check suite",
    },
  },
});

const codeScanningListAlertsForRepo = action({
  display: {
    label: "Code Scanning List Alerts For Repo",
    description: "List code scanning alerts for a repository",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      toolName,
      toolGuid,
      page,
      perPage,
      ref,
      direction,
      sort,
      state,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/code-scanning/alerts`,
      {
        params: {
          tool_name: toolName,
          tool_guid: toolGuid,
          page,
          per_page: perPage,
          ref,
          direction,
          sort,
          state,
        },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    toolName: {
      label: "Tool Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of a code scanning tool",
    },
    toolGuid: {
      label: "Tool Guid",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GUID of a code scanning tool",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    ref: {
      label: "Ref",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The Git reference for the results you want to list",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      default: "desc",
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The direction to sort the results by",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "number",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
        { label: "Number", value: "number" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The property by which to sort the results",
    },
    state: {
      label: "State",
      type: "string",
      required: false,
      model: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
        { label: "Dismissed", value: "dismissed" },
        { label: "Fixed", value: "fixed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Set to "open", "closed, "fixed", or "dismissed" to list code scanning alerts in a specific state',
    },
  },
});

const codeScanningGetAlert = action({
  display: {
    label: "Code Scanning Get Alert",
    description: "Get a code scanning alert",
  },
  perform: async (context, { connection, owner, repo, alertNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    alertNumber: {
      label: "Alert Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies an alert",
    },
  },
});

const codeScanningUpdateAlert = action({
  display: {
    label: "Code Scanning Update Alert",
    description: "Update a code scanning alert",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      alertNumber,
      state,
      dismissedReason,
      dismissedComment,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}`,
      {
        state,
        dismissed_reason: dismissedReason,
        dismissed_comment: dismissedComment,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    alertNumber: {
      label: "Alert Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies an alert",
    },
    state: {
      label: "State",
      type: "string",
      required: true,
      model: [
        { label: "Open", value: "open" },
        { label: "Dismissed", value: "dismissed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Sets the state of the code scanning alert",
    },
    dismissedReason: {
      label: "Dismissed Reason",
      type: "string",
      required: false,
      model: [
        { label: "", value: "null" },
        { label: "False Positive", value: "false positive" },
        { label: "Wont Fix", value: "won't fix" },
        { label: "Used In Tests", value: "used in tests" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "**Required when the state is dismissed",
    },
    dismissedComment: {
      label: "Dismissed Comment",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The dismissal comment associated with the dismissal of the alert",
    },
  },
});

const codeScanningListAlertInstances = action({
  display: {
    label: "Code Scanning List Alert Instances",
    description: "List instances of a code scanning alert",
  },
  perform: async (
    context,
    { connection, owner, repo, alertNumber, page, perPage, ref }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}/instances`,
      { params: { page, per_page: perPage, ref } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    alertNumber: {
      label: "Alert Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies an alert",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    ref: {
      label: "Ref",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The Git reference for the results you want to list",
    },
  },
});

const codeScanningListRecentAnalyses = action({
  display: {
    label: "Code Scanning List Recent Analyses",
    description: "List code scanning analyses for a repository",
  },
  perform: async (
    context,
    { connection, owner, repo, toolName, toolGuid, page, perPage, ref, sarifId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/code-scanning/analyses`,
      {
        params: {
          tool_name: toolName,
          tool_guid: toolGuid,
          page,
          per_page: perPage,
          ref,
          sarif_id: sarifId,
        },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    toolName: {
      label: "Tool Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of a code scanning tool",
    },
    toolGuid: {
      label: "Tool Guid",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GUID of a code scanning tool",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    ref: {
      label: "Ref",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The Git reference for the analyses you want to list",
    },
    sarifId: {
      label: "Sarif Id",
      type: "string",
      required: false,
      example: "6c81cd8e-b078-4ac3-a3be-1dad7dbd0b53",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filter analyses belonging to the same SARIF upload",
    },
  },
});

const codeScanningGetAnalysis = action({
  display: {
    label: "Code Scanning Get Analysis",
    description: "Get a code scanning analysis for a repository",
  },
  perform: async (context, { connection, owner, repo, analysisId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/code-scanning/analyses/${analysisId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    analysisId: {
      label: "Analysis Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        'The ID of the analysis, as returned from the "GET /repos/{owner}/{repo}/code-scanning/analyses" operation',
    },
  },
});

const codeScanningDeleteAnalysis = action({
  display: {
    label: "Code Scanning Delete Analysis",
    description: "Delete a code scanning analysis from a repository",
  },
  perform: async (
    context,
    { connection, owner, repo, analysisId, confirmDelete }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/code-scanning/analyses/${analysisId}`,
      { params: { confirm_delete: confirmDelete } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    analysisId: {
      label: "Analysis Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        'The ID of the analysis, as returned from the "GET /repos/{owner}/{repo}/code-scanning/analyses" operation',
    },
    confirmDelete: {
      label: "Confirm Delete",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Allow deletion if the specified analysis is the last in a set",
    },
  },
});

const codeScanningUploadSarif = action({
  display: {
    label: "Code Scanning Upload Sarif",
    description: "Upload an analysis as SARIF data",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      commitSha,
      ref,
      sarif,
      checkoutUri,
      startedAt,
      toolName,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/code-scanning/sarifs`,
      {
        commit_sha: commitSha,
        ref,
        sarif,
        checkout_uri: checkoutUri,
        started_at: startedAt,
        tool_name: toolName,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commitSha: {
      label: "Commit Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The SHA of the commit to which the analysis you are uploading relates",
    },
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The full Git reference, formatted as "refs/heads/",',
    },
    sarif: {
      label: "Sarif",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A Base64 string representing the SARIF file to upload",
    },
    checkoutUri: {
      label: "Checkout Uri",
      type: "string",
      required: false,
      example: "file:///github/workspace/",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The base directory used in the analysis, as it appears in the SARIF file",
    },
    startedAt: {
      label: "Started At",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The time that the analysis run began",
    },
    toolName: {
      label: "Tool Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The name of the tool used to generate the code scanning analysis",
    },
  },
});

const codeScanningGetSarif = action({
  display: {
    label: "Code Scanning Get Sarif",
    description: "Get information about a SARIF upload",
  },
  perform: async (context, { connection, owner, repo, sarifId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/code-scanning/sarifs/${sarifId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    sarifId: {
      label: "Sarif Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SARIF ID obtained after uploading",
    },
  },
});

const reposCodeownersErrors = action({
  display: {
    label: "Repos Codeowners Errors",
    description: "List CODEOWNERS errors",
  },
  perform: async (context, { connection, owner, repo, ref }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/codeowners/errors`,
      {
        params: { ref },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "A branch, tag or commit name used to determine which version of the CODEOWNERS file to use",
    },
  },
});

const codespacesListInRepositoryForAuthenticatedUser = action({
  display: {
    label: "Codespaces List In Repository For Authenticated User",
    description: "List codespaces in a repository for the authenticated user",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/codespaces`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const codespacesCreateWithRepoForAuthenticatedUser = action({
  display: {
    label: "Codespaces Create With Repo For Authenticated User",
    description: "Create a codespace in a repository",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      ref,
      location,
      clientIp,
      machine,
      devcontainerPath,
      multiRepoPermissionsOptOut,
      workingDirectory,
      idleTimeoutMinutes,
      displayName,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/codespaces`, {
      ref,
      location,
      client_ip: clientIp,
      machine,
      devcontainer_path: devcontainerPath,
      multi_repo_permissions_opt_out: multiRepoPermissionsOptOut,
      working_directory: workingDirectory,
      idle_timeout_minutes: idleTimeoutMinutes,
      display_name: displayName,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Git ref (typically a branch name) for this codespace",
    },
    location: {
      label: "Location",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Location for this codespace",
    },
    clientIp: {
      label: "Client Ip",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "IP for location auto-detection when proxying a request",
    },
    machine: {
      label: "Machine",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Machine type to use for this codespace",
    },
    devcontainerPath: {
      label: "Devcontainer Path",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Path to devcontainer",
    },
    multiRepoPermissionsOptOut: {
      label: "Multi Repo Permissions Opt Out",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to authorize requested permissions from devcontainer",
    },
    workingDirectory: {
      label: "Working Directory",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Working directory for this codespace",
    },
    idleTimeoutMinutes: {
      label: "Idle Timeout Minutes",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Time in minutes before codespace stops from inactivity",
    },
    displayName: {
      label: "Display Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Display name for this codespace",
    },
  },
});

const codespacesListDevcontainersInRepositoryForAuthenticatedUser = action({
  display: {
    label: "Codespaces List Devcontainers In Repository For Authenticated User",
    description:
      "List devcontainer configurations in a repository for the authenticated user",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/codespaces/devcontainers`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const codespacesRepoMachinesForAuthenticatedUser = action({
  display: {
    label: "Codespaces Repo Machines For Authenticated User",
    description: "List available machine types for a repository",
  },
  perform: async (context, { connection, owner, repo, location, clientIp }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/codespaces/machines`,
      {
        params: { location, client_ip: clientIp },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    location: {
      label: "Location",
      type: "string",
      example: "WestUs2",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The location to check for available machines",
    },
    clientIp: {
      label: "Client Ip",
      type: "string",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "IP for location auto-detection when proxying a request",
    },
  },
});

const codespacesListRepoSecrets = action({
  display: {
    label: "Codespaces List Repo Secrets",
    description: "List repository secrets",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/codespaces/secrets`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const codespacesGetRepoPublicKey = action({
  display: {
    label: "Codespaces Get Repo Public Key",
    description: "Get a repository public key",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/codespaces/secrets/public-key`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const codespacesGetRepoSecret = action({
  display: {
    label: "Codespaces Get Repo Secret",
    description: "Get a repository secret",
  },
  perform: async (context, { connection, owner, repo, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/codespaces/secrets/${secretName}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const codespacesCreateOrUpdateRepoSecret = action({
  display: {
    label: "Codespaces Create Or Update Repo Secret",
    description: "Create or update a repository secret",
  },
  perform: async (
    context,
    { connection, owner, repo, secretName, encryptedValue, keyId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/codespaces/secrets/${secretName}`,
      { encrypted_value: encryptedValue, key_id: keyId }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
    encryptedValue: {
      label: "Encrypted Value",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Value for your secret, encrypted with [LibSodium](https://libsodium",
    },
    keyId: {
      label: "Key Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ID of the key you used to encrypt the secret",
    },
  },
});

const codespacesDeleteRepoSecret = action({
  display: {
    label: "Codespaces Delete Repo Secret",
    description: "Delete a repository secret",
  },
  perform: async (context, { connection, owner, repo, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/codespaces/secrets/${secretName}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const reposListCollaborators = action({
  display: {
    label: "Repos List Collaborators",
    description: "List repository collaborators",
  },
  perform: async (
    context,
    { connection, owner, repo, affiliation, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/collaborators`, {
      params: { affiliation, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    affiliation: {
      label: "Affiliation",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "Outside", value: "outside" },
        { label: "Direct", value: "direct" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filter collaborators returned by their affiliation",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposCheckCollaborator = action({
  display: {
    label: "Repos Check Collaborator",
    description: "Check if a user is a repository collaborator",
  },
  perform: async (context, { connection, owner, repo, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/collaborators/${username}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const reposAddCollaborator = action({
  display: {
    label: "Repos Add Collaborator",
    description: "Add a repository collaborator",
  },
  perform: async (
    context,
    { connection, owner, repo, username, permission, permissions }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/collaborators/${username}`,
      {
        permission,
        permissions,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
    permission: {
      label: "Permission",
      type: "string",
      required: false,
      default: "push",
      model: [
        { label: "Pull", value: "pull" },
        { label: "Push", value: "push" },
        { label: "Admin", value: "admin" },
        { label: "Maintain", value: "maintain" },
        { label: "Triage", value: "triage" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The permission to grant the collaborator",
    },
    permissions: {
      label: "Permissions",
      type: "string",
      required: false,
      example: '"push"',
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const reposRemoveCollaborator = action({
  display: {
    label: "Repos Remove Collaborator",
    description: "Remove a repository collaborator",
  },
  perform: async (context, { connection, owner, repo, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/collaborators/${username}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const reposGetCollaboratorPermissionLevel = action({
  display: {
    label: "Repos Get Collaborator Permission Level",
    description: "Get repository permissions for a user",
  },
  perform: async (context, { connection, owner, repo, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/collaborators/${username}/permission`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const reposListCommitCommentsForRepo = action({
  display: {
    label: "Repos List Commit Comments For Repo",
    description: "List commit comments for a repository",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/comments`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposGetCommitComment = action({
  display: {
    label: "Repos Get Commit Comment",
    description: "Get a commit comment",
  },
  perform: async (context, { connection, owner, repo, commentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/comments/${commentId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
  },
});

const reposUpdateCommitComment = action({
  display: {
    label: "Repos Update Commit Comment",
    description: "Update a commit comment",
  },
  perform: async (context, { connection, owner, repo, commentId, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/comments/${commentId}`,
      {
        body,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The contents of the comment",
    },
  },
});

const reposDeleteCommitComment = action({
  display: {
    label: "Repos Delete Commit Comment",
    description: "Delete a commit comment",
  },
  perform: async (context, { connection, owner, repo, commentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/comments/${commentId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
  },
});

const reactionsListForCommitComment = action({
  display: {
    label: "Reactions List For Commit Comment",
    description: "List reactions for a commit comment",
  },
  perform: async (
    context,
    { connection, owner, repo, commentId, content, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/comments/${commentId}/reactions`,
      { params: { content, per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
    content: {
      label: "Content",
      type: "string",
      required: false,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns a single [reaction type](https://docs",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reactionsCreateForCommitComment = action({
  display: {
    label: "Reactions Create For Commit Comment",
    description: "Create reaction for a commit comment",
  },
  perform: async (context, { connection, owner, repo, commentId, content }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/comments/${commentId}/reactions`,
      { content }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
    content: {
      label: "Content",
      type: "string",
      required: true,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The [reaction type](https://docs",
    },
  },
});

const reactionsDeleteForCommitComment = action({
  display: {
    label: "Reactions Delete For Commit Comment",
    description: "Delete a commit comment reaction",
  },
  perform: async (
    context,
    { connection, owner, repo, commentId, reactionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/comments/${commentId}/reactions/${reactionId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
    reactionId: {
      label: "Reaction Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the reaction",
    },
  },
});

const reposListCommits = action({
  display: {
    label: "Repos List Commits",
    description: "List commits",
  },
  perform: async (
    context,
    { connection, owner, repo, sha, path, author, since, until, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/commits`, {
      params: { sha, path, author, since, until, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    sha: {
      label: "Sha",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "SHA or branch to start listing commits from",
    },
    path: {
      label: "Path",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only commits containing this file path will be returned",
    },
    author: {
      label: "Author",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "GitHub login or email address by which to filter by commit author",
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated after the given time",
    },
    until: {
      label: "Until",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only commits before this date will be returned",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposListBranchesForHeadCommit = action({
  display: {
    label: "Repos List Branches For Head Commit",
    description: "List branches for HEAD commit",
  },
  perform: async (context, { connection, owner, repo, commitSha }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/commits/${commitSha}/branches-where-head`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commitSha: {
      label: "Commit Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the commit",
    },
  },
});

const reposListCommentsForCommit = action({
  display: {
    label: "Repos List Comments For Commit",
    description: "List commit comments",
  },
  perform: async (
    context,
    { connection, owner, repo, commitSha, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/commits/${commitSha}/comments`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commitSha: {
      label: "Commit Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the commit",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposCreateCommitComment = action({
  display: {
    label: "Repos Create Commit Comment",
    description: "Create a commit comment",
  },
  perform: async (
    context,
    { connection, owner, repo, commitSha, body, path, position, line }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/commits/${commitSha}/comments`,
      { body, path, position, line }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commitSha: {
      label: "Commit Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the commit",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The contents of the comment",
    },
    path: {
      label: "Path",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Relative path of the file to comment on",
    },
    position: {
      label: "Position",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Line index in the diff to comment on",
    },
    line: {
      label: "Line",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "**Deprecated**",
    },
  },
});

const reposListPullRequestsAssociatedWithCommit = action({
  display: {
    label: "Repos List Pull Requests Associated With Commit",
    description: "List pull requests associated with a commit",
  },
  perform: async (
    context,
    { connection, owner, repo, commitSha, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/commits/${commitSha}/pulls`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commitSha: {
      label: "Commit Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the commit",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposGetCommit = action({
  display: {
    label: "Repos Get Commit",
    description: "Get a commit",
  },
  perform: async (context, { connection, owner, repo, ref, page, perPage }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/commits/${ref}`,
      { params: { page, per_page: perPage } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ref parameter",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
  },
});

const checksListForRef = action({
  display: {
    label: "Checks List For Ref",
    description: "List check runs for a Git reference",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      ref,
      checkName,
      status,
      filter,
      perPage,
      page,
      appId,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/commits/${ref}/check-runs`,
      {
        params: {
          check_name: checkName,
          status,
          filter,
          per_page: perPage,
          page,
          app_id: appId,
        },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ref parameter",
    },
    checkName: {
      label: "Check Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Returns check runs with the specified "name"',
    },
    status: {
      label: "Status",
      type: "string",
      required: false,
      model: [
        { label: "Queued", value: "queued" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Returns check runs with the specified "status"',
    },
    filter: {
      label: "Filter",
      type: "string",
      required: false,
      default: "latest",
      model: [
        { label: "Latest", value: "latest" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Filters check runs by their "completed_at" timestamp',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
    appId: {
      label: "App Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const checksListSuitesForRef = action({
  display: {
    label: "Checks List Suites For Ref",
    description: "List check suites for a Git reference",
  },
  perform: async (
    context,
    { connection, owner, repo, ref, appId, checkName, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/commits/${ref}/check-suites`,
      {
        params: {
          app_id: appId,
          check_name: checkName,
          per_page: perPage,
          page,
        },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ref parameter",
    },
    appId: {
      label: "App Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: 'Filters check suites by GitHub App "id"',
    },
    checkName: {
      label: "Check Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Returns check runs with the specified "name"',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposGetCombinedStatusForRef = action({
  display: {
    label: "Repos Get Combined Status For Ref",
    description: "Get the combined status for a specific reference",
  },
  perform: async (context, { connection, owner, repo, ref, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/commits/${ref}/status`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ref parameter",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposListCommitStatusesForRef = action({
  display: {
    label: "Repos List Commit Statuses For Ref",
    description: "List commit statuses for a reference",
  },
  perform: async (context, { connection, owner, repo, ref, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/commits/${ref}/statuses`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ref parameter",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposGetCommunityProfileMetrics = action({
  display: {
    label: "Repos Get Community Profile Metrics",
    description: "Get community profile metrics",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/community/profile`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposCompareCommits = action({
  display: {
    label: "Repos Compare Commits",
    description: "Compare two commits",
  },
  perform: async (
    context,
    { connection, owner, repo, basehead, page, perPage }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/compare/${basehead}`,
      {
        params: { page, per_page: perPage },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    basehead: {
      label: "Basehead",
      type: "string",
      required: true,
      placeholder: "Enter base...head comparison",
      example: "main...feature-branch",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The base branch and head branch to compare in the format 'base...head'.",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
  },
});

const reposGetContent = action({
  display: {
    label: "Repos Get Content",
    description: "Get repository content",
  },
  perform: async (context, { connection, owner, repo, path, ref }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/contents/${path}`,
      {
        params: { ref },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    path: {
      label: "Path",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "path parameter",
    },
    ref: {
      label: "Ref",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the commit/branch/tag",
    },
  },
});

const reposCreateOrUpdateFileContents = action({
  display: {
    label: "Repos Create Or Update File Contents",
    description: "Create or update file contents",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      path,
      message,
      content,
      sha,
      branch,
      committer,
      author,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/contents/${path}`,
      {
        message,
        content,
        sha,
        branch,
        committer,
        author,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    path: {
      label: "Path",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "path parameter",
    },
    message: {
      label: "Message",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The commit message",
    },
    content: {
      label: "Content",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new file content, using Base64 encoding",
    },
    sha: {
      label: "Sha",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "**Required if you are updating a file**",
    },
    branch: {
      label: "Branch",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The branch name",
    },
    committer: {
      label: "Committer",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The person that committed the file",
    },
    author: {
      label: "Author",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The author of the file",
    },
  },
});

const reposDeleteFile = action({
  display: {
    label: "Repos Delete File",
    description: "Delete a file",
  },
  perform: async (
    context,
    { connection, owner, repo, path, message, sha, branch, committer, author }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/contents/${path}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    path: {
      label: "Path",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "path parameter",
    },
    message: {
      label: "Message",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The commit message",
    },
    sha: {
      label: "Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The blob SHA of the file being replaced",
    },
    branch: {
      label: "Branch",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The branch name",
    },
    committer: {
      label: "Committer",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "object containing information about the committer",
    },
    author: {
      label: "Author",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "object containing information about the author",
    },
  },
});

const reposListContributors = action({
  display: {
    label: "Repos List Contributors",
    description: "List repository contributors",
  },
  perform: async (
    context,
    { connection, owner, repo, anon, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/contributors`, {
      params: { anon, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    anon: {
      label: "Anon",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Set to "1" or "true" to include anonymous contributors in results',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const dependabotListRepoSecrets = action({
  display: {
    label: "Dependabot List Repo Secrets",
    description: "List repository secrets",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/dependabot/secrets`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const dependabotGetRepoPublicKey = action({
  display: {
    label: "Dependabot Get Repo Public Key",
    description: "Get a repository public key",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/dependabot/secrets/public-key`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const dependabotGetRepoSecret = action({
  display: {
    label: "Dependabot Get Repo Secret",
    description: "Get a repository secret",
  },
  perform: async (context, { connection, owner, repo, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/dependabot/secrets/${secretName}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const dependabotCreateOrUpdateRepoSecret = action({
  display: {
    label: "Dependabot Create Or Update Repo Secret",
    description: "Create or update a repository secret",
  },
  perform: async (
    context,
    { connection, owner, repo, secretName, encryptedValue, keyId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/dependabot/secrets/${secretName}`,
      { encrypted_value: encryptedValue, key_id: keyId }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
    encryptedValue: {
      label: "Encrypted Value",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Value for your secret, encrypted with [LibSodium](https://libsodium",
    },
    keyId: {
      label: "Key Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ID of the key you used to encrypt the secret",
    },
  },
});

const dependabotDeleteRepoSecret = action({
  display: {
    label: "Dependabot Delete Repo Secret",
    description: "Delete a repository secret",
  },
  perform: async (context, { connection, owner, repo, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/dependabot/secrets/${secretName}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const dependencyGraphDiffRange = action({
  display: {
    label: "Dependency Graph Diff Range",
    description: "Get a diff of the dependencies between commits",
  },
  perform: async (context, { connection, owner, repo, basehead, name }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/dependency-graph/compare/${basehead}`,
      { params: { name } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    basehead: {
      label: "Basehead",
      type: "string",
      required: true,
      placeholder: "Enter base...head comparison",
      example: "main...feature-branch",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The base and head Git revisions to compare in the format 'base...head'.",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      placeholder: "Enter manifest file path",
      example: "package-lock.json",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The full path, relative to the repository root, of the dependency manifest file.",
    },
  },
});

const reposListDeployments = action({
  display: {
    label: "Repos List Deployments",
    description: "List deployments",
  },
  perform: async (
    context,
    { connection, owner, repo, sha, ref, task, environment, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/deployments`, {
      params: { sha, ref, task, environment, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    sha: {
      label: "Sha",
      type: "string",
      required: false,
      default: "none",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA recorded at creation time",
    },
    ref: {
      label: "Ref",
      type: "string",
      required: false,
      default: "none",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the ref",
    },
    task: {
      label: "Task",
      type: "string",
      required: false,
      default: "none",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the task for the deployment (e",
    },
    environment: {
      label: "Environment",
      type: "string",
      required: false,
      default: "none",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the environment that was deployed to (e",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposCreateDeployment = action({
  display: {
    label: "Repos Create Deployment",
    description: "Create a deployment",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      ref,
      task,
      autoMerge,
      requiredContexts,
      payload,
      environment,
      description,
      transientEnvironment,
      productionEnvironment,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/deployments`, {
      ref,
      task,
      auto_merge: autoMerge,
      required_contexts: requiredContexts,
      payload,
      environment,
      description,
      transient_environment: transientEnvironment,
      production_environment: productionEnvironment,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The ref to deploy",
    },
    task: {
      label: "Task",
      type: "string",
      required: false,
      default: "deploy",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Specifies a task to execute (e",
    },
    autoMerge: {
      label: "Auto Merge",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Attempts to automatically merge the default branch into the requested ref, if it"s behind the default branch',
    },
    requiredContexts: {
      label: "Required Contexts",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The [status](https://docs",
    },
    payload: {
      label: "Payload",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
    },
    environment: {
      label: "Environment",
      type: "string",
      required: false,
      default: "production",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Name for the target deployment environment (e",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      default: "",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Short description of the deployment",
    },
    transientEnvironment: {
      label: "Transient Environment",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Specifies if the given environment is specific to the deployment and will no longer exist at some point in the future",
    },
    productionEnvironment: {
      label: "Production Environment",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Specifies if the given environment is one that end-users directly interact with",
    },
  },
});

const reposGetDeployment = action({
  display: {
    label: "Repos Get Deployment",
    description: "Get a deployment",
  },
  perform: async (context, { connection, owner, repo, deploymentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/deployments/${deploymentId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    deploymentId: {
      label: "Deployment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "deployment_id parameter",
    },
  },
});

const reposDeleteDeployment = action({
  display: {
    label: "Repos Delete Deployment",
    description: "Delete a deployment",
  },
  perform: async (context, { connection, owner, repo, deploymentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/deployments/${deploymentId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    deploymentId: {
      label: "Deployment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "deployment_id parameter",
    },
  },
});

const reposListDeploymentStatuses = action({
  display: {
    label: "Repos List Deployment Statuses",
    description: "List deployment statuses",
  },
  perform: async (
    context,
    { connection, owner, repo, deploymentId, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/deployments/${deploymentId}/statuses`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    deploymentId: {
      label: "Deployment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "deployment_id parameter",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposCreateDeploymentStatus = action({
  display: {
    label: "Repos Create Deployment Status",
    description: "Create a deployment status",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      deploymentId,
      state,
      targetUrl,
      logUrl,
      description,
      environment,
      environmentUrl,
      autoInactive,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/deployments/${deploymentId}/statuses`,
      {
        state,
        target_url: targetUrl,
        log_url: logUrl,
        description,
        environment,
        environment_url: environmentUrl,
        auto_inactive: autoInactive,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    deploymentId: {
      label: "Deployment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "deployment_id parameter",
    },
    state: {
      label: "State",
      type: "string",
      required: true,
      model: [
        { label: "Error", value: "error" },
        { label: "Failure", value: "failure" },
        { label: "Inactive", value: "inactive" },
        { label: "In Progress", value: "in_progress" },
        { label: "Queued", value: "queued" },
        { label: "Pending", value: "pending" },
        { label: "Success", value: "success" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state of the status",
    },
    targetUrl: {
      label: "Target Url",
      type: "string",
      required: false,
      default: "",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The target URL to associate with this status",
    },
    logUrl: {
      label: "Log Url",
      type: "string",
      required: false,
      default: "",
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The full URL of the deployment"s output',
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      default: "",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A short description of the status",
    },
    environment: {
      label: "Environment",
      type: "string",
      required: false,
      model: [
        { label: "Production", value: "production" },
        { label: "Staging", value: "staging" },
        { label: "Qa", value: "qa" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Name for the target deployment environment, which can be changed when setting a deploy status",
    },
    environmentUrl: {
      label: "Environment Url",
      type: "string",
      required: false,
      default: "",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Sets the URL for accessing your environment",
    },
    autoInactive: {
      label: "Auto Inactive",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Adds a new "inactive" status to all prior non-transient, non-production environment deployments with the same repository and "environment" name as the created status"s deployment',
    },
  },
});

const reposGetDeploymentStatus = action({
  display: {
    label: "Repos Get Deployment Status",
    description: "Get a deployment status",
  },
  perform: async (
    context,
    { connection, owner, repo, deploymentId, statusId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/deployments/${deploymentId}/statuses/${statusId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    deploymentId: {
      label: "Deployment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "deployment_id parameter",
    },
    statusId: {
      label: "Status Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const reposCreateDispatchEvent = action({
  display: {
    label: "Repos Create Dispatch Event",
    description: "Create a repository dispatch event",
  },
  perform: async (
    context,
    { connection, owner, repo, eventType, clientPayload }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/dispatches`, {
      event_type: eventType,
      client_payload: clientPayload,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    eventType: {
      label: "Event Type",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A custom webhook event name",
    },
    clientPayload: {
      label: "Client Payload",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "JSON payload with extra information about the webhook event that your action or worklow may use",
    },
  },
});

const reposGetAllEnvironments = action({
  display: {
    label: "Repos Get All Environments",
    description: "Get all environments",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/environments`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposGetEnvironment = action({
  display: {
    label: "Repos Get Environment",
    description: "Get an environment",
  },
  perform: async (context, { connection, owner, repo, environmentName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/environments/${environmentName}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    environmentName: {
      label: "Environment Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the environment",
    },
  },
});

const reposCreateOrUpdateEnvironment = action({
  display: {
    label: "Repos Create Or Update Environment",
    description: "Create or update an environment",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      environmentName,
      waitTimer,
      reviewers,
      deploymentBranchPolicy,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/environments/${environmentName}`,
      {
        wait_timer: waitTimer,
        reviewers,
        deployment_branch_policy: deploymentBranchPolicy,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    environmentName: {
      label: "Environment Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the environment",
    },
    waitTimer: {
      label: "Wait Timer",
      type: "string",
      required: false,
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        "The amount of time to delay a job after the job is initially triggered",
    },
    reviewers: {
      label: "Reviewers",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The people or teams that may review jobs that reference the environment",
    },
    deploymentBranchPolicy: {
      label: "Deployment Branch Policy",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of deployment branch policy for this environment",
    },
  },
});

const reposDeleteAnEnvironment = action({
  display: {
    label: "Repos Delete An Environment",
    description: "Delete an environment",
  },
  perform: async (context, { connection, owner, repo, environmentName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/environments/${environmentName}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    environmentName: {
      label: "Environment Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the environment",
    },
  },
});

const activityListRepoEvents = action({
  display: {
    label: "Activity List Repo Events",
    description: "List repository events",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/events`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposListForks = action({
  display: {
    label: "Repos List Forks",
    description: "List forks",
  },
  perform: async (
    context,
    { connection, owner, repo, sort, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/forks`, {
      params: { sort, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "newest",
      model: [
        { label: "Newest", value: "newest" },
        { label: "Oldest", value: "oldest" },
        { label: "Stargazers", value: "stargazers" },
        { label: "Watchers", value: "watchers" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The sort order",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposCreateFork = action({
  display: {
    label: "Repos Create Fork",
    description: "Create a fork",
  },
  perform: async (context, { connection, owner, repo, organization }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/forks`, {
      organization,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    organization: {
      label: "Organization",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Optional parameter to specify the organization name if forking into an organization",
    },
  },
});

const gitCreateBlob = action({
  display: {
    label: "Git Create Blob",
    description: "Create a blob",
  },
  examplePayload: gitCreateBlobExamplePayload,
  perform: async (context, { connection, owner, repo, content, encoding }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/git/blobs`, {
      content,
      encoding,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    content: {
      label: "Content",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The new blob"s content',
    },
    encoding: {
      label: "Encoding",
      type: "string",
      required: false,
      default: "utf-8",
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The encoding used for "content"',
    },
  },
});

const gitGetBlob = action({
  display: {
    label: "Git Get Blob",
    description: "Get a blob",
  },
  perform: async (context, { connection, owner, repo, fileSha }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/git/blobs/${fileSha}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    fileSha: {
      label: "File Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const gitCreateCommit = action({
  display: {
    label: "Git Create Commit",
    description: "Create a commit",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      message,
      tree,
      parents,
      author,
      committer,
      signature,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/git/commits`, {
      message,
      tree,
      parents,
      author,
      committer,
      signature,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    message: {
      label: "Message",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The commit message",
    },
    tree: {
      label: "Tree",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the tree object this commit points to",
    },
    parents: {
      label: "Parents",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHAs of the commits that were the parents of this commit",
    },
    author: {
      label: "Author",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Information about the author of the commit",
    },
    committer: {
      label: "Committer",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Information about the person who is making the commit",
    },
    signature: {
      label: "Signature",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The [PGP signature](https://en",
    },
  },
});

const gitGetCommit = action({
  display: {
    label: "Git Get Commit",
    description: "Get a commit",
  },
  perform: async (context, { connection, owner, repo, commitSha }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/git/commits/${commitSha}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commitSha: {
      label: "Commit Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the commit",
    },
  },
});

const gitListMatchingRefs = action({
  display: {
    label: "Git List Matching Refs",
    description: "List matching references",
  },
  perform: async (context, { connection, owner, repo, ref, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/git/matching-refs/${ref}`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ref parameter",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const gitGetRef = action({
  display: {
    label: "Git Get Ref",
    description: "Get a reference",
  },
  examplePayload: gitGetRefExamplePayload,
  perform: async (context, { connection, owner, repo, ref }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/git/ref/${ref}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ref parameter",
    },
  },
});

const gitCreateRef = action({
  display: {
    label: "Git Create Ref",
    description: "Create a reference",
  },
  examplePayload: gitCreateRefExamplePayload,
  perform: async (context, { connection, owner, repo, ref, sha, key }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/git/refs`, {
      ref,
      sha,
      key,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'The name of the fully qualified reference (ie: "refs/heads/master")',
    },
    sha: {
      label: "Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA1 value for this reference",
    },
    key: {
      label: "Key",
      type: "string",
      required: false,
      example: '"refs/heads/newbranch"',
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const gitUpdateRef = action({
  display: {
    label: "Git Update Ref",
    description: "Update a reference",
  },
  perform: async (context, { connection, owner, repo, ref, sha, force }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/git/refs/${ref}`,
      {
        sha,
        force,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ref parameter",
    },
    sha: {
      label: "Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA1 value to set this reference to",
    },
    force: {
      label: "Force",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether to force the update or to make sure the update is a fast-forward update",
    },
  },
});

const gitDeleteRef = action({
  display: {
    label: "Git Delete Ref",
    description: "Delete a reference",
  },
  perform: async (context, { connection, owner, repo, ref }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/git/refs/${ref}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ref parameter",
    },
  },
});

const gitCreateTag = action({
  display: {
    label: "Git Create Tag",
    description: "Create a tag object",
  },
  perform: async (
    context,
    { connection, owner, repo, tag, message, object, type, tagger }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/git/tags`, {
      tag,
      message,
      object,
      type,
      tagger,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    tag: {
      label: "Tag",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The tag"s name',
    },
    message: {
      label: "Message",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The tag message",
    },
    object: {
      label: "Object",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the git object this is tagging",
    },
    type: {
      label: "Type",
      type: "string",
      required: true,
      model: [
        { label: "Commit", value: "commit" },
        { label: "Tree", value: "tree" },
        { label: "Blob", value: "blob" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The type of the object we"re tagging',
    },
    tagger: {
      label: "Tagger",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "An object with information about the individual creating the tag",
    },
  },
});

const gitGetTag = action({
  display: {
    label: "Git Get Tag",
    description: "Get a tag",
  },
  perform: async (context, { connection, owner, repo, tagSha }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/git/tags/${tagSha}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    tagSha: {
      label: "Tag Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const gitCreateTree = action({
  display: {
    label: "Git Create Tree",
    description: "Create a tree",
  },
  examplePayload: gitCreateTreeExamplePayload,
  perform: async (context, { connection, owner, repo, tree, baseTree }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/git/trees`, {
      tree,
      base_tree: baseTree,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    owner,
    repo,
    tree: {
      label: "Tree",
      type: "code",
      language: "json",
      required: true,
      comments:
        'Objects (of "path", "mode", "type", and "content" or "sha") specifying a tree structure. See https://docs.github.com/en/rest/git/trees#create-a-tree',
      default: JSON.stringify(
        [{ path: "test.txt", mode: "100644", content: "This is a test" }],
        null,
        2
      ),
      clean: util.types.toObject,
    },
    baseTree: {
      label: "Base Tree",
      type: "string",
      required: false,
      example: "9fb037999f264ba9a7fc6274d15fa3ae2ab98312",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The SHA1 of an existing Git tree object which will be used as the base for the new tree",
    },
  },
});

const gitGetTree = action({
  display: {
    label: "Git Get Tree",
    description: "Get a tree",
  },
  perform: async (context, { connection, owner, repo, treeSha, recursive }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/git/trees/${treeSha}`,
      {
        params: { recursive },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    treeSha: {
      label: "Tree Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
    recursive: {
      label: "Recursive",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Setting this parameter to any value returns the objects or subtrees referenced by the tree specified in ":tree_sha"',
    },
  },
});

const migrationsGetImportStatus = action({
  display: {
    label: "Migrations Get Import Status",
    description: "Get an import status",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/import`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const migrationsStartImport = action({
  display: {
    label: "Migrations Start Import",
    description: "Start an import",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      vcsUrl,
      vcs,
      vcsUsername,
      vcsPassword,
      tfvcProject,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/repos/${owner}/${repo}/import`, {
      vcs_url: vcsUrl,
      vcs,
      vcs_username: vcsUsername,
      vcs_password: vcsPassword,
      tfvc_project: tfvcProject,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    vcsUrl: {
      label: "Vcs Url",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The URL of the originating repository",
    },
    vcs: {
      label: "Vcs",
      type: "string",
      required: false,
      model: [
        { label: "Subversion", value: "subversion" },
        { label: "Git", value: "git" },
        { label: "Mercurial", value: "mercurial" },
        { label: "Tfvc", value: "tfvc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The originating VCS type",
    },
    vcsUsername: {
      label: "Vcs Username",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'If authentication is required, the username to provide to "vcs_url"',
    },
    vcsPassword: {
      label: "Vcs Password",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'If authentication is required, the password to provide to "vcs_url"',
    },
    tfvcProject: {
      label: "Tfvc Project",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "For a tfvc import, the name of the project that is being imported",
    },
  },
});

const migrationsUpdateImport = action({
  display: {
    label: "Migrations Update Import",
    description: "Update an import",
  },
  perform: async (
    context,
    { connection, owner, repo, vcsUsername, vcsPassword, vcs, tfvcProject }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/repos/${owner}/${repo}/import`, {
      vcs_username: vcsUsername,
      vcs_password: vcsPassword,
      vcs,
      tfvc_project: tfvcProject,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    vcsUsername: {
      label: "Vcs Username",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The username to provide to the originating repository",
    },
    vcsPassword: {
      label: "Vcs Password",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The password to provide to the originating repository",
    },
    vcs: {
      label: "Vcs",
      type: "string",
      required: false,
      model: [
        { label: "Subversion", value: "subversion" },
        { label: "Tfvc", value: "tfvc" },
        { label: "Git", value: "git" },
        { label: "Mercurial", value: "mercurial" },
      ],
      example: '"git"',
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of version control system you are migrating from",
    },
    tfvcProject: {
      label: "Tfvc Project",
      type: "string",
      required: false,
      example: '"project1"',
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "For a tfvc import, the name of the project that is being imported",
    },
  },
});

const migrationsCancelImport = action({
  display: {
    label: "Migrations Cancel Import",
    description: "Cancel an import",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/repos/${owner}/${repo}/import`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const migrationsGetCommitAuthors = action({
  display: {
    label: "Migrations Get Commit Authors",
    description: "Get commit authors",
  },
  perform: async (context, { connection, owner, repo, since }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/import/authors`,
      { params: { since } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "A user ID",
    },
  },
});

const migrationsMapCommitAuthor = action({
  display: {
    label: "Migrations Map Commit Author",
    description: "Map a commit author",
  },
  perform: async (
    context,
    { connection, owner, repo, authorId, email, name }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/import/authors/${authorId}`,
      { email, name }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    authorId: {
      label: "Author Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
    email: {
      label: "Email",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new Git author email",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new Git author name",
    },
  },
});

const migrationsGetLargeFiles = action({
  display: {
    label: "Migrations Get Large Files",
    description: "Get large files",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/import/large_files`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const migrationsSetLfsPreference = action({
  display: {
    label: "Migrations Set Lfs Preference",
    description: "Update Git LFS preference",
  },
  perform: async (context, { connection, owner, repo, useLfs }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/repos/${owner}/${repo}/import/lfs`, {
      use_lfs: useLfs,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    useLfs: {
      label: "Use Lfs",
      type: "string",
      required: true,
      model: [
        { label: "Opt In", value: "opt_in" },
        { label: "Opt Out", value: "opt_out" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Whether to store large files during the import",
    },
  },
});

const appsGetRepoInstallation = action({
  display: {
    label: "Apps Get Repo Installation",
    description: "Get a repository installation for the authenticated app",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/installation`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const interactionsGetRestrictionsForRepo = action({
  display: {
    label: "Interactions Get Restrictions For Repo",
    description: "Get interaction restrictions for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/interaction-limits`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const interactionsSetRestrictionsForRepo = action({
  display: {
    label: "Interactions Set Restrictions For Repo",
    description: "Set interaction restrictions for a repository",
  },
  perform: async (context, { connection, owner, repo, limit, expiry }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/interaction-limits`,
      {
        limit,
        expiry,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    limit: {
      label: "Limit",
      type: "string",
      required: true,
      model: [
        { label: "Existing Users", value: "existing_users" },
        { label: "Contributors Only", value: "contributors_only" },
        { label: "Collaborators Only", value: "collaborators_only" },
      ],
      example: "collaborators_only",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect",
    },
    expiry: {
      label: "Expiry",
      type: "string",
      required: false,
      model: [
        { label: "One Day", value: "one_day" },
        { label: "Three Days", value: "three_days" },
        { label: "One Week", value: "one_week" },
        { label: "One Month", value: "one_month" },
        { label: "Six Months", value: "six_months" },
      ],
      example: "one_month",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The duration of the interaction restriction",
    },
  },
});

const interactionsRemoveRestrictionsForRepo = action({
  display: {
    label: "Interactions Remove Restrictions For Repo",
    description: "Remove interaction restrictions for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/interaction-limits`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposListInvitations = action({
  display: {
    label: "Repos List Invitations",
    description: "List repository invitations",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/invitations`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposUpdateInvitation = action({
  display: {
    label: "Repos Update Invitation",
    description: "Update a repository invitation",
  },
  perform: async (
    context,
    { connection, owner, repo, invitationId, permissions }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/invitations/${invitationId}`,
      { permissions }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    invitationId: {
      label: "Invitation Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the invitation",
    },
    permissions: {
      label: "Permissions",
      type: "string",
      required: false,
      model: [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
        { label: "Maintain", value: "maintain" },
        { label: "Triage", value: "triage" },
        { label: "Admin", value: "admin" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The permissions that the associated user will have on the repository",
    },
  },
});

const reposDeleteInvitation = action({
  display: {
    label: "Repos Delete Invitation",
    description: "Delete a repository invitation",
  },
  perform: async (context, { connection, owner, repo, invitationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/invitations/${invitationId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    invitationId: {
      label: "Invitation Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the invitation",
    },
  },
});

const issuesListForRepo = action({
  display: {
    label: "Issues List For Repo",
    description: "List repository issues",
  },
  examplePayload: issuesListForRepoExamplePayload,
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      milestone,
      state,
      assignee,
      creator,
      mentioned,
      labels,
      sort,
      direction,
      since,
      perPage,
      page,
      fetchAll,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const data = await paginateResults<Issue>(
      client,
      `/repos/${owner}/${repo}/issues`,
      fetchAll,
      {
        milestone,
        state,
        assignee,
        creator,
        mentioned,
        labels,
        sort,
        direction,
        since,
        perPage,
        page,
      }
    );
    return { data };
  },
  inputs: {
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
      "created"
    ),
    direction,
    since,
    perPage,
    page,
  },
});

const issuesCreate = action({
  display: {
    label: "Issues Create",
    description: "Create an issue",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      title,
      body,
      assignee,
      milestone,
      labels,
      assignees,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/issues`, {
      title,
      body,
      assignee,
      milestone,
      labels,
      assignees,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    title: {
      label: "Title",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The title of the issue",
    },
    body: {
      label: "Body",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The contents of the issue",
    },
    assignee: {
      label: "Assignee",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Login for the user that this issue should be assigned to",
    },
    milestone: {
      label: "Milestone",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
    },
    labels: {
      label: "Labels",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Labels to associate with this issue",
    },
    assignees: {
      label: "Assignees",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Logins for Users to assign to this issue",
    },
  },
});

const issuesListCommentsForRepo = action({
  display: {
    label: "Issues List Comments For Repo",
    description: "List issue comments for a repository",
  },
  perform: async (
    context,
    { connection, owner, repo, sort, direction, since, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/comments`,
      { params: { sort, direction, since, per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "created",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The property to sort the results by",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Either "asc" or "desc"',
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated after the given time",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const issuesGetComment = action({
  display: {
    label: "Issues Get Comment",
    description: "Get an issue comment",
  },
  perform: async (context, { connection, owner, repo, commentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/comments/${commentId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
  },
});

const issuesUpdateComment = action({
  display: {
    label: "Issues Update Comment",
    description: "Update an issue comment",
  },
  perform: async (context, { connection, owner, repo, commentId, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/issues/comments/${commentId}`,
      { body }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The contents of the comment",
    },
  },
});

const issuesDeleteComment = action({
  display: {
    label: "Issues Delete Comment",
    description: "Delete an issue comment",
  },
  perform: async (context, { connection, owner, repo, commentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/issues/comments/${commentId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
  },
});

const reactionsListForIssueComment = action({
  display: {
    label: "Reactions List For Issue Comment",
    description: "List reactions for an issue comment",
  },
  perform: async (
    context,
    { connection, owner, repo, commentId, content, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`,
      { params: { content, per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
    content: {
      label: "Content",
      type: "string",
      required: false,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns a single [reaction type](https://docs",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reactionsCreateForIssueComment = action({
  display: {
    label: "Reactions Create For Issue Comment",
    description: "Create reaction for an issue comment",
  },
  perform: async (context, { connection, owner, repo, commentId, content }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`,
      { content }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
    content: {
      label: "Content",
      type: "string",
      required: true,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The [reaction type](https://docs",
    },
  },
});

const reactionsDeleteForIssueComment = action({
  display: {
    label: "Reactions Delete For Issue Comment",
    description: "Delete an issue comment reaction",
  },
  perform: async (
    context,
    { connection, owner, repo, commentId, reactionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/issues/comments/${commentId}/reactions/${reactionId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
    reactionId: {
      label: "Reaction Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the reaction",
    },
  },
});

const issuesListEventsForRepo = action({
  display: {
    label: "Issues List Events For Repo",
    description: "List issue events for a repository",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/issues/events`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const issuesGetEvent = action({
  display: {
    label: "Issues Get Event",
    description: "Get an issue event",
  },
  perform: async (context, { connection, owner, repo, eventId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/events/${eventId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    eventId: {
      label: "Event Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const issuesGet = action({
  display: {
    label: "Issues Get",
    description: "Get an issue",
  },
  perform: async (context, { connection, owner, repo, issueNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/${issueNumber}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
  },
});

const issuesUpdate = action({
  display: {
    label: "Issues Update",
    description: "Update an issue",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      issueNumber,
      title,
      body,
      assignee,
      state,
      milestone,
      labels,
      assignees,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/issues/${issueNumber}`,
      {
        title,
        body,
        assignee,
        state,
        milestone,
        labels,
        assignees,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    title: {
      label: "Title",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The title of the issue",
    },
    body: {
      label: "Body",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The contents of the issue",
    },
    assignee: {
      label: "Assignee",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Login for the user that this issue should be assigned to",
    },
    state: {
      label: "State",
      type: "string",
      required: false,
      model: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "State of the issue",
    },
    milestone: {
      label: "Milestone",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
    },
    labels: {
      label: "Labels",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Labels to associate with this issue",
    },
    assignees: {
      label: "Assignees",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Logins for Users to assign to this issue",
    },
  },
});

const issuesAddAssignees = action({
  display: {
    label: "Issues Add Assignees",
    description: "Add assignees to an issue",
  },
  perform: async (
    context,
    { connection, owner, repo, issueNumber, assignees }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/issues/${issueNumber}/assignees`,
      { assignees }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    assignees: {
      label: "Assignees",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Usernames of people to assign this issue to",
    },
  },
});

const issuesRemoveAssignees = action({
  display: {
    label: "Issues Remove Assignees",
    description: "Remove assignees from an issue",
  },
  perform: async (
    context,
    { connection, owner, repo, issueNumber, assignees }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/issues/${issueNumber}/assignees`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    assignees: {
      label: "Assignees",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Usernames of assignees to remove from an issue",
    },
  },
});

const issuesListComments = action({
  display: {
    label: "Issues List Comments",
    description: "List issue comments",
  },
  examplePayload: issuesListCommentsExamplePayload,
  perform: async (
    context,
    { connection, owner, repo, issueNumber, since, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
      { params: { since, per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    owner,
    repo,
    issueNumber,
    since,
    perPage,
    page,
  },
});

const issuesCreateComment = action({
  display: {
    label: "Issues Create Comment",
    description: "Create an issue comment",
  },
  examplePayload: issuesCreateCommentExamplePayload,
  perform: async (context, { connection, owner, repo, issueNumber, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
      { body }
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The contents of the comment",
    },
  },
});

const issuesListEvents = action({
  display: {
    label: "Issues List Events",
    description: "List issue events",
  },
  perform: async (
    context,
    { connection, owner, repo, issueNumber, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/${issueNumber}/events`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber,
    perPage,
    page,
  },
});

const issuesListLabelsOnIssue = action({
  display: {
    label: "Issues List Labels On Issue",
    description: "List labels for an issue",
  },
  perform: async (
    context,
    { connection, owner, repo, issueNumber, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const issuesAddLabels = action({
  display: {
    label: "Issues Add Labels",
    description: "Add labels to an issue",
  },
  perform: async (context, { connection, owner, repo, issueNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
  },
});

const issuesSetLabels = action({
  display: {
    label: "Issues Set Labels",
    description: "Set labels for an issue",
  },
  perform: async (context, { connection, owner, repo, issueNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
  },
});

const issuesRemoveAllLabels = action({
  display: {
    label: "Issues Remove All Labels",
    description: "Remove all labels from an issue",
  },
  perform: async (context, { connection, owner, repo, issueNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/issues/${issueNumber}/labels`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
  },
});

const issuesRemoveLabel = action({
  display: {
    label: "Issues Remove Label",
    description: "Remove a label from an issue",
  },
  perform: async (context, { connection, owner, repo, issueNumber, name }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/issues/${issueNumber}/labels/${name}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const issuesLock = action({
  display: {
    label: "Issues Lock",
    description: "Lock an issue",
  },
  perform: async (
    context,
    { connection, owner, repo, issueNumber, lockReason }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/issues/${issueNumber}/lock`,
      {
        lock_reason: lockReason,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    lockReason: {
      label: "Lock Reason",
      type: "string",
      required: false,
      model: [
        { label: "Off Topic", value: "off-topic" },
        { label: "Too Heated", value: "too heated" },
        { label: "Resolved", value: "resolved" },
        { label: "Spam", value: "spam" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The reason for locking the issue or pull request conversation",
    },
  },
});

const issuesUnlock = action({
  display: {
    label: "Issues Unlock",
    description: "Unlock an issue",
  },
  perform: async (context, { connection, owner, repo, issueNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/issues/${issueNumber}/lock`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
  },
});

const reactionsListForIssue = action({
  display: {
    label: "Reactions List For Issue",
    description: "List reactions for an issue",
  },
  perform: async (
    context,
    { connection, owner, repo, issueNumber, content, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/${issueNumber}/reactions`,
      { params: { content, per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    content: {
      label: "Content",
      type: "string",
      required: false,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns a single [reaction type](https://docs",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reactionsCreateForIssue = action({
  display: {
    label: "Reactions Create For Issue",
    description: "Create reaction for an issue",
  },
  perform: async (
    context,
    { connection, owner, repo, issueNumber, content }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/issues/${issueNumber}/reactions`,
      { content }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    content: {
      label: "Content",
      type: "string",
      required: true,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The [reaction type](https://docs",
    },
  },
});

const reactionsDeleteForIssue = action({
  display: {
    label: "Reactions Delete For Issue",
    description: "Delete an issue reaction",
  },
  perform: async (
    context,
    { connection, owner, repo, issueNumber, reactionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/issues/${issueNumber}/reactions/${reactionId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    reactionId: {
      label: "Reaction Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the reaction",
    },
  },
});

const issuesListEventsForTimeline = action({
  display: {
    label: "Issues List Events For Timeline",
    description: "List timeline events for an issue",
  },
  perform: async (
    context,
    { connection, owner, repo, issueNumber, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/issues/${issueNumber}/timeline`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    issueNumber: {
      label: "Issue Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the issue",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposListDeployKeys = action({
  display: {
    label: "Repos List Deploy Keys",
    description: "List deploy keys",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/keys`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposCreateDeployKey = action({
  display: {
    label: "Repos Create Deploy Key",
    description: "Create a deploy key",
  },
  perform: async (
    context,
    { connection, owner, repo, title, key, readOnly }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/keys`, {
      title,
      key,
      read_only: readOnly,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    title: {
      label: "Title",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A name for the key",
    },
    key: {
      label: "Key",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The contents of the key",
    },
    readOnly: {
      label: "Read Only",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If "true", the key will only be able to read repository contents',
    },
  },
});

const reposGetDeployKey = action({
  display: {
    label: "Repos Get Deploy Key",
    description: "Get a deploy key",
  },
  perform: async (context, { connection, owner, repo, keyId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/keys/${keyId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    keyId: {
      label: "Key Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the key",
    },
  },
});

const reposDeleteDeployKey = action({
  display: {
    label: "Repos Delete Deploy Key",
    description: "Delete a deploy key",
  },
  perform: async (context, { connection, owner, repo, keyId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/keys/${keyId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    keyId: {
      label: "Key Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the key",
    },
  },
});

const issuesListLabelsForRepo = action({
  display: {
    label: "Issues List Labels For Repo",
    description: "List labels for a repository",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/labels`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const issuesCreateLabel = action({
  display: {
    label: "Issues Create Label",
    description: "Create a label",
  },
  perform: async (
    context,
    { connection, owner, repo, name, color, description }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/labels`, {
      name,
      color,
      description,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the label",
    },
    color: {
      label: "Color",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The [hexadecimal color code](http://www",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A short description of the label",
    },
  },
});

const issuesGetLabel = action({
  display: {
    label: "Issues Get Label",
    description: "Get a label",
  },
  perform: async (context, { connection, owner, repo, name }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/labels/${name}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const issuesUpdateLabel = action({
  display: {
    label: "Issues Update Label",
    description: "Update a label",
  },
  perform: async (
    context,
    { connection, owner, repo, name, newName, color, description }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/labels/${name}`,
      {
        new_name: newName,
        color,
        description,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
    newName: {
      label: "New Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new name of the label",
    },
    color: {
      label: "Color",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The [hexadecimal color code](http://www",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A short description of the label",
    },
  },
});

const issuesDeleteLabel = action({
  display: {
    label: "Issues Delete Label",
    description: "Delete a label",
  },
  perform: async (context, { connection, owner, repo, name }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/labels/${name}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const reposListLanguages = action({
  display: {
    label: "Repos List Languages",
    description: "List repository languages",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/languages`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposEnableLfsForRepo = action({
  display: {
    label: "Repos Enable Lfs For Repo",
    description: "Enable Git LFS for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/repos/${owner}/${repo}/lfs`, {});
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposDisableLfsForRepo = action({
  display: {
    label: "Repos Disable Lfs For Repo",
    description: "Disable Git LFS for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/repos/${owner}/${repo}/lfs`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const licensesGetForRepo = action({
  display: {
    label: "Licenses Get For Repo",
    description: "Get the license for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/license`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposMergeUpstream = action({
  display: {
    label: "Repos Merge Upstream",
    description: "Sync a fork branch with the upstream repository",
  },
  perform: async (context, { connection, owner, repo, branch }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/merge-upstream`,
      { branch }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    branch: {
      label: "Branch",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The name of the branch which should be updated to match upstream",
    },
  },
});

const reposMerge = action({
  display: {
    label: "Repos Merge",
    description: "Merge a branch",
  },
  perform: async (
    context,
    { connection, owner, repo, base, head, commitMessage }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/merges`, {
      base,
      head,
      commit_message: commitMessage,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    base: {
      label: "Base",
      type: "string",
      required: true,
      placeholder: "Enter base branch",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The name of the base branch that the head will be merged into.",
    },
    head: {
      label: "Head",
      type: "string",
      required: true,
      placeholder: "Enter head branch",
      example: "feature-branch",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The head branch to merge into the base branch.",
    },
    commitMessage: {
      label: "Commit Message",
      type: "string",
      required: false,
      placeholder: "Enter commit message",
      example: "Merge feature-branch into main",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The commit message to use for the merge commit.",
    },
  },
});

const issuesListMilestones = action({
  display: {
    label: "Issues List Milestones",
    description: "List milestones",
  },
  perform: async (
    context,
    { connection, owner, repo, state, sort, direction, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/milestones`, {
      params: { state, sort, direction, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    state: {
      label: "State",
      type: "string",
      required: false,
      default: "open",
      model: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state of the milestone",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "due_on",
      model: [
        { label: "Due On", value: "due_on" },
        { label: "Completeness", value: "completeness" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "What to sort results by",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      default: "asc",
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The direction of the sort",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const issuesCreateMilestone = action({
  display: {
    label: "Issues Create Milestone",
    description: "Create a milestone",
  },
  perform: async (
    context,
    { connection, owner, repo, title, state, description, dueOn }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/milestones`, {
      title,
      state,
      description,
      due_on: dueOn,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    title: {
      label: "Title",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The title of the milestone",
    },
    state: {
      label: "State",
      type: "string",
      required: false,
      default: "open",
      model: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state of the milestone",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A description of the milestone",
    },
    dueOn: {
      label: "Due On",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The milestone due date",
    },
  },
});

const issuesGetMilestone = action({
  display: {
    label: "Issues Get Milestone",
    description: "Get a milestone",
  },
  perform: async (context, { connection, owner, repo, milestoneNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/milestones/${milestoneNumber}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    milestoneNumber: {
      label: "Milestone Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the milestone",
    },
  },
});

const issuesUpdateMilestone = action({
  display: {
    label: "Issues Update Milestone",
    description: "Update a milestone",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      milestoneNumber,
      title,
      state,
      description,
      dueOn,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/milestones/${milestoneNumber}`,
      { title, state, description, due_on: dueOn }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    milestoneNumber: {
      label: "Milestone Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the milestone",
    },
    title: {
      label: "Title",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The title of the milestone",
    },
    state: {
      label: "State",
      type: "string",
      required: false,
      default: "open",
      model: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state of the milestone",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A description of the milestone",
    },
    dueOn: {
      label: "Due On",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The milestone due date",
    },
  },
});

const issuesDeleteMilestone = action({
  display: {
    label: "Issues Delete Milestone",
    description: "Delete a milestone",
  },
  perform: async (context, { connection, owner, repo, milestoneNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/milestones/${milestoneNumber}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    milestoneNumber: {
      label: "Milestone Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the milestone",
    },
  },
});

const issuesListLabelsForMilestone = action({
  display: {
    label: "Issues List Labels For Milestone",
    description: "List labels for issues in a milestone",
  },
  perform: async (
    context,
    { connection, owner, repo, milestoneNumber, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/milestones/${milestoneNumber}/labels`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    milestoneNumber: {
      label: "Milestone Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the milestone",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const activityListRepoNotificationsForAuthenticatedUser = action({
  display: {
    label: "Activity List Repo Notifications For Authenticated User",
    description: "List repository notifications for the authenticated user",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      all,
      participating,
      since,
      before,
      perPage,
      page,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/notifications`, {
      params: { all, participating, since, before, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    all: {
      label: "All",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: 'If "true", show notifications marked as read',
    },
    participating: {
      label: "Participating",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If "true", only shows notifications in which the user is directly participating or mentioned',
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated after the given time",
    },
    before: {
      label: "Before",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated before the given time",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const activityMarkRepoNotificationsAsRead = action({
  display: {
    label: "Activity Mark Repo Notifications As Read",
    description: "Mark repository notifications as read",
  },
  perform: async (context, { connection, owner, repo, lastReadAt }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/repos/${owner}/${repo}/notifications`, {
      last_read_at: lastReadAt,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    lastReadAt: {
      label: "Last Read At",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Describes the last point that notifications were checked",
    },
  },
});

const reposGetPages = action({
  display: {
    label: "Repos Get Pages",
    description: "Get a GitHub Pages site",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/pages`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposCreatePagesSite = action({
  display: {
    label: "Repos Create Pages Site",
    description: "Create a GitHub Pages site",
  },
  perform: async (context, { connection, owner, repo, source }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/pages`, {
      source,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    source: {
      label: "Source",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The source branch and directory used to publish your Pages site",
    },
  },
});

const reposUpdateInformationAboutPagesSite = action({
  display: {
    label: "Repos Update Information About Pages Site",
    description: "Update information about a GitHub Pages site",
  },
  perform: async (
    context,
    { connection, owner, repo, cname, httpsEnforced, isPublic, source }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/repos/${owner}/${repo}/pages`, {
      cname,
      https_enforced: httpsEnforced,
      public: isPublic,
      source,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    cname: {
      label: "Cname",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Specify a custom domain for the repository",
    },
    httpsEnforced: {
      label: "Https Enforced",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Specify whether HTTPS should be enforced for the repository",
    },
    isPublic: {
      label: "Public",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Configures access controls for the GitHub Pages site",
    },
    source: {
      label: "Source",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const reposDeletePagesSite = action({
  display: {
    label: "Repos Delete Pages Site",
    description: "Delete a GitHub Pages site",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/repos/${owner}/${repo}/pages`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposListPagesBuilds = action({
  display: {
    label: "Repos List Pages Builds",
    description: "List GitHub Pages builds",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/pages/builds`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reposRequestPagesBuild = action({
  display: {
    label: "Repos Request Pages Build",
    description: "Request a GitHub Pages build",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/pages/builds`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposGetLatestPagesBuild = action({
  display: {
    label: "Repos Get Latest Pages Build",
    description: "Get latest Pages build",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pages/builds/latest`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposGetPagesBuild = action({
  display: {
    label: "Repos Get Pages Build",
    description: "Get GitHub Pages build",
  },
  perform: async (context, { connection, owner, repo, buildId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pages/builds/${buildId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    buildId: {
      label: "Build Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const reposGetPagesHealthCheck = action({
  display: {
    label: "Repos Get Pages Health Check",
    description: "Get a DNS health check for GitHub Pages",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/pages/health`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const projectsListForRepo = action({
  display: {
    label: "Projects List For Repo",
    description: "List repository projects",
  },
  perform: async (
    context,
    { connection, owner, repo, state, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/projects`, {
      params: { state, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    state: {
      label: "State",
      type: "string",
      required: false,
      default: "open",
      model: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Indicates the state of the projects to return",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const projectsCreateForRepo = action({
  display: {
    label: "Projects Create For Repo",
    description: "Create a repository project",
  },
  perform: async (context, { connection, owner, repo, name, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/projects`, {
      name,
      body,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the project",
    },
    body: {
      label: "Body",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The description of the project",
    },
  },
});

const pullsList = action({
  display: {
    label: "Pulls List",
    description: "List pull requests",
  },
  examplePayload: pullsListExamplePayload,
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      state,
      head,
      base,
      sort,
      direction,
      perPage,
      page,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/pulls`, {
      params: { state, head, base, sort, direction, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    owner,
    repo,
    state: {
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
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filters pull requests by their state (open, closed, or all).",
    },
    head: {
      label: "Head",
      type: "string",
      required: false,
      placeholder: "Enter head reference",
      example: "octocat:new-feature",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Filter pull requests by head user or organization and branch name in the format "user:ref-name" or "organization:ref-name".',
    },
    base: {
      label: "Base",
      type: "string",
      required: false,
      placeholder: "Enter base branch",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filter pull requests by base branch name.",
    },
    sort: {
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
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The field to sort results by.",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      placeholder: "Select direction",
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The direction to sort results (ascending or descending).",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const pullsCreate = action({
  display: {
    label: "Pulls Create",
    description: "Create a pull request",
  },
  examplePayload: pullsCreateExamplePayload,
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      title,
      head,
      base,
      body,
      maintainerCanModify,
      draft,
      issue,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/pulls`, {
      title,
      head,
      base,
      body,
      maintainer_can_modify: maintainerCanModify,
      draft,
      issue,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    owner,
    repo,
    title: {
      label: "Title",
      type: "string",
      required: false,
      placeholder: "Enter pull request title",
      example: "Fix bug in authentication flow",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The title of the pull request. Required unless using the issue parameter.",
    },
    head: {
      label: "Head",
      type: "string",
      required: true,
      placeholder: "Enter head branch",
      example: "feature-branch",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The name of the branch where your changes are implemented. For cross-repository pull requests, use the format 'username:branch'.",
    },
    base: {
      label: "Base",
      type: "string",
      required: true,
      placeholder: "Enter base branch",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The name of the branch you want the changes pulled into. This should be an existing branch in the repository.",
    },
    body: {
      label: "Body",
      type: "text",
      required: false,
      placeholder: "Enter pull request description",
      example:
        "This PR fixes the authentication bug by updating the token validation logic.\n\nFixes #123",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The contents/description of the pull request. Supports markdown formatting.",
    },
    maintainerCanModify: {
      label: "Maintainer Can Modify",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "When true, maintainers can modify the pull request. See [GitHub's documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) for details.",
    },
    draft: {
      label: "Draft",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "When true, creates the pull request as a draft. Draft pull requests cannot be merged until marked as ready for review.",
    },
    issueNumber,
  },
});

const pullsListReviewCommentsForRepo = action({
  display: {
    label: "Pulls List Review Comments For Repo",
    description: "List review comments in a repository",
  },
  perform: async (
    context,
    { connection, owner, repo, sort, direction, since, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/comments`,
      { params: { sort, direction, since, per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      placeholder: "Select sort field",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
        { label: "Created At", value: "created_at" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The field to sort results by.",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      placeholder: "Select direction",
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The direction to sort results (ascending or descending).",
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      placeholder: "Enter timestamp (ISO 8601 format)",
      example: "2024-01-15T10:30:00Z",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Only show comments updated after the given timestamp in ISO 8601 format.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const pullsGetReviewComment = action({
  display: {
    label: "Pulls Get Review Comment",
    description: "Get a review comment for a pull request",
  },
  perform: async (context, { connection, owner, repo, commentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/comments/${commentId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment ID",
      type: "string",
      required: true,
      placeholder: "Enter comment ID",
      example: "123456789",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the review comment.",
    },
  },
});

const pullsUpdateReviewComment = action({
  display: {
    label: "Pulls Update Review Comment",
    description: "Update a review comment for a pull request",
  },
  perform: async (context, { connection, owner, repo, commentId, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/pulls/comments/${commentId}`,
      { body }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment ID",
      type: "string",
      required: true,
      placeholder: "Enter comment ID",
      example: "123456789",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the review comment.",
    },
    body: {
      label: "Body",
      type: "text",
      required: true,
      placeholder: "Enter comment text",
      example: "This suggestion looks good. Let's merge this change.",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The updated text of the review comment.",
    },
  },
});

const pullsDeleteReviewComment = action({
  display: {
    label: "Pulls Delete Review Comment",
    description: "Delete a review comment for a pull request",
  },
  perform: async (context, { connection, owner, repo, commentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/pulls/comments/${commentId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment ID",
      type: "string",
      required: true,
      placeholder: "Enter comment ID",
      example: "123456789",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the review comment to delete.",
    },
  },
});

const reactionsListForPullRequestReviewComment = action({
  display: {
    label: "Reactions List For Pull Request Review Comment",
    description: "List reactions for a pull request review comment",
  },
  perform: async (
    context,
    { connection, owner, repo, commentId, content, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions`,
      { params: { content, per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment ID",
      type: "string",
      required: true,
      placeholder: "Enter comment ID",
      example: "123456789",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment.",
    },
    content: {
      label: "Content",
      type: "string",
      required: false,
      placeholder: "Select reaction type",
      model: [
        { label: "+1", value: "+1" },
        { label: "-1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filter to a specific reaction type.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const reactionsCreateForPullRequestReviewComment = action({
  display: {
    label: "Reactions Create For Pull Request Review Comment",
    description: "Create reaction for a pull request review comment",
  },
  perform: async (context, { connection, owner, repo, commentId, content }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions`,
      { content }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment ID",
      type: "string",
      required: true,
      placeholder: "Enter comment ID",
      example: "123456789",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment.",
    },
    content: {
      label: "Content",
      type: "string",
      required: true,
      placeholder: "Select reaction type",
      model: [
        { label: "+1", value: "+1" },
        { label: "-1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The reaction type to add to the comment.",
    },
  },
});

const reactionsDeleteForPullRequestComment = action({
  display: {
    label: "Reactions Delete For Pull Request Comment",
    description: "Delete a pull request comment reaction",
  },
  perform: async (
    context,
    { connection, owner, repo, commentId, reactionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions/${reactionId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    commentId: {
      label: "Comment ID",
      type: "string",
      required: true,
      placeholder: "Enter comment ID",
      example: "123456789",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment.",
    },
    reactionId: {
      label: "Reaction ID",
      type: "string",
      required: true,
      placeholder: "Enter reaction ID",
      example: "987654321",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the reaction.",
    },
  },
});

const pullsGet = action({
  display: {
    label: "Pulls Get",
    description: "Get a pull request",
  },
  perform: async (context, { connection, owner, repo, pullNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/${pullNumber}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
  },
});

const pullsUpdate = action({
  display: {
    label: "Pulls Update",
    description: "Update a pull request",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      pullNumber,
      title,
      body,
      state,
      base,
      maintainerCanModify,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/pulls/${pullNumber}`,
      {
        title,
        body,
        state,
        base,
        maintainer_can_modify: maintainerCanModify,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    title: {
      label: "Title",
      type: "string",
      required: false,
      placeholder: "Enter pull request title",
      example: "Fix bug in authentication",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The title of the pull request.",
    },
    body: {
      label: "Body",
      type: "text",
      required: false,
      placeholder: "Enter pull request description",
      example:
        "This PR fixes the authentication bug by updating the token validation logic.",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The contents of the pull request.",
    },
    state: {
      label: "State",
      type: "string",
      required: false,
      placeholder: "Select state",
      model: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state of the pull request.",
    },
    base: {
      label: "Base",
      type: "string",
      required: false,
      placeholder: "Enter base branch",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the branch you want your changes pulled into.",
    },
    maintainerCanModify: {
      label: "Maintainer Can Modify",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "When true, allows maintainers to edit the pull request.",
    },
  },
});

const codespacesCreateWithPrForAuthenticatedUser = action({
  display: {
    label: "Codespaces Create With Pr For Authenticated User",
    description: "Create a codespace from a pull request",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      pullNumber,
      location,
      clientIp,
      machine,
      devcontainerPath,
      multiRepoPermissionsOptOut,
      workingDirectory,
      idleTimeoutMinutes,
      displayName,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/codespaces`,
      {
        location,
        client_ip: clientIp,
        machine,
        devcontainer_path: devcontainerPath,
        multi_repo_permissions_opt_out: multiRepoPermissionsOptOut,
        working_directory: workingDirectory,
        idle_timeout_minutes: idleTimeoutMinutes,
        display_name: displayName,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    location: {
      label: "Location",
      type: "string",
      required: false,
      placeholder: "Enter location",
      example: "WestUs2",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The location for this codespace.",
    },
    clientIp: {
      label: "Client IP",
      type: "string",
      required: false,
      placeholder: "Enter client IP address",
      example: "192.168.1.1",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "IP address for location auto-detection when proxying a request.",
    },
    machine: {
      label: "Machine",
      type: "string",
      required: false,
      placeholder: "Enter machine type",
      example: "basicLinux32gb",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The machine type to use for this codespace.",
    },
    devcontainerPath: {
      label: "Devcontainer Path",
      type: "string",
      required: false,
      placeholder: "Enter devcontainer path",
      example: ".devcontainer/devcontainer.json",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Path to the devcontainer configuration file.",
    },
    multiRepoPermissionsOptOut: {
      label: "Multi Repo Permissions Opt Out",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "When true, opts out of authorizing requested permissions from the devcontainer.",
    },
    workingDirectory: {
      label: "Working Directory",
      type: "string",
      required: false,
      placeholder: "Enter working directory",
      example: "/workspaces/project",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The working directory for this codespace.",
    },
    idleTimeoutMinutes: {
      label: "Idle Timeout Minutes",
      type: "string",
      required: false,
      placeholder: "Enter timeout in minutes",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        "The time in minutes before the codespace stops from inactivity.",
    },
    displayName: {
      label: "Display Name",
      type: "string",
      required: false,
      placeholder: "Enter display name",
      example: "My Codespace",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The display name for this codespace.",
    },
  },
});

const pullsListReviewComments = action({
  display: {
    label: "Pulls List Review Comments",
    description: "List review comments on a pull request",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      pullNumber,
      sort,
      direction,
      since,
      perPage,
      page,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/comments`,
      { params: { sort, direction, since, per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "created",
      placeholder: "Select sort field",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The field to sort results by.",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      placeholder: "Select direction",
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The direction to sort results (ascending or descending).",
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      placeholder: "Enter timestamp (ISO 8601 format)",
      example: "2024-01-15T10:30:00Z",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Only show comments updated after the given timestamp in ISO 8601 format.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const pullsCreateReviewComment = action({
  display: {
    label: "Pulls Create Review Comment",
    description: "Create a review comment for a pull request",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      pullNumber,
      body,
      commitId,
      path,
      position,
      side,
      line,
      startLine,
      startSide,
      inReplyTo,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/comments`,
      {
        body,
        commit_id: commitId,
        path,
        position,
        side,
        line,
        start_line: startLine,
        start_side: startSide,
        in_reply_to: inReplyTo,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    body: {
      label: "Body",
      type: "text",
      required: true,
      placeholder: "Enter review comment text",
      example: "This section could be refactored for better readability.",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The text of the review comment.",
    },
    commitId: {
      label: "Commit ID",
      type: "string",
      required: false,
      placeholder: "Enter commit SHA",
      example: "abc123def456",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the commit needing a comment.",
    },
    path: {
      label: "Path",
      type: "string",
      required: false,
      placeholder: "Enter file path",
      example: "src/components/Button.tsx",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The relative path to the file that requires a comment.",
    },
    position: {
      label: "Position",
      type: "string",
      required: false,
      placeholder: "Enter line position",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "**This parameter is deprecated.",
    },
    side: {
      label: "Side",
      type: "string",
      required: false,
      placeholder: "Select side",
      model: [
        { label: "LEFT", value: "LEFT" },
        { label: "RIGHT", value: "RIGHT" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "In a split diff view, the side of the diff that the pull request's changes appear on.",
    },
    line: {
      label: "Line",
      type: "string",
      required: false,
      placeholder: "Enter line number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        "The line of the blob in the pull request diff that the comment applies to.",
    },
    startLine: {
      label: "Start Line",
      type: "string",
      required: false,
      placeholder: "Enter start line number",
      example: "35",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        "Required when using multi-line comments unless using in_reply_to.",
    },
    startSide: {
      label: "Start Side",
      type: "string",
      required: false,
      placeholder: "Select start side",
      model: [
        { label: "LEFT", value: "LEFT" },
        { label: "RIGHT", value: "RIGHT" },
        { label: "Side", value: "side" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Required when using multi-line comments unless using in_reply_to.",
    },
    inReplyTo: {
      label: "In Reply To",
      type: "string",
      required: false,
      placeholder: "Enter comment ID",
      example: "2",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The ID of the review comment to reply to.",
    },
  },
});

const pullsCreateReplyForReviewComment = action({
  display: {
    label: "Pulls Create Reply For Review Comment",
    description: "Create a reply for a review comment",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, commentId, body }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/comments/${commentId}/replies`,
      { body }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    commentId: {
      label: "Comment ID",
      type: "string",
      required: true,
      placeholder: "Enter comment ID",
      example: "123456789",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment.",
    },
    body: {
      label: "Body",
      type: "text",
      required: true,
      placeholder: "Enter reply text",
      example: "Thanks for the feedback! I'll update the code accordingly.",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The text of the reply comment.",
    },
  },
});

const pullsListCommits = action({
  display: {
    label: "Pulls List Commits",
    description: "List commits on a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/commits`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const pullsListFiles = action({
  display: {
    label: "Pulls List Files",
    description: "List pull requests files",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
      {
        params: { per_page: perPage, page },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const pullsCheckIfMerged = action({
  display: {
    label: "Pulls Check If Merged",
    description: "Check if a pull request has been merged",
  },
  perform: async (context, { connection, owner, repo, pullNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/merge`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
  },
});

const pullsMerge = action({
  display: {
    label: "Pulls Merge",
    description: "Merge a pull request",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      pullNumber,
      commitTitle,
      commitMessage,
      sha,
      mergeMethod,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/merge`,
      {
        commit_title: commitTitle,
        commit_message: commitMessage,
        sha,
        merge_method: mergeMethod,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    commitTitle: {
      label: "Commit Title",
      type: "string",
      required: false,
      placeholder: "Enter commit title",
      example: "Merge pull request #42 from feature-branch",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The title for the automatic commit message.",
    },
    commitMessage: {
      label: "Commit Message",
      type: "text",
      required: false,
      placeholder: "Enter additional commit message details",
      example:
        "This PR implements the new authentication flow.\nTested on staging environment.",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Additional details to append to the automatic commit message.",
    },
    sha: {
      label: "SHA",
      type: "string",
      required: false,
      placeholder: "Enter commit SHA",
      example: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The SHA that the pull request head must match to allow the merge.",
    },
    mergeMethod: {
      label: "Merge Method",
      type: "string",
      required: false,
      placeholder: "Select merge method",
      model: [
        { label: "Merge", value: "merge" },
        { label: "Squash", value: "squash" },
        { label: "Rebase", value: "rebase" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The merge method to use for the pull request.",
    },
  },
});

const pullsListRequestedReviewers = action({
  display: {
    label: "Pulls List Requested Reviewers",
    description: "List requested reviewers for a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const pullsRequestReviewers = action({
  display: {
    label: "Pulls Request Reviewers",
    description: "Request reviewers for a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, reviewers, teamReviewers }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`,
      { reviewers, team_reviewers: teamReviewers }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    reviewers: {
      label: "Reviewers",
      type: "string",
      required: false,
      placeholder: "Enter reviewer usernames (JSON array)",
      example: '["octocat", "hubot"]',
      clean: (value) => util.types.toString(value) || undefined,
      comments: "An array of user logins to request as reviewers.",
    },
    teamReviewers: {
      label: "Team Reviewers",
      type: "string",
      required: false,
      placeholder: "Enter team slugs (JSON array)",
      example: '["justice-league", "avengers"]',
      clean: (value) => util.types.toString(value) || undefined,
      comments: "An array of team slugs to request as reviewers.",
    },
  },
});

const pullsRemoveRequestedReviewers = action({
  display: {
    label: "Pulls Remove Requested Reviewers",
    description: "Remove requested reviewers from a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, reviewers, teamReviewers }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    reviewers: {
      label: "Reviewers",
      type: "string",
      required: true,
      placeholder: "Enter reviewer usernames (JSON array)",
      example: '["octocat", "hubot"]',
      clean: (value) => util.types.toString(value) || undefined,
      comments: "An array of user logins to remove from reviewers.",
    },
    teamReviewers: {
      label: "Team Reviewers",
      type: "string",
      required: false,
      placeholder: "Enter team slugs (JSON array)",
      example: '["justice-league", "avengers"]',
      clean: (value) => util.types.toString(value) || undefined,
      comments: "An array of team slugs to remove from reviewers.",
    },
  },
});

const pullsListReviews = action({
  display: {
    label: "Pulls List Reviews",
    description: "List reviews for a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const pullsCreateReview = action({
  display: {
    label: "Pulls Create Review",
    description: "Create a review for a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, commitId, body, event, comments }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
      { commit_id: commitId, body, event, comments }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    commitId: {
      label: "Commit ID",
      type: "string",
      required: false,
      placeholder: "Enter commit SHA",
      example: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the commit to review.",
    },
    body: {
      label: "Body",
      type: "text",
      required: false,
      placeholder: "Enter review comment text",
      example:
        "This is a great pull request! The code looks clean and well-documented.",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'The review comment body text. Required when using "REQUEST_CHANGES" or "COMMENT" for the event parameter.',
    },
    event: {
      label: "Event",
      type: "string",
      required: false,
      placeholder: "Select review action",
      model: [
        { label: "APPROVE", value: "APPROVE" },
        { label: "REQUEST CHANGES", value: "REQUEST_CHANGES" },
        { label: "COMMENT", value: "COMMENT" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The review action to perform (approve, request changes, or comment).",
    },
    comments: {
      label: "Comments",
      type: "string",
      required: false,
      placeholder: "Enter review comments (JSON array)",
      example:
        '[{"path":"file.js","position":6,"body":"Please add a comment here."}]',
      clean: (value) => util.types.toString(value) || undefined,
      comments: "An array of draft review comments to attach to the review.",
    },
  },
});

const pullsGetReview = action({
  display: {
    label: "Pulls Get Review",
    description: "Get a review for a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, reviewId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    reviewId: {
      label: "Review ID",
      type: "string",
      required: true,
      placeholder: "Enter review ID",
      example: "98765",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the review.",
    },
  },
});

const pullsUpdateReview = action({
  display: {
    label: "Pulls Update Review",
    description: "Update a review for a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, reviewId, body }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`,
      { body }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    reviewId: {
      label: "Review ID",
      type: "string",
      required: true,
      placeholder: "Enter review ID",
      example: "98765",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the review.",
    },
    body: {
      label: "Body",
      type: "text",
      required: true,
      placeholder: "Enter review comment text",
      example: "After further review, I think this approach is solid.",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The body text of the pull request review.",
    },
  },
});

const pullsDeletePendingReview = action({
  display: {
    label: "Pulls Delete Pending Review",
    description: "Delete a pending review for a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, reviewId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    reviewId: {
      label: "Review ID",
      type: "string",
      required: true,
      placeholder: "Enter review ID",
      example: "98765",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the review.",
    },
  },
});

const pullsListCommentsForReview = action({
  display: {
    label: "Pulls List Comments For Review",
    description: "List comments for a pull request review",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, reviewId, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}/comments`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    reviewId: {
      label: "Review ID",
      type: "string",
      required: true,
      placeholder: "Enter review ID",
      example: "98765",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the review.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const pullsDismissReview = action({
  display: {
    label: "Pulls Dismiss Review",
    description: "Dismiss a review for a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, reviewId, message, event }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}/dismissals`,
      { message, event }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    reviewId: {
      label: "Review ID",
      type: "string",
      required: true,
      placeholder: "Enter review ID",
      example: "98765",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the review.",
    },
    message: {
      label: "Message",
      type: "text",
      required: true,
      placeholder: "Enter dismissal message",
      example: "Dismissing this review as the issues have been addressed.",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The message explaining why the review is being dismissed.",
    },
    event: {
      label: "Event",
      type: "string",
      required: false,
      placeholder: "Enter event type",
      example: "APPROVE",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The review event type.",
    },
  },
});

const pullsSubmitReview = action({
  display: {
    label: "Pulls Submit Review",
    description: "Submit a review for a pull request",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, reviewId, body, event }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}/events`,
      { body, event }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    reviewId: {
      label: "Review ID",
      type: "string",
      required: true,
      placeholder: "Enter review ID",
      example: "98765",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the review.",
    },
    body: {
      label: "Body",
      type: "text",
      required: false,
      placeholder: "Enter review comment text",
      example:
        "This looks good to me. I've tested it and everything works as expected.",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The body text of the pull request review.",
    },
    event: {
      label: "Event",
      type: "string",
      required: true,
      placeholder: "Select review action",
      model: [
        { label: "APPROVE", value: "APPROVE" },
        { label: "REQUEST CHANGES", value: "REQUEST_CHANGES" },
        { label: "COMMENT", value: "COMMENT" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The review action to perform (approve, request changes, or comment).",
    },
  },
});

const pullsUpdateBranch = action({
  display: {
    label: "Pulls Update Branch",
    description: "Update a pull request branch",
  },
  perform: async (
    context,
    { connection, owner, repo, pullNumber, expectedHeadSha }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/pulls/${pullNumber}/update-branch`,
      { expected_head_sha: expectedHeadSha }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pullNumber: {
      label: "Pull Number",
      type: "string",
      required: true,
      placeholder: "Enter pull request number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the pull request.",
    },
    expectedHeadSha: {
      label: "Expected Head SHA",
      type: "string",
      required: false,
      placeholder: "Enter expected head commit SHA",
      example: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The expected SHA of the pull request's HEAD ref.",
    },
  },
});

const reposGetReadme = action({
  display: {
    label: "Repos Get Readme",
    description: "Get a repository README",
  },
  perform: async (context, { connection, owner, repo, ref }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/readme`, {
      params: { ref },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: false,
      placeholder: "Enter branch, tag, or commit ref",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the commit, branch, or tag.",
    },
  },
});

const reposGetReadmeInDirectory = action({
  display: {
    label: "Repos Get Readme In Directory",
    description: "Get a repository README for a directory",
  },
  perform: async (context, { connection, owner, repo, dir, ref }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/readme/${dir}`, {
      params: { ref },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    dir: {
      label: "Dir",
      type: "string",
      required: true,
      placeholder: "Enter directory path",
      example: "docs",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The directory path to look for a README file.",
    },
    ref: {
      label: "Ref",
      type: "string",
      required: false,
      placeholder: "Enter branch, tag, or commit ref",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the commit, branch, or tag.",
    },
  },
});

const reposListReleases = action({
  display: {
    label: "Repos List Releases",
    description: "List releases",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/releases`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const reposCreateRelease = action({
  display: {
    label: "Repos Create Release",
    description: "Create a release",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      tagName,
      targetCommitish,
      name,
      body,
      draft,
      prerelease,
      discussionCategoryName,
      generateReleaseNotes,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/releases`, {
      tag_name: tagName,
      target_commitish: targetCommitish,
      name,
      body,
      draft,
      prerelease,
      discussion_category_name: discussionCategoryName,
      generate_release_notes: generateReleaseNotes,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    tagName: {
      label: "Tag Name",
      type: "string",
      required: true,
      placeholder: "Enter tag name",
      example: "v1.0.0",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the tag.",
    },
    targetCommitish: {
      label: "Target Commitish",
      type: "string",
      required: false,
      placeholder: "Enter target commitish (branch, tag, or commit SHA)",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Specifies the commitish value that determines where the Git tag is created from. Can be a branch, tag, or commit SHA.",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      placeholder: "Enter release name",
      example: "Version 1.0.0",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the release.",
    },
    body: {
      label: "Body",
      type: "text",
      required: false,
      placeholder: "Enter release notes",
      example:
        "## What's Changed\n* Added new feature X\n* Fixed bug Y\n* Improved performance",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Text describing the contents of the release.",
    },
    draft: {
      label: "Draft",
      type: "boolean",
      required: false,
      default: "false",
      placeholder: "Select whether to create as draft",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'Set to "true" to create a draft (unpublished) release, "false" to create a published one.',
    },
    prerelease: {
      label: "Prerelease",
      type: "boolean",
      required: false,
      default: "false",
      placeholder: "Select whether this is a prerelease",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: 'Set to "true" to identify the release as a prerelease.',
    },
    discussionCategoryName: {
      label: "Discussion Category Name",
      type: "string",
      required: false,
      placeholder: "Enter discussion category name",
      example: "Announcements",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "If specified, a discussion of the specified category is created and linked to the release.",
    },
    generateReleaseNotes: {
      label: "Generate Release Notes",
      type: "boolean",
      required: false,
      default: "false",
      placeholder: "Select whether to auto-generate release notes",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether to automatically generate the name and body for this release based on Git history.",
    },
  },
});

const reposGetReleaseAsset = action({
  display: {
    label: "Repos Get Release Asset",
    description: "Get a release asset",
  },
  perform: async (context, { connection, owner, repo, assetId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/releases/assets/${assetId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    assetId: {
      label: "Asset ID",
      type: "string",
      required: true,
      placeholder: "Enter asset ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the asset.",
    },
  },
});

const reposUpdateReleaseAsset = action({
  display: {
    label: "Repos Update Release Asset",
    description: "Update a release asset",
  },
  perform: async (
    context,
    { connection, owner, repo, assetId, name, label, state }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/releases/assets/${assetId}`,
      { name, label, state }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    assetId: {
      label: "Asset ID",
      type: "string",
      required: true,
      placeholder: "Enter asset ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the asset.",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      placeholder: "Enter asset name",
      example: "my-app.zip",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The file name of the asset.",
    },
    label: {
      label: "Label",
      type: "string",
      required: false,
      placeholder: "Enter asset label",
      example: "Production Build",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "An alternate short description of the asset.",
    },
    state: {
      label: "State",
      type: "string",
      required: false,
      placeholder: "Enter state",
      example: "uploaded",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state of the asset.",
    },
  },
});

const reposDeleteReleaseAsset = action({
  display: {
    label: "Repos Delete Release Asset",
    description: "Delete a release asset",
  },
  perform: async (context, { connection, owner, repo, assetId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/releases/assets/${assetId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    assetId: {
      label: "Asset ID",
      type: "string",
      required: true,
      placeholder: "Enter asset ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the asset.",
    },
  },
});

const reposGenerateReleaseNotes = action({
  display: {
    label: "Repos Generate Release Notes",
    description: "Generate release notes content for a release",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      tagName,
      targetCommitish,
      previousTagName,
      configurationFilePath,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/releases/generate-notes`,
      {
        tag_name: tagName,
        target_commitish: targetCommitish,
        previous_tag_name: previousTagName,
        configuration_file_path: configurationFilePath,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    tagName: {
      label: "Tag Name",
      type: "string",
      required: true,
      placeholder: "Enter tag name",
      example: "v1.0.0",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The tag name for the release.",
    },
    targetCommitish: {
      label: "Target Commitish",
      type: "string",
      required: false,
      placeholder: "Enter target commitish (branch, tag, or commit SHA)",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Specifies the commitish value that will be the target for the release's tag. Can be a branch, tag, or commit SHA.",
    },
    previousTagName: {
      label: "Previous Tag Name",
      type: "string",
      required: false,
      placeholder: "Enter previous tag name",
      example: "v0.9.0",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The name of the previous tag to use as the starting point for the release notes.",
    },
    configurationFilePath: {
      label: "Configuration File Path",
      type: "string",
      required: false,
      placeholder: "Enter configuration file path",
      example: ".github/release.yml",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Specifies a path to a file in the repository containing configuration settings used for generating the release notes.",
    },
  },
});

const reposGetLatestRelease = action({
  display: {
    label: "Repos Get Latest Release",
    description: "Get the latest release",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/releases/latest`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposGetReleaseByTag = action({
  display: {
    label: "Repos Get Release By Tag",
    description: "Get a release by tag name",
  },
  perform: async (context, { connection, owner, repo, tag }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/releases/tags/${tag}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    tag: {
      label: "Tag",
      type: "string",
      required: true,
      placeholder: "Enter tag name",
      example: "v1.0.0",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The tag name to get the release for.",
    },
  },
});

const reposGetRelease = action({
  display: {
    label: "Repos Get Release",
    description: "Get a release",
  },
  perform: async (context, { connection, owner, repo, releaseId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/releases/${releaseId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    releaseId: {
      label: "Release ID",
      type: "string",
      required: true,
      placeholder: "Enter release ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the release.",
    },
  },
});

const reposUpdateRelease = action({
  display: {
    label: "Repos Update Release",
    description: "Update a release",
  },
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      releaseId,
      tagName,
      targetCommitish,
      name,
      body,
      draft,
      prerelease,
      discussionCategoryName,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/releases/${releaseId}`,
      {
        tag_name: tagName,
        target_commitish: targetCommitish,
        name,
        body,
        draft,
        prerelease,
        discussion_category_name: discussionCategoryName,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    releaseId: {
      label: "Release ID",
      type: "string",
      required: true,
      placeholder: "Enter release ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the release.",
    },
    tagName: {
      label: "Tag Name",
      type: "string",
      required: false,
      placeholder: "Enter tag name",
      example: "v1.0.0",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the tag.",
    },
    targetCommitish: {
      label: "Target Commitish",
      type: "string",
      required: false,
      placeholder: "Enter target commitish (branch, tag, or commit SHA)",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Specifies the commitish value that determines where the Git tag is created from. Can be a branch, tag, or commit SHA.",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      placeholder: "Enter release name",
      example: "v1.0.0 Release",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the release.",
    },
    body: {
      label: "Body",
      type: "text",
      required: false,
      placeholder: "Enter release notes",
      example: "## What's Changed\n* Added new feature X\n* Fixed bug Y",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Text describing the contents of the release.",
    },
    draft: {
      label: "Draft",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "True to create a draft release, false to publish the release.",
    },
    prerelease: {
      label: "Prerelease",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "True to identify the release as a prerelease, false to identify the release as a full release.",
    },
    discussionCategoryName: {
      label: "Discussion Category Name",
      type: "string",
      required: false,
      placeholder: "Enter discussion category name",
      example: "Announcements",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "If specified, a discussion of the specified category is created and linked to the release.",
    },
  },
});

const reposDeleteRelease = action({
  display: {
    label: "Repos Delete Release",
    description: "Delete a release",
  },
  perform: async (context, { connection, owner, repo, releaseId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/releases/${releaseId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    releaseId: {
      label: "Release ID",
      type: "string",
      required: true,
      placeholder: "Enter release ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the release.",
    },
  },
});

const reposListReleaseAssets = action({
  display: {
    label: "Repos List Release Assets",
    description: "List release assets",
  },
  perform: async (
    context,
    { connection, owner, repo, releaseId, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/releases/${releaseId}/assets`,
      { params: { per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    releaseId: {
      label: "Release ID",
      type: "string",
      required: true,
      placeholder: "Enter release ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the release.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const reposUploadReleaseAsset = action({
  display: {
    label: "Repos Upload Release Asset",
    description: "Upload a release asset",
  },
  perform: async (
    context,
    { connection, owner, repo, releaseId, name, label }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/releases/${releaseId}/assets`,
      {},
      { params: { name, label } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    releaseId: {
      label: "Release ID",
      type: "string",
      required: true,
      placeholder: "Enter release ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the release.",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      placeholder: "Enter asset name",
      example: "my-app.zip",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The file name of the asset.",
    },
    label: {
      label: "Label",
      type: "string",
      placeholder: "Enter asset label",
      example: "Production Build",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "An alternate short description of the asset.",
    },
  },
});

const reactionsListForRelease = action({
  display: {
    label: "Reactions List For Release",
    description: "List reactions for a release",
  },
  perform: async (
    context,
    { connection, owner, repo, releaseId, content, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/releases/${releaseId}/reactions`,
      { params: { content, per_page: perPage, page } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    releaseId: {
      label: "Release ID",
      type: "string",
      required: true,
      placeholder: "Enter release ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the release.",
    },
    content: {
      label: "Content",
      type: "string",
      required: false,
      placeholder: "Select reaction type",
      model: [
        { label: "1", value: "+1" },
        { label: "Laugh", value: "laugh" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns a single reaction type to filter by.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const reactionsCreateForRelease = action({
  display: {
    label: "Reactions Create For Release",
    description: "Create reaction for a release",
  },
  perform: async (context, { connection, owner, repo, releaseId, content }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/releases/${releaseId}/reactions`,
      { content }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    releaseId: {
      label: "Release ID",
      type: "string",
      required: true,
      placeholder: "Enter release ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the release.",
    },
    content: {
      label: "Content",
      type: "string",
      required: true,
      placeholder: "Select reaction type",
      model: [
        { label: "1", value: "+1" },
        { label: "Laugh", value: "laugh" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The reaction type to create.",
    },
  },
});

const reactionsDeleteForRelease = action({
  display: {
    label: "Reactions Delete For Release",
    description: "Delete a release reaction",
  },
  perform: async (
    context,
    { connection, owner, repo, releaseId, reactionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/releases/${releaseId}/reactions/${reactionId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    releaseId: {
      label: "Release ID",
      type: "string",
      required: true,
      placeholder: "Enter release ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the release.",
    },
    reactionId: {
      label: "Reaction ID",
      type: "string",
      required: true,
      placeholder: "Enter reaction ID",
      example: "98765",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the reaction.",
    },
  },
});

const secretScanningListAlertsForRepo = action({
  display: {
    label: "Secret Scanning List Alerts For Repo",
    description: "List secret scanning alerts for a repository",
  },
  perform: async (
    context,
    { connection, owner, repo, state, secretType, resolution, page, perPage }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/secret-scanning/alerts`,
      {
        params: {
          state,
          secret_type: secretType,
          resolution,
          page,
          per_page: perPage,
        },
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    state: {
      label: "State",
      type: "string",
      required: false,
      placeholder: "Select state",
      model: [
        { label: "Open", value: "open" },
        { label: "Resolved", value: "resolved" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filters alerts by their state (open or resolved).",
    },
    secretType: {
      label: "Secret Type",
      type: "string",
      required: false,
      placeholder: "Enter secret types (comma-separated)",
      example: "github_token,aws_access_key",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A comma-separated list of secret types to filter by.",
    },
    resolution: {
      label: "Resolution",
      type: "string",
      required: false,
      placeholder: "Enter resolutions (comma-separated)",
      example: "false_positive,wont_fix",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A comma-separated list of resolutions to filter by.",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
  },
});

const secretScanningGetAlert = action({
  display: {
    label: "Secret Scanning Get Alert",
    description: "Get a secret scanning alert",
  },
  perform: async (context, { connection, owner, repo, alertNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/secret-scanning/alerts/${alertNumber}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    alertNumber: {
      label: "Alert Number",
      type: "string",
      required: true,
      placeholder: "Enter alert number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the alert.",
    },
  },
});

const secretScanningUpdateAlert = action({
  display: {
    label: "Secret Scanning Update Alert",
    description: "Update a secret scanning alert",
  },
  perform: async (
    context,
    { connection, owner, repo, alertNumber, state, resolution }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/repos/${owner}/${repo}/secret-scanning/alerts/${alertNumber}`,
      { state, resolution }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    alertNumber: {
      label: "Alert Number",
      type: "string",
      required: true,
      placeholder: "Enter alert number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the alert.",
    },
    state: {
      label: "State",
      type: "string",
      required: true,
      placeholder: "Select state",
      model: [
        { label: "Open", value: "open" },
        { label: "Resolved", value: "resolved" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state to set for the alert (open or resolved).",
    },
    resolution: {
      label: "Resolution",
      type: "string",
      required: false,
      placeholder: "Select resolution",
      model: [
        { label: "", value: "null" },
        { label: "False Positive", value: "false_positive" },
        { label: "Wont Fix", value: "wont_fix" },
        { label: "Revoked", value: "revoked" },
        { label: "Used In Tests", value: "used_in_tests" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The resolution for the alert. Required when state is resolved.",
    },
  },
});

const secretScanningListLocationsForAlert = action({
  display: {
    label: "Secret Scanning List Locations For Alert",
    description: "List locations for a secret scanning alert",
  },
  perform: async (
    context,
    { connection, owner, repo, alertNumber, page, perPage }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/secret-scanning/alerts/${alertNumber}/locations`,
      { params: { page, per_page: perPage } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    alertNumber: {
      label: "Alert Number",
      type: "string",
      required: true,
      placeholder: "Enter alert number",
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the alert.",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
  },
});

const activityListStargazersForRepo = action({
  display: {
    label: "Activity List Stargazers For Repo",
    description: "List stargazers",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/stargazers`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const reposGetCodeFrequencyStats = action({
  display: {
    label: "Repos Get Code Frequency Stats",
    description: "Get the weekly commit activity",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/stats/code_frequency`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposGetCommitActivityStats = action({
  display: {
    label: "Repos Get Commit Activity Stats",
    description: "Get the last year of commit activity",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/stats/commit_activity`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposGetContributorsStats = action({
  display: {
    label: "Repos Get Contributors Stats",
    description: "Get all contributor commit activity",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/stats/contributors`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposGetParticipationStats = action({
  display: {
    label: "Repos Get Participation Stats",
    description: "Get the weekly commit count",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/stats/participation`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposGetPunchCardStats = action({
  display: {
    label: "Repos Get Punch Card Stats",
    description: "Get the hourly commit count for each day",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/stats/punch_card`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposCreateCommitStatus = action({
  display: {
    label: "Repos Create Commit Status",
    description: "Create a commit status",
  },
  perform: async (
    context,
    { connection, owner, repo, sha, state, targetUrl, description, ctx }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/statuses/${sha}`,
      {
        state,
        target_url: targetUrl,
        description,
        context: ctx,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    sha: {
      label: "SHA",
      type: "string",
      required: true,
      placeholder: "Enter commit SHA",
      example: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The SHA of the commit.",
    },
    state: {
      label: "State",
      type: "string",
      required: true,
      placeholder: "Select state",
      model: [
        { label: "Error", value: "error" },
        { label: "Failure", value: "failure" },
        { label: "Pending", value: "pending" },
        { label: "Success", value: "success" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state of the commit status.",
    },
    targetUrl: {
      label: "Target URL",
      type: "string",
      required: false,
      placeholder: "Enter target URL",
      example: "https://ci.example.com/build/123",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The target URL to associate with the status. This URL will be linked from the GitHub UI to allow users to see the source of the status.",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      placeholder: "Enter description",
      example: "Build successful",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A short description of the status.",
    },
    ctx: {
      label: "Context",
      type: "string",
      required: false,
      default: "default",
      placeholder: "Enter context",
      example: "continuous-integration/jenkins",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "A string label to differentiate this status from the status of other systems. This field is case-insensitive.",
    },
  },
});

const activityListWatchersForRepo = action({
  display: {
    label: "Activity List Watchers For Repo",
    description: "List watchers",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/subscribers`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const activityGetRepoSubscription = action({
  display: {
    label: "Activity Get Repo Subscription",
    description: "Get a repository subscription",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/subscription`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const activitySetRepoSubscription = action({
  display: {
    label: "Activity Set Repo Subscription",
    description: "Set a repository subscription",
  },
  perform: async (
    context,
    { connection, owner, repo, subscribed, ignored }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/repos/${owner}/${repo}/subscription`, {
      subscribed,
      ignored,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    subscribed: {
      label: "Subscribed",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to receive notifications from this repository.",
    },
    ignored: {
      label: "Ignored",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to block all notifications from this repository.",
    },
  },
});

const activityDeleteRepoSubscription = action({
  display: {
    label: "Activity Delete Repo Subscription",
    description: "Delete a repository subscription",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/subscription`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposListTags = action({
  display: {
    label: "Repos List Tags",
    description: "List repository tags",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/tags`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const reposListTagProtection = action({
  display: {
    label: "Repos List Tag Protection",
    description: "List tag protection states for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/tags/protection`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposCreateTagProtection = action({
  display: {
    label: "Repos Create Tag Protection",
    description: "Create a tag protection state for a repository",
  },
  perform: async (context, { connection, owner, repo, pattern }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/tags/protection`,
      {
        pattern,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    pattern: {
      label: "Pattern",
      type: "string",
      required: true,
      placeholder: "Enter tag pattern",
      example: "v*",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "A glob pattern to match against when enforcing tag protection.",
    },
  },
});

const reposDeleteTagProtection = action({
  display: {
    label: "Repos Delete Tag Protection",
    description: "Delete a tag protection state for a repository",
  },
  perform: async (context, { connection, owner, repo, tagProtectionId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/tags/protection/${tagProtectionId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    tagProtectionId: {
      label: "Tag Protection ID",
      type: "string",
      required: true,
      placeholder: "Enter tag protection ID",
      example: "12345",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the tag protection.",
    },
  },
});

const reposDownloadTarballArchive = action({
  display: {
    label: "Repos Download Tarball Archive",
    description: "Download a repository archive (tar)",
  },
  perform: async (context, { connection, owner, repo, ref }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/tarball/${ref}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      placeholder: "Enter branch, tag, or commit SHA",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The Git reference (branch, tag, or commit SHA) to download.",
    },
  },
});

const reposListTeams = action({
  display: {
    label: "Repos List Teams",
    description: "List repository teams",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/teams`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

const reposGetAllTopics = action({
  display: {
    label: "Repos Get All Topics",
    description: "Get all repository topics",
  },
  perform: async (context, { connection, owner, repo, page, perPage }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/topics`, {
      params: { page, per_page: perPage },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
  },
});

const reposReplaceAllTopics = action({
  display: {
    label: "Repos Replace All Topics",
    description: "Replace all repository topics",
  },
  perform: async (context, { connection, owner, repo, names }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/repos/${owner}/${repo}/topics`, {
      names,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    names: {
      label: "Names",
      type: "string",
      required: true,
      placeholder: "Enter comma-separated topic names",
      example: "javascript,nodejs,api",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A comma-separated list of topics to add to the repository.",
    },
  },
});

const reposGetClones = action({
  display: {
    label: "Repos Get Clones",
    description: "Get repository clones",
  },
  perform: async (context, { connection, owner, repo, per }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/traffic/clones`,
      { params: { per } }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    per: {
      label: "Per",
      type: "string",
      required: false,
      default: "day",
      placeholder: "Select time frame",
      model: [
        { label: "", value: "" },
        { label: "Day", value: "day" },
        { label: "Week", value: "week" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The time frame to display results for (day or week).",
    },
  },
});

const reposGetTopPaths = action({
  display: {
    label: "Repos Get Top Paths",
    description: "Get top referral paths",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/traffic/popular/paths`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposGetTopReferrers = action({
  display: {
    label: "Repos Get Top Referrers",
    description: "Get top referral sources",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/traffic/popular/referrers`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposGetViews = action({
  display: {
    label: "Repos Get Views",
    description: "Get page views",
  },
  perform: async (context, { connection, owner, repo, per }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/traffic/views`, {
      params: { per },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    per: {
      label: "Per",
      type: "string",
      required: false,
      default: "day",
      placeholder: "Select time frame",
      model: [
        { label: "", value: "" },
        { label: "Day", value: "day" },
        { label: "Week", value: "week" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The time frame to display results for (day or week).",
    },
  },
});

const reposTransfer = action({
  display: {
    label: "Repos Transfer",
    description: "Transfer a repository",
  },
  perform: async (context, { connection, owner, repo, newOwner, teamIds }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/transfer`, {
      new_owner: newOwner,
      team_ids: teamIds,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    newOwner: {
      label: "New Owner",
      type: "string",
      required: true,
      placeholder: "Enter new owner username",
      example: "new-organization",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The username or organization name the repository will be transferred to.",
    },
    teamIds: {
      label: "Team IDs",
      type: "string",
      required: false,
      placeholder: "Enter comma-separated team IDs",
      example: "12,34,56",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A comma-separated list of team IDs to add to the repository.",
    },
  },
});

const reposCheckVulnerabilityAlerts = action({
  display: {
    label: "Repos Check Vulnerability Alerts",
    description: "Check if vulnerability alerts are enabled for a repository",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/repos/${owner}/${repo}/vulnerability-alerts`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposEnableVulnerabilityAlerts = action({
  display: {
    label: "Repos Enable Vulnerability Alerts",
    description: "Enable vulnerability alerts",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/repos/${owner}/${repo}/vulnerability-alerts`,
      {}
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposDisableVulnerabilityAlerts = action({
  display: {
    label: "Repos Disable Vulnerability Alerts",
    description: "Disable vulnerability alerts",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${owner}/${repo}/vulnerability-alerts`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
  },
});

const reposDownloadZipballArchive = action({
  display: {
    label: "Repos Download Zipball Archive",
    description: "Download a repository archive (zip)",
  },
  perform: async (context, { connection, owner, repo, ref }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/zipball/${ref}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    ref: {
      label: "Ref",
      type: "string",
      required: true,
      placeholder: "Enter branch, tag, or commit SHA",
      example: "main",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The Git reference (branch, tag, or commit SHA) to download.",
    },
  },
});

const reposCreateUsingTemplate = action({
  display: {
    label: "Repos Create Using Template",
    description: "Create a repository using a template",
  },
  perform: async (
    context,
    {
      connection,
      templateOwner,
      templateRepo,
      owner,
      name,
      description,
      includeAllBranches,
      isPrivate,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${templateOwner}/${templateRepo}/generate`,
      {
        owner,
        name,
        description,
        include_all_branches: includeAllBranches,
        private: isPrivate,
      }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    templateOwner: {
      label: "Template Owner",
      type: "string",
      required: true,
      placeholder: "Enter template owner",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The account owner of the template repository.",
    },
    templateRepo: {
      label: "Template Repo",
      type: "string",
      required: true,
      placeholder: "Enter template repository name",
      example: "template-repo",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the template repository.",
    },
    owner: {
      label: "Owner",
      type: "string",
      required: false,
      placeholder: "Enter new repository owner",
      example: "my-org",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization or person who will own the new repository.",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      placeholder: "Enter repository name",
      example: "my-new-repo",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the new repository.",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      placeholder: "Enter repository description",
      example: "A new repository created from a template",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A short description of the new repository.",
    },
    includeAllBranches: {
      label: "Include All Branches",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether to include all branches from the template repository, not just the default branch.",
    },
    isPrivate: {
      label: "Private",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether to create a private repository (true) or a public repository (false).",
    },
  },
});

export default {
  reposGet,
  reposUpdate,
  reposDelete,
  actionsListArtifactsForRepo,
  actionsGetArtifact,
  actionsDeleteArtifact,
  actionsDownloadArtifact,
  actionsGetActionsCacheUsage,
  actionsGetJobForWorkflowRun,
  actionsDownloadJobLogsForWorkflowRun,
  actionsReRunJobForWorkflowRun,
  actionsGetGithubActionsPermissionsRepository,
  actionsSetGithubActionsPermissionsRepository,
  actionsGetWorkflowAccessToRepository,
  actionsSetWorkflowAccessToRepository,
  actionsGetAllowedActionsRepository,
  actionsSetAllowedActionsRepository,
  actionsGetGithubActionsDefaultWorkflowPermissionsRepository,
  actionsSetGithubActionsDefaultWorkflowPermissionsRepository,
  actionsListSelfHostedRunnersForRepo,
  actionsListRunnerApplicationsForRepo,
  actionsCreateRegistrationTokenForRepo,
  actionsCreateRemoveTokenForRepo,
  actionsGetSelfHostedRunnerForRepo,
  actionsDeleteSelfHostedRunnerFromRepo,
  actionsListLabelsForSelfHostedRunnerForRepo,
  actionsAddCustomLabelsToSelfHostedRunnerForRepo,
  actionsSetCustomLabelsForSelfHostedRunnerForRepo,
  actionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo,
  actionsRemoveCustomLabelFromSelfHostedRunnerForRepo,
  actionsListWorkflowRunsForRepo,
  actionsGetWorkflowRun,
  actionsDeleteWorkflowRun,
  actionsGetReviewsForRun,
  actionsApproveWorkflowRun,
  actionsListWorkflowRunArtifacts,
  actionsGetWorkflowRunAttempt,
  actionsListJobsForWorkflowRunAttempt,
  actionsDownloadWorkflowRunAttemptLogs,
  actionsCancelWorkflowRun,
  actionsListJobsForWorkflowRun,
  actionsDownloadWorkflowRunLogs,
  actionsDeleteWorkflowRunLogs,
  actionsGetPendingDeploymentsForRun,
  actionsReviewPendingDeploymentsForRun,
  actionsReRunWorkflow,
  actionsReRunWorkflowFailedJobs,
  actionsGetWorkflowRunUsage,
  actionsListRepoSecrets,
  actionsGetRepoPublicKey,
  actionsGetRepoSecret,
  actionsCreateOrUpdateRepoSecret,
  actionsDeleteRepoSecret,
  actionsListRepoWorkflows,
  actionsGetWorkflow,
  actionsDisableWorkflow,
  actionsCreateWorkflowDispatch,
  actionsEnableWorkflow,
  actionsListWorkflowRuns,
  actionsGetWorkflowUsage,
  issuesListAssignees,
  issuesCheckUserCanBeAssigned,
  reposListAutolinks,
  reposCreateAutolink,
  reposGetAutolink,
  reposDeleteAutolink,
  reposEnableAutomatedSecurityFixes,
  reposDisableAutomatedSecurityFixes,
  reposListBranches,
  reposGetBranch,
  reposGetBranchProtection,
  reposUpdateBranchProtection,
  reposDeleteBranchProtection,
  reposGetAdminBranchProtection,
  reposSetAdminBranchProtection,
  reposDeleteAdminBranchProtection,
  reposGetPullRequestReviewProtection,
  reposUpdatePullRequestReviewProtection,
  reposDeletePullRequestReviewProtection,
  reposGetCommitSignatureProtection,
  reposCreateCommitSignatureProtection,
  reposDeleteCommitSignatureProtection,
  reposGetStatusChecksProtection,
  reposUpdateStatusCheckProtection,
  reposRemoveStatusCheckProtection,
  reposGetAllStatusCheckContexts,
  reposAddStatusCheckContexts,
  reposSetStatusCheckContexts,
  reposRemoveStatusCheckContexts,
  reposGetAccessRestrictions,
  reposDeleteAccessRestrictions,
  reposGetAppsWithAccessToProtectedBranch,
  reposAddAppAccessRestrictions,
  reposSetAppAccessRestrictions,
  reposRemoveAppAccessRestrictions,
  reposGetTeamsWithAccessToProtectedBranch,
  reposAddTeamAccessRestrictions,
  reposSetTeamAccessRestrictions,
  reposRemoveTeamAccessRestrictions,
  reposGetUsersWithAccessToProtectedBranch,
  reposAddUserAccessRestrictions,
  reposSetUserAccessRestrictions,
  reposRemoveUserAccessRestrictions,
  reposRenameBranch,
  checksCreate,
  checksGet,
  checksUpdate,
  checksListAnnotations,
  checksRerequestRun,
  checksCreateSuite,
  checksSetSuitesPreferences,
  checksGetSuite,
  checksListForSuite,
  checksRerequestSuite,
  codeScanningListAlertsForRepo,
  codeScanningGetAlert,
  codeScanningUpdateAlert,
  codeScanningListAlertInstances,
  codeScanningListRecentAnalyses,
  codeScanningGetAnalysis,
  codeScanningDeleteAnalysis,
  codeScanningUploadSarif,
  codeScanningGetSarif,
  reposCodeownersErrors,
  codespacesListInRepositoryForAuthenticatedUser,
  codespacesCreateWithRepoForAuthenticatedUser,
  codespacesListDevcontainersInRepositoryForAuthenticatedUser,
  codespacesRepoMachinesForAuthenticatedUser,
  codespacesListRepoSecrets,
  codespacesGetRepoPublicKey,
  codespacesGetRepoSecret,
  codespacesCreateOrUpdateRepoSecret,
  codespacesDeleteRepoSecret,
  reposListCollaborators,
  reposCheckCollaborator,
  reposAddCollaborator,
  reposRemoveCollaborator,
  reposGetCollaboratorPermissionLevel,
  reposListCommitCommentsForRepo,
  reposGetCommitComment,
  reposUpdateCommitComment,
  reposDeleteCommitComment,
  reactionsListForCommitComment,
  reactionsCreateForCommitComment,
  reactionsDeleteForCommitComment,
  reposListCommits,
  reposListBranchesForHeadCommit,
  reposListCommentsForCommit,
  reposCreateCommitComment,
  reposListPullRequestsAssociatedWithCommit,
  reposGetCommit,
  checksListForRef,
  checksListSuitesForRef,
  reposGetCombinedStatusForRef,
  reposListCommitStatusesForRef,
  reposGetCommunityProfileMetrics,
  reposCompareCommits,
  reposGetContent,
  reposCreateOrUpdateFileContents,
  reposDeleteFile,
  reposListContributors,
  dependabotListRepoSecrets,
  dependabotGetRepoPublicKey,
  dependabotGetRepoSecret,
  dependabotCreateOrUpdateRepoSecret,
  dependabotDeleteRepoSecret,
  dependencyGraphDiffRange,
  reposListDeployments,
  reposCreateDeployment,
  reposGetDeployment,
  reposDeleteDeployment,
  reposListDeploymentStatuses,
  reposCreateDeploymentStatus,
  reposGetDeploymentStatus,
  reposCreateDispatchEvent,
  reposGetAllEnvironments,
  reposGetEnvironment,
  reposCreateOrUpdateEnvironment,
  reposDeleteAnEnvironment,
  activityListRepoEvents,
  reposListForks,
  reposCreateFork,
  gitCreateBlob,
  gitGetBlob,
  gitCreateCommit,
  gitGetCommit,
  gitListMatchingRefs,
  gitGetRef,
  gitCreateRef,
  gitUpdateRef,
  gitDeleteRef,
  gitCreateTag,
  gitGetTag,
  gitCreateTree,
  gitGetTree,
  migrationsGetImportStatus,
  migrationsStartImport,
  migrationsUpdateImport,
  migrationsCancelImport,
  migrationsGetCommitAuthors,
  migrationsMapCommitAuthor,
  migrationsGetLargeFiles,
  migrationsSetLfsPreference,
  appsGetRepoInstallation,
  interactionsGetRestrictionsForRepo,
  interactionsSetRestrictionsForRepo,
  interactionsRemoveRestrictionsForRepo,
  reposListInvitations,
  reposUpdateInvitation,
  reposDeleteInvitation,
  issuesListForRepo,
  issuesCreate,
  issuesListCommentsForRepo,
  issuesGetComment,
  issuesUpdateComment,
  issuesDeleteComment,
  reactionsListForIssueComment,
  reactionsCreateForIssueComment,
  reactionsDeleteForIssueComment,
  issuesListEventsForRepo,
  issuesGetEvent,
  issuesGet,
  issuesUpdate,
  issuesAddAssignees,
  issuesRemoveAssignees,
  issuesListComments,
  issuesCreateComment,
  issuesListEvents,
  issuesListLabelsOnIssue,
  issuesAddLabels,
  issuesSetLabels,
  issuesRemoveAllLabels,
  issuesRemoveLabel,
  issuesLock,
  issuesUnlock,
  reactionsListForIssue,
  reactionsCreateForIssue,
  reactionsDeleteForIssue,
  issuesListEventsForTimeline,
  reposListDeployKeys,
  reposCreateDeployKey,
  reposGetDeployKey,
  reposDeleteDeployKey,
  issuesListLabelsForRepo,
  issuesCreateLabel,
  issuesGetLabel,
  issuesUpdateLabel,
  issuesDeleteLabel,
  reposListLanguages,
  reposEnableLfsForRepo,
  reposDisableLfsForRepo,
  licensesGetForRepo,
  reposMergeUpstream,
  reposMerge,
  issuesListMilestones,
  issuesCreateMilestone,
  issuesGetMilestone,
  issuesUpdateMilestone,
  issuesDeleteMilestone,
  issuesListLabelsForMilestone,
  activityListRepoNotificationsForAuthenticatedUser,
  activityMarkRepoNotificationsAsRead,
  reposGetPages,
  reposCreatePagesSite,
  reposUpdateInformationAboutPagesSite,
  reposDeletePagesSite,
  reposListPagesBuilds,
  reposRequestPagesBuild,
  reposGetLatestPagesBuild,
  reposGetPagesBuild,
  reposGetPagesHealthCheck,
  projectsListForRepo,
  projectsCreateForRepo,
  pullsList,
  pullsCreate,
  pullsListReviewCommentsForRepo,
  pullsGetReviewComment,
  pullsUpdateReviewComment,
  pullsDeleteReviewComment,
  reactionsListForPullRequestReviewComment,
  reactionsCreateForPullRequestReviewComment,
  reactionsDeleteForPullRequestComment,
  pullsGet,
  pullsUpdate,
  codespacesCreateWithPrForAuthenticatedUser,
  pullsListReviewComments,
  pullsCreateReviewComment,
  pullsCreateReplyForReviewComment,
  pullsListCommits,
  pullsListFiles,
  pullsCheckIfMerged,
  pullsMerge,
  pullsListRequestedReviewers,
  pullsRequestReviewers,
  pullsRemoveRequestedReviewers,
  pullsListReviews,
  pullsCreateReview,
  pullsGetReview,
  pullsUpdateReview,
  pullsDeletePendingReview,
  pullsListCommentsForReview,
  pullsDismissReview,
  pullsSubmitReview,
  pullsUpdateBranch,
  reposGetReadme,
  reposGetReadmeInDirectory,
  reposListReleases,
  reposCreateRelease,
  reposGetReleaseAsset,
  reposUpdateReleaseAsset,
  reposDeleteReleaseAsset,
  reposGenerateReleaseNotes,
  reposGetLatestRelease,
  reposGetReleaseByTag,
  reposGetRelease,
  reposUpdateRelease,
  reposDeleteRelease,
  reposListReleaseAssets,
  reposUploadReleaseAsset,
  reactionsListForRelease,
  reactionsCreateForRelease,
  reactionsDeleteForRelease,
  secretScanningListAlertsForRepo,
  secretScanningGetAlert,
  secretScanningUpdateAlert,
  secretScanningListLocationsForAlert,
  activityListStargazersForRepo,
  reposGetCodeFrequencyStats,
  reposGetCommitActivityStats,
  reposGetContributorsStats,
  reposGetParticipationStats,
  reposGetPunchCardStats,
  reposCreateCommitStatus,
  activityListWatchersForRepo,
  activityGetRepoSubscription,
  activitySetRepoSubscription,
  activityDeleteRepoSubscription,
  reposListTags,
  reposListTagProtection,
  reposCreateTagProtection,
  reposDeleteTagProtection,
  reposDownloadTarballArchive,
  reposListTeams,
  reposGetAllTopics,
  reposReplaceAllTopics,
  reposGetClones,
  reposGetTopPaths,
  reposGetTopReferrers,
  reposGetViews,
  reposTransfer,
  reposCheckVulnerabilityAlerts,
  reposEnableVulnerabilityAlerts,
  reposDisableVulnerabilityAlerts,
  reposDownloadZipballArchive,
  reposCreateUsingTemplate,
};
