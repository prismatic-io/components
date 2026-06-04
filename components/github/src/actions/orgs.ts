import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { events, owner, repo } from "../inputs";
import {
  reposListForOrgExamplePayload,
  orgsListForAuthenticatedUserExamplePayload,
} from "../examplePayloads";

const orgsGet = action({
  display: {
    label: "Orgs Get",
    description: "Get an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const orgsUpdate = action({
  display: {
    label: "Orgs Update",
    description: "Update an organization",
  },
  perform: async (
    context,
    {
      connection,
      org,
      billingEmail,
      company,
      email,
      twitterUsername,
      location,
      name,
      description,
      hasOrganizationProjects,
      hasRepositoryProjects,
      defaultRepositoryPermission,
      membersCanCreateRepositories,
      membersCanCreateInternalRepositories,
      membersCanCreatePrivateRepositories,
      membersCanCreatePublicRepositories,
      membersAllowedRepositoryCreationType,
      membersCanCreatePages,
      membersCanCreatePublicPages,
      membersCanCreatePrivatePages,
      membersCanForkPrivateRepositories,
      blog,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/orgs/${org}`, {
      billing_email: billingEmail,
      company,
      email,
      twitter_username: twitterUsername,
      location,
      name,
      description,
      has_organization_projects: hasOrganizationProjects,
      has_repository_projects: hasRepositoryProjects,
      default_repository_permission: defaultRepositoryPermission,
      members_can_create_repositories: membersCanCreateRepositories,
      members_can_create_internal_repositories:
        membersCanCreateInternalRepositories,
      members_can_create_private_repositories:
        membersCanCreatePrivateRepositories,
      members_can_create_public_repositories:
        membersCanCreatePublicRepositories,
      members_allowed_repository_creation_type:
        membersAllowedRepositoryCreationType,
      members_can_create_pages: membersCanCreatePages,
      members_can_create_public_pages: membersCanCreatePublicPages,
      members_can_create_private_pages: membersCanCreatePrivatePages,
      members_can_fork_private_repositories: membersCanForkPrivateRepositories,
      blog,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    billingEmail: {
      label: "Billing Email",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Billing email address",
    },
    company: {
      label: "Company",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The company name",
    },
    email: {
      label: "Email",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The publicly visible email address",
    },
    twitterUsername: {
      label: "Twitter Username",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The Twitter username of the company",
    },
    location: {
      label: "Location",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The location",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The shorthand name of the company",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The description of the company",
    },
    hasOrganizationProjects: {
      label: "Has Organization Projects",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether an organization can use organization projects",
    },
    hasRepositoryProjects: {
      label: "Has Repository Projects",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether repositories that belong to the organization can use repository projects",
    },
    defaultRepositoryPermission: {
      label: "Default Repository Permission",
      type: "string",
      required: false,
      default: "read",
      model: [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
        { label: "Admin", value: "admin" },
        { label: "None", value: "none" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Default permission level members have for organization repositories",
    },
    membersCanCreateRepositories: {
      label: "Members Can Create Repositories",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether of non-admin organization members can create repositories",
    },
    membersCanCreateInternalRepositories: {
      label: "Members Can Create Internal Repositories",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether organization members can create internal repositories, which are visible to all enterprise members",
    },
    membersCanCreatePrivateRepositories: {
      label: "Members Can Create Private Repositories",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether organization members can create private repositories, which are visible to organization members with permission",
    },
    membersCanCreatePublicRepositories: {
      label: "Members Can Create Public Repositories",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether organization members can create public repositories, which are visible to anyone",
    },
    membersAllowedRepositoryCreationType: {
      label: "Members Allowed Repository Creation Type",
      type: "string",
      required: false,
      model: [
        { label: "All", value: "all" },
        { label: "Private", value: "private" },
        { label: "None", value: "none" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Specifies which types of repositories non-admin organization members can create",
    },
    membersCanCreatePages: {
      label: "Members Can Create Pages",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether organization members can create GitHub Pages sites",
    },
    membersCanCreatePublicPages: {
      label: "Members Can Create Public Pages",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether organization members can create public GitHub Pages sites",
    },
    membersCanCreatePrivatePages: {
      label: "Members Can Create Private Pages",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether organization members can create private GitHub Pages sites",
    },
    membersCanForkPrivateRepositories: {
      label: "Members Can Fork Private Repositories",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether organization members can fork private organization repositories",
    },
    blog: {
      label: "Blog",
      type: "string",
      required: false,
      example: '"http://github.blog"',
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const actionsGetActionsCacheUsageForOrg = action({
  display: {
    label: "Actions Get Actions Cache Usage For Org",
    description: "Get GitHub Actions cache usage for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/actions/cache/usage`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const actionsGetActionsCacheUsageByRepoForOrg = action({
  display: {
    label: "Actions Get Actions Cache Usage By Repo For Org",
    description:
      "List repositories with GitHub Actions cache usage for an organization",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/cache/usage-by-repository`,
      {
        params: { per_page: perPage, page },
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const actionsGetGithubActionsPermissionsOrganization = action({
  display: {
    label: "Actions Get Github Actions Permissions Organization",
    description: "Get GitHub Actions permissions for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/actions/permissions`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const actionsSetGithubActionsPermissionsOrganization = action({
  display: {
    label: "Actions Set Github Actions Permissions Organization",
    description: "Set GitHub Actions permissions for an organization",
  },
  perform: async (
    context,
    { connection, org, enabledRepositories, allowedActions },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/orgs/${org}/actions/permissions`, {
      enabled_repositories: enabledRepositories,
      allowed_actions: allowedActions,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    enabledRepositories: {
      label: "Enabled Repositories",
      type: "string",
      required: true,
      model: [
        { label: "All", value: "all" },
        { label: "None", value: "none" },
        { label: "Selected", value: "selected" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The policy that controls the repositories in the organization that are allowed to run GitHub Actions",
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

const actionsListSelectedRepositoriesEnabledGithubActionsOrganization = action({
  display: {
    label:
      "Actions List Selected Repositories Enabled Github Actions Organization",
    description:
      "List selected repositories enabled for GitHub Actions in an organization",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/permissions/repositories`,
      {
        params: { per_page: perPage, page },
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const actionsSetSelectedRepositoriesEnabledGithubActionsOrganization = action({
  display: {
    label:
      "Actions Set Selected Repositories Enabled Github Actions Organization",
    description:
      "Set selected repositories enabled for GitHub Actions in an organization",
  },
  perform: async (context, { connection, org, selectedRepositoryIds }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/permissions/repositories`,
      {
        selected_repository_ids: selectedRepositoryIds,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    selectedRepositoryIds: {
      label: "Selected Repository Ids",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of repository IDs to enable for GitHub Actions",
    },
  },
});

const actionsEnableSelectedRepositoryGithubActionsOrganization = action({
  display: {
    label: "Actions Enable Selected Repository Github Actions Organization",
    description:
      "Enable a selected repository for GitHub Actions in an organization",
  },
  perform: async (context, { connection, org, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/permissions/repositories/${repositoryId}`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository",
    },
  },
});

const actionsDisableSelectedRepositoryGithubActionsOrganization = action({
  display: {
    label: "Actions Disable Selected Repository Github Actions Organization",
    description:
      "Disable a selected repository for GitHub Actions in an organization",
  },
  perform: async (context, { connection, org, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/actions/permissions/repositories/${repositoryId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository",
    },
  },
});

const actionsGetAllowedActionsOrganization = action({
  display: {
    label: "Actions Get Allowed Actions Organization",
    description:
      "Get allowed actions and reusable workflows for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/permissions/selected-actions`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const actionsSetAllowedActionsOrganization = action({
  display: {
    label: "Actions Set Allowed Actions Organization",
    description:
      "Set allowed actions and reusable workflows for an organization",
  },
  perform: async (
    context,
    { connection, org, githubOwnedAllowed, verifiedAllowed, patternsAllowed },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/permissions/selected-actions`,
      {
        github_owned_allowed: githubOwnedAllowed,
        verified_allowed: verifiedAllowed,
        patterns_allowed: patternsAllowed,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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

const actionsGetGithubActionsDefaultWorkflowPermissionsOrganization = action({
  display: {
    label:
      "Actions Get Github Actions Default Workflow Permissions Organization",
    description: "Get default workflow permissions for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/permissions/workflow`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const actionsSetGithubActionsDefaultWorkflowPermissionsOrganization = action({
  display: {
    label:
      "Actions Set Github Actions Default Workflow Permissions Organization",
    description: "Set default workflow permissions for an organization",
  },
  perform: async (
    context,
    {
      connection,
      org,
      defaultWorkflowPermissions,
      canApprovePullRequestReviews,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/permissions/workflow`,
      {
        default_workflow_permissions: defaultWorkflowPermissions,
        can_approve_pull_request_reviews: canApprovePullRequestReviews,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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

const actionsListSelfHostedRunnerGroupsForOrg = action({
  display: {
    label: "Actions List Self Hosted Runner Groups For Org",
    description: "List self-hosted runner groups for an organization",
  },
  perform: async (
    context,
    { connection, org, perPage, page, visibleToRepository },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/actions/runner-groups`, {
      params: {
        per_page: perPage,
        page,
        visible_to_repository: visibleToRepository,
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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
    visibleToRepository: {
      label: "Visible To Repository",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Only return runner groups that are allowed to be used by this repository",
    },
  },
});

const actionsCreateSelfHostedRunnerGroupForOrg = action({
  display: {
    label: "Actions Create Self Hosted Runner Group For Org",
    description: "Create a self-hosted runner group for an organization",
  },
  perform: async (
    context,
    {
      connection,
      org,
      name,
      visibility,
      selectedRepositoryIds,
      runners,
      allowsPublicRepositories,
      restrictedToWorkflows,
      selectedWorkflows,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/orgs/${org}/actions/runner-groups`, {
      name,
      visibility,
      selected_repository_ids: selectedRepositoryIds,
      runners,
      allows_public_repositories: allowsPublicRepositories,
      restricted_to_workflows: restrictedToWorkflows,
      selected_workflows: selectedWorkflows,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Name of the runner group",
    },
    visibility: {
      label: "Visibility",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "Selected", value: "selected" },
        { label: "All", value: "all" },
        { label: "Private", value: "private" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Visibility of a runner group",
    },
    selectedRepositoryIds: {
      label: "Selected Repository Ids",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of repository IDs that can access the runner group",
    },
    runners: {
      label: "Runners",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of runner IDs to add to the runner group",
    },
    allowsPublicRepositories: {
      label: "Allows Public Repositories",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: 'Whether the runner group can be used by "public" repositories',
    },
    restrictedToWorkflows: {
      label: "Restricted To Workflows",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If "true", the runner group will be restricted to running only the workflows specified in the "selected_workflows" array',
    },
    selectedWorkflows: {
      label: "Selected Workflows",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of workflows the runner group should be allowed to run",
    },
  },
});

const actionsGetSelfHostedRunnerGroupForOrg = action({
  display: {
    label: "Actions Get Self Hosted Runner Group For Org",
    description: "Get a self-hosted runner group for an organization",
  },
  perform: async (context, { connection, org, runnerGroupId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
  },
});

const actionsUpdateSelfHostedRunnerGroupForOrg = action({
  display: {
    label: "Actions Update Self Hosted Runner Group For Org",
    description: "Update a self-hosted runner group for an organization",
  },
  perform: async (
    context,
    {
      connection,
      org,
      runnerGroupId,
      name,
      visibility,
      allowsPublicRepositories,
      restrictedToWorkflows,
      selectedWorkflows,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}`,
      {
        name,
        visibility,
        allows_public_repositories: allowsPublicRepositories,
        restricted_to_workflows: restrictedToWorkflows,
        selected_workflows: selectedWorkflows,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Name of the runner group",
    },
    visibility: {
      label: "Visibility",
      type: "string",
      required: false,
      model: [
        { label: "Selected", value: "selected" },
        { label: "All", value: "all" },
        { label: "Private", value: "private" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Visibility of a runner group",
    },
    allowsPublicRepositories: {
      label: "Allows Public Repositories",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: 'Whether the runner group can be used by "public" repositories',
    },
    restrictedToWorkflows: {
      label: "Restricted To Workflows",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If "true", the runner group will be restricted to running only the workflows specified in the "selected_workflows" array',
    },
    selectedWorkflows: {
      label: "Selected Workflows",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of workflows the runner group should be allowed to run",
    },
  },
});

const actionsDeleteSelfHostedRunnerGroupFromOrg = action({
  display: {
    label: "Actions Delete Self Hosted Runner Group From Org",
    description: "Delete a self-hosted runner group from an organization",
  },
  perform: async (context, { connection, org, runnerGroupId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
  },
});

const actionsListRepoAccessToSelfHostedRunnerGroupInOrg = action({
  display: {
    label: "Actions List Repo Access To Self Hosted Runner Group In Org",
    description:
      "List repository access to a self-hosted runner group in an organization",
  },
  perform: async (
    context,
    { connection, org, runnerGroupId, page, perPage },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories`,
      { params: { page, per_page: perPage } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
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

const actionsSetRepoAccessToSelfHostedRunnerGroupInOrg = action({
  display: {
    label: "Actions Set Repo Access To Self Hosted Runner Group In Org",
    description:
      "Set repository access for a self-hosted runner group in an organization",
  },
  perform: async (
    context,
    { connection, org, runnerGroupId, selectedRepositoryIds },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories`,
      { selected_repository_ids: selectedRepositoryIds },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
    selectedRepositoryIds: {
      label: "Selected Repository Ids",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of repository IDs that can access the runner group",
    },
  },
});

const actionsAddRepoAccessToSelfHostedRunnerGroupInOrg = action({
  display: {
    label: "Actions Add Repo Access To Self Hosted Runner Group In Org",
    description:
      "Add repository access to a self-hosted runner group in an organization",
  },
  perform: async (
    context,
    { connection, org, runnerGroupId, repositoryId },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories/${repositoryId}`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository",
    },
  },
});

const actionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg = action({
  display: {
    label: "Actions Remove Repo Access To Self Hosted Runner Group In Org",
    description:
      "Remove repository access to a self-hosted runner group in an organization",
  },
  perform: async (
    context,
    { connection, org, runnerGroupId, repositoryId },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories/${repositoryId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository",
    },
  },
});

const actionsListSelfHostedRunnersInGroupForOrg = action({
  display: {
    label: "Actions List Self Hosted Runners In Group For Org",
    description: "List self-hosted runners in a group for an organization",
  },
  perform: async (
    context,
    { connection, org, runnerGroupId, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners`,
      { params: { per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
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

const actionsSetSelfHostedRunnersInGroupForOrg = action({
  display: {
    label: "Actions Set Self Hosted Runners In Group For Org",
    description: "Set self-hosted runners in a group for an organization",
  },
  perform: async (context, { connection, org, runnerGroupId, runners }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners`,
      { runners },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
    runners: {
      label: "Runners",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of runner IDs to add to the runner group",
    },
  },
});

const actionsAddSelfHostedRunnerToGroupForOrg = action({
  display: {
    label: "Actions Add Self Hosted Runner To Group For Org",
    description: "Add a self-hosted runner to a group for an organization",
  },
  perform: async (context, { connection, org, runnerGroupId, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners/${runnerId}`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsRemoveSelfHostedRunnerFromGroupForOrg = action({
  display: {
    label: "Actions Remove Self Hosted Runner From Group For Org",
    description: "Remove a self-hosted runner from a group for an organization",
  },
  perform: async (context, { connection, org, runnerGroupId, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners/${runnerId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsListSelfHostedRunnersForOrg = action({
  display: {
    label: "Actions List Self Hosted Runners For Org",
    description: "List self-hosted runners for an organization",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/actions/runners`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const actionsListRunnerApplicationsForOrg = action({
  display: {
    label: "Actions List Runner Applications For Org",
    description: "List runner applications for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/actions/runners/downloads`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const actionsCreateRegistrationTokenForOrg = action({
  display: {
    label: "Actions Create Registration Token For Org",
    description: "Create a registration token for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/actions/runners/registration-token`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const actionsCreateRemoveTokenForOrg = action({
  display: {
    label: "Actions Create Remove Token For Org",
    description: "Create a remove token for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/actions/runners/remove-token`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const actionsGetSelfHostedRunnerForOrg = action({
  display: {
    label: "Actions Get Self Hosted Runner For Org",
    description: "Get a self-hosted runner for an organization",
  },
  perform: async (context, { connection, org, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/runners/${runnerId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsDeleteSelfHostedRunnerFromOrg = action({
  display: {
    label: "Actions Delete Self Hosted Runner From Org",
    description: "Delete a self-hosted runner from an organization",
  },
  perform: async (context, { connection, org, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/actions/runners/${runnerId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsListLabelsForSelfHostedRunnerForOrg = action({
  display: {
    label: "Actions List Labels For Self Hosted Runner For Org",
    description: "List labels for a self-hosted runner for an organization",
  },
  perform: async (context, { connection, org, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/runners/${runnerId}/labels`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsAddCustomLabelsToSelfHostedRunnerForOrg = action({
  display: {
    label: "Actions Add Custom Labels To Self Hosted Runner For Org",
    description:
      "Add custom labels to a self-hosted runner for an organization",
  },
  perform: async (context, { connection, org, runnerId, labels }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/actions/runners/${runnerId}/labels`,
      {
        labels,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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

const actionsSetCustomLabelsForSelfHostedRunnerForOrg = action({
  display: {
    label: "Actions Set Custom Labels For Self Hosted Runner For Org",
    description:
      "Set custom labels for a self-hosted runner for an organization",
  },
  perform: async (context, { connection, org, runnerId, labels }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/runners/${runnerId}/labels`,
      {
        labels,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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

const actionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg = action({
  display: {
    label: "Actions Remove All Custom Labels From Self Hosted Runner For Org",
    description:
      "Remove all custom labels from a self-hosted runner for an organization",
  },
  perform: async (context, { connection, org, runnerId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/actions/runners/${runnerId}/labels`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    runnerId: {
      label: "Runner Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner",
    },
  },
});

const actionsRemoveCustomLabelFromSelfHostedRunnerForOrg = action({
  display: {
    label: "Actions Remove Custom Label From Self Hosted Runner For Org",
    description:
      "Remove a custom label from a self-hosted runner for an organization",
  },
  perform: async (context, { connection, org, runnerId, name }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/actions/runners/${runnerId}/labels/${name}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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

const actionsListOrgSecrets = action({
  display: {
    label: "Actions List Org Secrets",
    description: "List organization secrets",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/actions/secrets`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const actionsGetOrgPublicKey = action({
  display: {
    label: "Actions Get Org Public Key",
    description: "Get an organization public key",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/secrets/public-key`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const actionsGetOrgSecret = action({
  display: {
    label: "Actions Get Org Secret",
    description: "Get an organization secret",
  },
  perform: async (context, { connection, org, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/secrets/${secretName}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const actionsCreateOrUpdateOrgSecret = action({
  display: {
    label: "Actions Create Or Update Org Secret",
    description: "Create or update an organization secret",
  },
  perform: async (
    context,
    {
      connection,
      org,
      secretName,
      encryptedValue,
      keyId,
      visibility,
      selectedRepositoryIds,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/secrets/${secretName}`,
      {
        encrypted_value: encryptedValue,
        key_id: keyId,
        visibility,
        selected_repository_ids: selectedRepositoryIds,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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
    visibility: {
      label: "Visibility",
      type: "string",
      required: true,
      model: [
        { label: "All", value: "all" },
        { label: "Private", value: "private" },
        { label: "Selected", value: "selected" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Which type of organization repositories have access to the organization secret",
    },
    selectedRepositoryIds: {
      label: "Selected Repository Ids",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "An array of repository ids that can access the organization secret",
    },
  },
});

const actionsDeleteOrgSecret = action({
  display: {
    label: "Actions Delete Org Secret",
    description: "Delete an organization secret",
  },
  perform: async (context, { connection, org, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/actions/secrets/${secretName}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const actionsListSelectedReposForOrgSecret = action({
  display: {
    label: "Actions List Selected Repos For Org Secret",
    description: "List selected repositories for an organization secret",
  },
  perform: async (context, { connection, org, secretName, page, perPage }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/actions/secrets/${secretName}/repositories`,
      { params: { page, per_page: perPage } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
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

const actionsSetSelectedReposForOrgSecret = action({
  display: {
    label: "Actions Set Selected Repos For Org Secret",
    description: "Set selected repositories for an organization secret",
  },
  perform: async (
    context,
    { connection, org, secretName, selectedRepositoryIds },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/secrets/${secretName}/repositories`,
      { selected_repository_ids: selectedRepositoryIds },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
    selectedRepositoryIds: {
      label: "Selected Repository Ids",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "An array of repository ids that can access the organization secret",
    },
  },
});

const actionsAddSelectedRepoToOrgSecret = action({
  display: {
    label: "Actions Add Selected Repo To Org Secret",
    description: "Add selected repository to an organization secret",
  },
  perform: async (context, { connection, org, secretName, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/actions/secrets/${secretName}/repositories/${repositoryId}`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const actionsRemoveSelectedRepoFromOrgSecret = action({
  display: {
    label: "Actions Remove Selected Repo From Org Secret",
    description: "Remove selected repository from an organization secret",
  },
  perform: async (context, { connection, org, secretName, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/actions/secrets/${secretName}/repositories/${repositoryId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const orgsGetAuditLog = action({
  display: {
    label: "Orgs Get Audit Log",
    description: "Get the audit log for an organization",
  },
  perform: async (
    context,
    { connection, org, phrase, include, after, before, order, perPage },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/audit-log`, {
      params: { phrase, include, after, before, order, per_page: perPage },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    phrase: {
      label: "Phrase",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A search phrase",
    },
    include: {
      label: "Include",
      type: "string",
      required: false,
      model: [
        { label: "Web", value: "web" },
        { label: "Git", value: "git" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The event types to include:",
    },
    after: {
      label: "After",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A cursor, as given in the [Link header](https://docs",
    },
    before: {
      label: "Before",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A cursor, as given in the [Link header](https://docs",
    },
    order: {
      label: "Order",
      type: "string",
      required: false,
      model: [
        { label: "Desc", value: "desc" },
        { label: "Asc", value: "asc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The order of audit log events",
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

const orgsListBlockedUsers = action({
  display: {
    label: "Orgs List Blocked Users",
    description: "List users blocked by an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/blocks`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const orgsCheckBlockedUser = action({
  display: {
    label: "Orgs Check Blocked User",
    description: "Check if a user is blocked by an organization",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/blocks/${username}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const orgsBlockUser = action({
  display: {
    label: "Orgs Block User",
    description: "Block a user from an organization",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/orgs/${org}/blocks/${username}`, {});
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const orgsUnblockUser = action({
  display: {
    label: "Orgs Unblock User",
    description: "Unblock a user from an organization",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/orgs/${org}/blocks/${username}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const codeScanningListAlertsForOrg = action({
  display: {
    label: "Code Scanning List Alerts For Org",
    description: "List code scanning alerts for an organization",
  },
  perform: async (
    context,
    {
      connection,
      org,
      toolName,
      toolGuid,
      before,
      after,
      page,
      perPage,
      direction,
      state,
      sort,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/code-scanning/alerts`, {
      params: {
        tool_name: toolName,
        tool_guid: toolGuid,
        before,
        after,
        page,
        per_page: perPage,
        direction,
        state,
        sort,
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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
    before: {
      label: "Before",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A cursor, as given in the [Link header](https://docs",
    },
    after: {
      label: "After",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A cursor, as given in the [Link header](https://docs",
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
        'Set to "open", "closed", "fixed", or "dismissed" to list code scanning alerts in a specific state',
    },
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
      comments: "The property by which to sort the results",
    },
  },
});

const orgsListSamlSsoAuthorizations = action({
  display: {
    label: "Orgs List Saml Sso Authorizations",
    description: "List SAML SSO authorizations for an organization",
  },
  perform: async (context, { connection, org, perPage, page, login }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/credential-authorizations`,
      { params: { per_page: perPage, page, login } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page token",
    },
    login: {
      label: "Login",
      type: "string",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Limits the list of credentials authorizations for an organization to a specific login",
    },
  },
});

const orgsRemoveSamlSsoAuthorization = action({
  display: {
    label: "Orgs Remove Saml Sso Authorization",
    description: "Remove a SAML SSO authorization for an organization",
  },
  perform: async (context, { connection, org, credentialId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/credential-authorizations/${credentialId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    credentialId: {
      label: "Credential Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const dependabotListOrgSecrets = action({
  display: {
    label: "Dependabot List Org Secrets",
    description: "List organization secrets",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/dependabot/secrets`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const dependabotGetOrgPublicKey = action({
  display: {
    label: "Dependabot Get Org Public Key",
    description: "Get an organization public key",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/dependabot/secrets/public-key`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const dependabotGetOrgSecret = action({
  display: {
    label: "Dependabot Get Org Secret",
    description: "Get an organization secret",
  },
  perform: async (context, { connection, org, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/dependabot/secrets/${secretName}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const dependabotCreateOrUpdateOrgSecret = action({
  display: {
    label: "Dependabot Create Or Update Org Secret",
    description: "Create or update an organization secret",
  },
  perform: async (
    context,
    {
      connection,
      org,
      secretName,
      encryptedValue,
      keyId,
      visibility,
      selectedRepositoryIds,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/dependabot/secrets/${secretName}`,
      {
        encrypted_value: encryptedValue,
        key_id: keyId,
        visibility,
        selected_repository_ids: selectedRepositoryIds,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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
    visibility: {
      label: "Visibility",
      type: "string",
      required: true,
      model: [
        { label: "All", value: "all" },
        { label: "Private", value: "private" },
        { label: "Selected", value: "selected" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Which type of organization repositories have access to the organization secret",
    },
    selectedRepositoryIds: {
      label: "Selected Repository Ids",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "An array of repository ids that can access the organization secret",
    },
  },
});

const dependabotDeleteOrgSecret = action({
  display: {
    label: "Dependabot Delete Org Secret",
    description: "Delete an organization secret",
  },
  perform: async (context, { connection, org, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/dependabot/secrets/${secretName}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
  },
});

const dependabotListSelectedReposForOrgSecret = action({
  display: {
    label: "Dependabot List Selected Repos For Org Secret",
    description: "List selected repositories for an organization secret",
  },
  perform: async (context, { connection, org, secretName, page, perPage }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/dependabot/secrets/${secretName}/repositories`,
      { params: { page, per_page: perPage } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
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

const dependabotSetSelectedReposForOrgSecret = action({
  display: {
    label: "Dependabot Set Selected Repos For Org Secret",
    description: "Set selected repositories for an organization secret",
  },
  perform: async (
    context,
    { connection, org, secretName, selectedRepositoryIds },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/dependabot/secrets/${secretName}/repositories`,
      { selected_repository_ids: selectedRepositoryIds },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
    selectedRepositoryIds: {
      label: "Selected Repository Ids",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "An array of repository ids that can access the organization secret",
    },
  },
});

const dependabotAddSelectedRepoToOrgSecret = action({
  display: {
    label: "Dependabot Add Selected Repo To Org Secret",
    description: "Add selected repository to an organization secret",
  },
  perform: async (context, { connection, org, secretName, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/dependabot/secrets/${secretName}/repositories/${repositoryId}`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const dependabotRemoveSelectedRepoFromOrgSecret = action({
  display: {
    label: "Dependabot Remove Selected Repo From Org Secret",
    description: "Remove selected repository from an organization secret",
  },
  perform: async (context, { connection, org, secretName, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/dependabot/secrets/${secretName}/repositories/${repositoryId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    secretName: {
      label: "Secret Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the secret",
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const activityListPublicOrgEvents = action({
  display: {
    label: "Activity List Public Org Events",
    description: "List public organization events",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/events`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const teamsExternalIdpGroupInfoForOrg = action({
  display: {
    label: "Teams External Idp Group Info For Org",
    description: "Get an external group",
  },
  perform: async (context, { connection, org, groupId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/external-group/${groupId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    groupId: {
      label: "Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the group",
    },
  },
});

const teamsListExternalIdpGroupsForOrg = action({
  display: {
    label: "Teams List External Idp Groups For Org",
    description: "List external groups in an organization",
  },
  perform: async (context, { connection, org, perPage, page, displayName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/external-groups`, {
      params: { per_page: perPage, page, display_name: displayName },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page token",
    },
    displayName: {
      label: "Display Name",
      type: "string",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Limits the list to groups containing the text in the group name",
    },
  },
});

const orgsListFailedInvitations = action({
  display: {
    label: "Orgs List Failed Invitations",
    description: "List failed organization invitations",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/failed_invitations`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const orgsListWebhooks = action({
  display: {
    label: "Orgs List Webhooks",
    description: "List organization webhooks",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/hooks`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const orgsCreateWebhook = action({
  display: {
    label: "Orgs Create Webhook",
    description: "Create an organization webhook",
  },
  perform: async (
    context,
    { connection, org, name, config, events, active },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/orgs/${org}/hooks`, {
      name,
      config,
      events,
      active,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'Must be passed as "web"',
    },
    config: {
      label: "Config",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Key/value pairs to provide settings for this webhook",
    },
    events,
    active: {
      label: "Active",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Determines if notifications are sent when the webhook is triggered",
    },
  },
});

const orgsGetWebhook = action({
  display: {
    label: "Orgs Get Webhook",
    description: "Get an organization webhook",
  },
  perform: async (context, { connection, org, hookId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/hooks/${hookId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    hookId: {
      label: "Hook Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the hook",
    },
  },
});

const orgsUpdateWebhook = action({
  display: {
    label: "Orgs Update Webhook",
    description: "Update an organization webhook",
  },
  perform: async (
    context,
    { connection, org, hookId, config, events, active, name },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/orgs/${org}/hooks/${hookId}`, {
      config,
      events,
      active,
      name,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    hookId: {
      label: "Hook Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the hook",
    },
    config: {
      label: "Config",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Key/value pairs to provide settings for this webhook",
    },
    events,
    active: {
      label: "Active",
      type: "boolean",
      required: false,
      default: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Determines if notifications are sent when the webhook is triggered",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      example: '"web"',
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const orgsDeleteWebhook = action({
  display: {
    label: "Orgs Delete Webhook",
    description: "Delete an organization webhook",
  },
  perform: async (context, { connection, org, hookId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/orgs/${org}/hooks/${hookId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    hookId: {
      label: "Hook Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the hook",
    },
  },
});

const orgsGetWebhookConfigForOrg = action({
  display: {
    label: "Orgs Get Webhook Config For Org",
    description: "Get a webhook configuration for an organization",
  },
  perform: async (context, { connection, org, hookId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/hooks/${hookId}/config`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    hookId: {
      label: "Hook Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the hook",
    },
  },
});

const orgsUpdateWebhookConfigForOrg = action({
  display: {
    label: "Orgs Update Webhook Config For Org",
    description: "Update a webhook configuration for an organization",
  },
  perform: async (
    context,
    { connection, org, hookId, url, contentType, secret, insecureSsl },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/orgs/${org}/hooks/${hookId}/config`, {
      url,
      content_type: contentType,
      secret,
      insecure_ssl: insecureSsl,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    hookId: {
      label: "Hook Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the hook",
    },
    url: {
      label: "Url",
      type: "string",
      required: false,
      example: "https://example.com/webhook",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The URL to which the payloads will be delivered",
    },
    contentType: {
      label: "Content Type",
      type: "string",
      required: false,
      example: '"json"',
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The media type used to serialize the payloads",
    },
    secret: {
      label: "Secret",
      type: "string",
      required: false,
      example: '"********"',
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'If provided, the "secret" will be used as the "key" to generate the HMAC hex digest value for [delivery signature headers](https://docs',
    },
    insecureSsl: {
      label: "Insecure Ssl",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const orgsListWebhookDeliveries = action({
  display: {
    label: "Orgs List Webhook Deliveries",
    description: "List deliveries for an organization webhook",
  },
  perform: async (context, { connection, org, hookId, perPage, cursor }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/hooks/${hookId}/deliveries`,
      { params: { per_page: perPage, cursor } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    hookId: {
      label: "Hook Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the hook",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    cursor: {
      label: "Cursor",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Used for pagination: the starting delivery from which the page of deliveries is fetched",
    },
  },
});

const orgsGetWebhookDelivery = action({
  display: {
    label: "Orgs Get Webhook Delivery",
    description: "Get a webhook delivery for an organization webhook",
  },
  perform: async (context, { connection, org, hookId, deliveryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/hooks/${hookId}/deliveries/${deliveryId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    hookId: {
      label: "Hook Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the hook",
    },
    deliveryId: {
      label: "Delivery Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const orgsRedeliverWebhookDelivery = action({
  display: {
    label: "Orgs Redeliver Webhook Delivery",
    description: "Redeliver a delivery for an organization webhook",
  },
  perform: async (context, { connection, org, hookId, deliveryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/hooks/${hookId}/deliveries/${deliveryId}/attempts`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    hookId: {
      label: "Hook Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the hook",
    },
    deliveryId: {
      label: "Delivery Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const orgsPingWebhook = action({
  display: {
    label: "Orgs Ping Webhook",
    description: "Ping an organization webhook",
  },
  perform: async (context, { connection, org, hookId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/hooks/${hookId}/pings`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    hookId: {
      label: "Hook Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the hook",
    },
  },
});

const appsGetOrgInstallation = action({
  display: {
    label: "Apps Get Org Installation",
    description: "Get an organization installation for the authenticated app",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/installation`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const orgsListAppInstallations = action({
  display: {
    label: "Orgs List App Installations",
    description: "List app installations for an organization",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/installations`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const interactionsGetRestrictionsForOrg = action({
  display: {
    label: "Interactions Get Restrictions For Org",
    description: "Get interaction restrictions for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/interaction-limits`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const interactionsSetRestrictionsForOrg = action({
  display: {
    label: "Interactions Set Restrictions For Org",
    description: "Set interaction restrictions for an organization",
  },
  perform: async (context, { connection, org, limit, expiry }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/orgs/${org}/interaction-limits`, {
      limit,
      expiry,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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

const interactionsRemoveRestrictionsForOrg = action({
  display: {
    label: "Interactions Remove Restrictions For Org",
    description: "Remove interaction restrictions for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/orgs/${org}/interaction-limits`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const orgsListPendingInvitations = action({
  display: {
    label: "Orgs List Pending Invitations",
    description: "List pending organization invitations",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/invitations`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const orgsCreateInvitation = action({
  display: {
    label: "Orgs Create Invitation",
    description: "Create an organization invitation",
  },
  perform: async (
    context,
    { connection, org, inviteeId, email, role, teamIds },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/orgs/${org}/invitations`, {
      invitee_id: inviteeId,
      email,
      role,
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    inviteeId: {
      label: "Invitee Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: '**Required unless you provide "email"**',
    },
    email: {
      label: "Email",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: '**Required unless you provide "invitee_id"**',
    },
    role: {
      label: "Role",
      type: "string",
      required: false,
      default: "direct_member",
      model: [
        { label: "Admin", value: "admin" },
        { label: "Direct Member", value: "direct_member" },
        { label: "Billing Manager", value: "billing_manager" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The role for the new member",
    },
    teamIds: {
      label: "Team Ids",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Specify IDs for the teams you want to invite new members to",
    },
  },
});

const orgsCancelInvitation = action({
  display: {
    label: "Orgs Cancel Invitation",
    description: "Cancel an organization invitation",
  },
  perform: async (context, { connection, org, invitationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/invitations/${invitationId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    invitationId: {
      label: "Invitation Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the invitation",
    },
  },
});

const orgsListInvitationTeams = action({
  display: {
    label: "Orgs List Invitation Teams",
    description: "List organization invitation teams",
  },
  perform: async (
    context,
    { connection, org, invitationId, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/invitations/${invitationId}/teams`,
      {
        params: { per_page: perPage, page },
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    invitationId: {
      label: "Invitation Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the invitation",
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

const issuesListForOrg = action({
  display: {
    label: "Issues List For Org",
    description: "List organization issues assigned to the authenticated user",
  },
  perform: async (
    context,
    {
      connection,
      org,
      filter,
      state,
      labels,
      sort,
      direction,
      since,
      perPage,
      page,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/issues`, {
      params: {
        filter,
        state,
        labels,
        sort,
        direction,
        since,
        per_page: perPage,
        page,
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    filter: {
      label: "Filter",
      type: "string",
      required: false,
      default: "assigned",
      model: [
        { label: "Assigned", value: "assigned" },
        { label: "Created", value: "created" },
        { label: "Mentioned", value: "mentioned" },
        { label: "Subscribed", value: "subscribed" },
        { label: "Repos", value: "repos" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Indicates which sorts of issues to return",
    },
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
      comments: "Indicates the state of the issues to return",
    },
    labels: {
      label: "Labels",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A list of comma separated label names",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "created",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
        { label: "Comments", value: "comments" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "What to sort results by",
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

const orgsListMembers = action({
  display: {
    label: "Orgs List Members",
    description: "List organization members",
  },
  perform: async (
    context,
    { connection, org, filter, role, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/members`, {
      params: { filter, role, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    filter: {
      label: "Filter",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "2 Fa Disabled", value: "2fa_disabled" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filter members returned in the list",
    },
    role: {
      label: "Role",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "All", value: "all" },
        { label: "Admin", value: "admin" },
        { label: "Member", value: "member" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filter members returned by their role",
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

const orgsCheckMembershipForUser = action({
  display: {
    label: "Orgs Check Membership For User",
    description: "Check organization membership for a user",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/members/${username}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const orgsRemoveMember = action({
  display: {
    label: "Orgs Remove Member",
    description: "Remove an organization member",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/orgs/${org}/members/${username}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const orgsGetMembershipForUser = action({
  display: {
    label: "Orgs Get Membership For User",
    description: "Get organization membership for a user",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/memberships/${username}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const orgsSetMembershipForUser = action({
  display: {
    label: "Orgs Set Membership For User",
    description: "Set organization membership for a user",
  },
  perform: async (context, { connection, org, username, role }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/orgs/${org}/memberships/${username}`, {
      role,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
    role: {
      label: "Role",
      type: "string",
      required: false,
      default: "member",
      model: [
        { label: "Admin", value: "admin" },
        { label: "Member", value: "member" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The role to give the user in the organization",
    },
  },
});

const orgsRemoveMembershipForUser = action({
  display: {
    label: "Orgs Remove Membership For User",
    description: "Remove organization membership for a user",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/memberships/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const migrationsListForOrg = action({
  display: {
    label: "Migrations List For Org",
    description: "List organization migrations",
  },
  perform: async (context, { connection, org, perPage, page, exclude }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/migrations`, {
      params: { per_page: perPage, page, exclude },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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
    exclude: {
      label: "Exclude",
      type: "string",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Exclude attributes from the API response to improve performance",
    },
  },
});

const migrationsStartForOrg = action({
  display: {
    label: "Migrations Start For Org",
    description: "Start an organization migration",
  },
  perform: async (
    context,
    {
      connection,
      org,
      repositories,
      lockRepositories,
      excludeMetadata,
      excludeGitData,
      excludeAttachments,
      excludeReleases,
      excludeOwnerProjects,
      orgMetadataOnly,
      exclude,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/orgs/${org}/migrations`, {
      repositories,
      lock_repositories: lockRepositories,
      exclude_metadata: excludeMetadata,
      exclude_git_data: excludeGitData,
      exclude_attachments: excludeAttachments,
      exclude_releases: excludeReleases,
      exclude_owner_projects: excludeOwnerProjects,
      org_metadata_only: orgMetadataOnly,
      exclude,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    repositories: {
      label: "Repositories",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "A list of arrays indicating which repositories should be migrated",
    },
    lockRepositories: {
      label: "Lock Repositories",
      type: "boolean",
      required: false,
      default: "false",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether repositories should be locked (to prevent manipulation) while migrating data",
    },
    excludeMetadata: {
      label: "Exclude Metadata",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether metadata should be excluded and only git source should be included for the migration",
    },
    excludeGitData: {
      label: "Exclude Git Data",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether the repository git data should be excluded from the migration",
    },
    excludeAttachments: {
      label: "Exclude Attachments",
      type: "boolean",
      required: false,
      default: "false",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether attachments should be excluded from the migration (to reduce migration archive file size)",
    },
    excludeReleases: {
      label: "Exclude Releases",
      type: "boolean",
      required: false,
      default: "false",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether releases should be excluded from the migration (to reduce migration archive file size)",
    },
    excludeOwnerProjects: {
      label: "Exclude Owner Projects",
      type: "boolean",
      required: false,
      default: "false",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether projects owned by the organization or users should be excluded",
    },
    orgMetadataOnly: {
      label: "Org Metadata Only",
      type: "boolean",
      required: false,
      default: "false",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether this should only include organization metadata (repositories array should be empty and will ignore other flags)",
    },
    exclude: {
      label: "Exclude",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const migrationsGetStatusForOrg = action({
  display: {
    label: "Migrations Get Status For Org",
    description: "Get an organization migration status",
  },
  perform: async (context, { connection, org, migrationId, exclude }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/migrations/${migrationId}`,
      { params: { exclude } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    migrationId: {
      label: "Migration Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the migration",
    },
    exclude: {
      label: "Exclude",
      type: "string",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Exclude attributes from the API response to improve performance",
    },
  },
});

const migrationsDownloadArchiveForOrg = action({
  display: {
    label: "Migrations Download Archive For Org",
    description: "Download an organization migration archive",
  },
  perform: async (context, { connection, org, migrationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/migrations/${migrationId}/archive`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    migrationId: {
      label: "Migration Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the migration",
    },
  },
});

const migrationsDeleteArchiveForOrg = action({
  display: {
    label: "Migrations Delete Archive For Org",
    description: "Delete an organization migration archive",
  },
  perform: async (context, { connection, org, migrationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/migrations/${migrationId}/archive`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    migrationId: {
      label: "Migration Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the migration",
    },
  },
});

const migrationsUnlockRepoForOrg = action({
  display: {
    label: "Migrations Unlock Repo For Org",
    description: "Unlock an organization repository",
  },
  perform: async (context, { connection, org, migrationId, repoName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/migrations/${migrationId}/repos/${repoName}/lock`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    migrationId: {
      label: "Migration Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the migration",
    },
    repoName: {
      label: "Repo Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "repo_name parameter",
    },
  },
});

const migrationsListReposForOrg = action({
  display: {
    label: "Migrations List Repos For Org",
    description: "List repositories in an organization migration",
  },
  perform: async (context, { connection, org, migrationId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/migrations/${migrationId}/repositories`,
      { params: { per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    migrationId: {
      label: "Migration Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the migration",
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

const orgsListOutsideCollaborators = action({
  display: {
    label: "Orgs List Outside Collaborators",
    description: "List outside collaborators for an organization",
  },
  perform: async (context, { connection, org, filter, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/outside_collaborators`, {
      params: { filter, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    filter: {
      label: "Filter",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "2 Fa Disabled", value: "2fa_disabled" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filter the list of outside collaborators",
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

const orgsConvertMemberToOutsideCollaborator = action({
  display: {
    label: "Orgs Convert Member To Outside Collaborator",
    description: "Convert an organization member to outside collaborator",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/outside_collaborators/${username}`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const orgsRemoveOutsideCollaborator = action({
  display: {
    label: "Orgs Remove Outside Collaborator",
    description: "Remove outside collaborator from an organization",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/outside_collaborators/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const packagesListPackagesForOrganization = action({
  display: {
    label: "Packages List Packages For Organization",
    description: "List packages for an organization",
  },
  perform: async (context, { connection, org, packageType, visibility }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/packages`, {
      params: { package_type: packageType, visibility },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of supported package",
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
      comments: "The selected visibility of the packages",
    },
  },
});

const packagesGetPackageForOrganization = action({
  display: {
    label: "Packages Get Package For Organization",
    description: "Get a package for an organization",
  },
  perform: async (context, { connection, packageType, packageName, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/packages/${packageType}/${packageName}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of supported package",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package",
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const packagesDeletePackageForOrg = action({
  display: {
    label: "Packages Delete Package For Org",
    description: "Delete a package for an organization",
  },
  perform: async (context, { connection, packageType, packageName, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/packages/${packageType}/${packageName}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of supported package",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package",
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const packagesRestorePackageForOrg = action({
  display: {
    label: "Packages Restore Package For Org",
    description: "Restore a package for an organization",
  },
  perform: async (
    context,
    { connection, packageType, packageName, org, token },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/packages/${packageType}/${packageName}/restore`,
      {},
      { params: { token } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of supported package",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package",
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    token: {
      label: "Token",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "package token",
    },
  },
});

const packagesGetAllPackageVersionsForPackageOwnedByOrg = action({
  display: {
    label: "Packages Get All Package Versions For Package Owned By Org",
    description:
      "Get all package versions for a package owned by an organization",
  },
  perform: async (
    context,
    { connection, packageType, packageName, org, page, perPage, state },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/packages/${packageType}/${packageName}/versions`,
      { params: { page, per_page: perPage, state } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of supported package",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package",
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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
    state: {
      label: "State",
      type: "string",
      required: false,
      default: "active",
      model: [
        { label: "Active", value: "active" },
        { label: "Deleted", value: "deleted" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state of the package, either active or deleted",
    },
  },
});

const packagesGetPackageVersionForOrganization = action({
  display: {
    label: "Packages Get Package Version For Organization",
    description: "Get a package version for an organization",
  },
  perform: async (
    context,
    { connection, packageType, packageName, org, packageVersionId },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/packages/${packageType}/${packageName}/versions/${packageVersionId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of supported package",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package",
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    packageVersionId: {
      label: "Package Version Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the package version",
    },
  },
});

const packagesDeletePackageVersionForOrg = action({
  display: {
    label: "Packages Delete Package Version For Org",
    description: "Delete package version for an organization",
  },
  perform: async (
    context,
    { connection, packageType, packageName, org, packageVersionId },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/packages/${packageType}/${packageName}/versions/${packageVersionId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of supported package",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package",
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    packageVersionId: {
      label: "Package Version Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the package version",
    },
  },
});

const packagesRestorePackageVersionForOrg = action({
  display: {
    label: "Packages Restore Package Version For Org",
    description: "Restore package version for an organization",
  },
  perform: async (
    context,
    { connection, packageType, packageName, org, packageVersionId },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/packages/${packageType}/${packageName}/versions/${packageVersionId}/restore`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of supported package",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package",
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    packageVersionId: {
      label: "Package Version Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the package version",
    },
  },
});

const projectsListForOrg = action({
  display: {
    label: "Projects List For Org",
    description: "List organization projects",
  },
  perform: async (context, { connection, org, state, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/projects`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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

const projectsCreateForOrg = action({
  display: {
    label: "Projects Create For Org",
    description: "Create an organization project",
  },
  perform: async (context, { connection, org, name, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/orgs/${org}/projects`, { name, body });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
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

const orgsListPublicMembers = action({
  display: {
    label: "Orgs List Public Members",
    description: "List public organization members",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/public_members`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const orgsCheckPublicMembershipForUser = action({
  display: {
    label: "Orgs Check Public Membership For User",
    description: "Check public organization membership for a user",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/public_members/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const orgsSetPublicMembershipForAuthenticatedUser = action({
  display: {
    label: "Orgs Set Public Membership For Authenticated User",
    description:
      "Set public organization membership for the authenticated user",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/public_members/${username}`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const orgsRemovePublicMembershipForAuthenticatedUser = action({
  display: {
    label: "Orgs Remove Public Membership For Authenticated User",
    description:
      "Remove public organization membership for the authenticated user",
  },
  perform: async (context, { connection, org, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/public_members/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const reposListForOrg = action({
  display: {
    label: "Repos List For Org",
    description: "List organization repositories",
  },
  examplePayload: reposListForOrgExamplePayload,
  perform: async (
    context,
    { connection, org, type, sort, direction, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/repos`, {
      params: { type, sort, direction, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    type: {
      label: "Type",
      type: "string",
      required: false,
      model: [
        { label: "All", value: "all" },
        { label: "Public", value: "public" },
        { label: "Private", value: "private" },
        { label: "Forks", value: "forks" },
        { label: "Sources", value: "sources" },
        { label: "Member", value: "member" },
        { label: "Internal", value: "internal" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Specifies the types of repositories you want returned",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "created",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
        { label: "Pushed", value: "pushed" },
        { label: "Full Name", value: "full_name" },
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
      comments: "The order to sort by",
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

const reposCreateInOrg = action({
  display: {
    label: "Repos Create In Org",
    description: "Create an organization repository",
  },
  perform: async (
    context,
    {
      connection,
      org,
      name,
      description,
      homepage,
      isPrivate,
      visibility,
      hasIssues,
      hasProjects,
      hasWiki,
      isTemplate,
      teamId,
      autoInit,
      gitignoreTemplate,
      licenseTemplate,
      allowSquashMerge,
      allowMergeCommit,
      allowRebaseMerge,
      allowAutoMerge,
      deleteBranchOnMerge,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/orgs/${org}/repos`, {
      name,
      description,
      homepage,
      private: isPrivate,
      visibility,
      has_issues: hasIssues,
      has_projects: hasProjects,
      has_wiki: hasWiki,
      is_template: isTemplate,
      team_id: teamId,
      auto_init: autoInit,
      gitignore_template: gitignoreTemplate,
      license_template: licenseTemplate,
      allow_squash_merge: allowSquashMerge,
      allow_merge_commit: allowMergeCommit,
      allow_rebase_merge: allowRebaseMerge,
      allow_auto_merge: allowAutoMerge,
      delete_branch_on_merge: deleteBranchOnMerge,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
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
      comments: "Whether the repository is private",
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
    teamId: {
      label: "Team Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        "The id of the team that will be granted access to this repository",
    },
    autoInit: {
      label: "Auto Init",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: 'Pass "true" to create an initial commit with empty README',
    },
    gitignoreTemplate: {
      label: "Gitignore Template",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Desired language or platform [",
    },
    licenseTemplate: {
      label: "License Template",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Choose an [open source license template](https://choosealicense",
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
  },
});

const secretScanningListAlertsForOrg = action({
  display: {
    label: "Secret Scanning List Alerts For Org",
    description: "List secret scanning alerts for an organization",
  },
  perform: async (
    context,
    { connection, org, state, secretType, resolution, page, perPage },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/secret-scanning/alerts`, {
      params: {
        state,
        secret_type: secretType,
        resolution,
        page,
        per_page: perPage,
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    state: {
      label: "State",
      type: "string",
      required: false,
      model: [
        { label: "Open", value: "open" },
        { label: "Resolved", value: "resolved" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Set to "open" or "resolved" to only list secret scanning alerts in a specific state',
    },
    secretType: {
      label: "Secret Type",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A comma-separated list of secret types to return",
    },
    resolution: {
      label: "Resolution",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A comma-separated list of resolutions",
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

const billingGetGithubActionsBillingOrg = action({
  display: {
    label: "Billing Get Github Actions Billing Org",
    description: "Get GitHub Actions billing for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/settings/billing/actions`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const billingGetGithubAdvancedSecurityBillingOrg = action({
  display: {
    label: "Billing Get Github Advanced Security Billing Org",
    description:
      "Get GitHub Advanced Security active committers for an organization",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/settings/billing/advanced-security`,
      {
        params: { per_page: perPage, page },
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const billingGetGithubPackagesBillingOrg = action({
  display: {
    label: "Billing Get Github Packages Billing Org",
    description: "Get GitHub Packages billing for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/settings/billing/packages`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const billingGetSharedStorageBillingOrg = action({
  display: {
    label: "Billing Get Shared Storage Billing Org",
    description: "Get shared storage billing for an organization",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/settings/billing/shared-storage`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
  },
});

const teamsListIdpGroupsForOrg = action({
  display: {
    label: "Teams List Idp Groups For Org",
    description: "List IdP groups for an organization",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/team-sync/groups`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Page token",
    },
  },
});

const teamsList = action({
  display: {
    label: "Teams List",
    description: "List teams",
  },
  perform: async (context, { connection, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/teams`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
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

const teamsCreate = action({
  display: {
    label: "Teams Create",
    description: "Create a team",
  },
  perform: async (
    context,
    {
      connection,
      org,
      name,
      description,
      maintainers,
      repoNames,
      privacy,
      permission,
      parentTeamId,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/orgs/${org}/teams`, {
      name,
      description,
      maintainers,
      repo_names: repoNames,
      privacy,
      permission,
      parent_team_id: parentTeamId,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the team",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The description of the team",
    },
    maintainers: {
      label: "Maintainers",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "List GitHub IDs for organization members who will become team maintainers",
    },
    repoNames: {
      label: "Repo Names",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The full name (e",
    },
    privacy: {
      label: "Privacy",
      type: "string",
      required: false,
      model: [
        { label: "Secret", value: "secret" },
        { label: "Closed", value: "closed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The level of privacy this team should have",
    },
    permission: {
      label: "Permission",
      type: "string",
      required: false,
      default: "pull",
      model: [
        { label: "Pull", value: "pull" },
        { label: "Push", value: "push" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "**Deprecated**",
    },
    parentTeamId: {
      label: "Parent Team Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The ID of a team to set as the parent team",
    },
  },
});

const teamsGetByName = action({
  display: {
    label: "Teams Get By Name",
    description: "Get a team by name",
  },
  perform: async (context, { connection, org, teamSlug }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/teams/${teamSlug}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
  },
});

const teamsUpdateInOrg = action({
  display: {
    label: "Teams Update In Org",
    description: "Update a team",
  },
  perform: async (
    context,
    {
      connection,
      org,
      teamSlug,
      name,
      description,
      privacy,
      permission,
      parentTeamId,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/orgs/${org}/teams/${teamSlug}`, {
      name,
      description,
      privacy,
      permission,
      parent_team_id: parentTeamId,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the team",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The description of the team",
    },
    privacy: {
      label: "Privacy",
      type: "string",
      required: false,
      model: [
        { label: "Secret", value: "secret" },
        { label: "Closed", value: "closed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The level of privacy this team should have",
    },
    permission: {
      label: "Permission",
      type: "string",
      required: false,
      default: "pull",
      model: [
        { label: "Pull", value: "pull" },
        { label: "Push", value: "push" },
        { label: "Admin", value: "admin" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "**Deprecated**",
    },
    parentTeamId: {
      label: "Parent Team Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The ID of a team to set as the parent team",
    },
  },
});

const teamsDeleteInOrg = action({
  display: {
    label: "Teams Delete In Org",
    description: "Delete a team",
  },
  perform: async (context, { connection, org, teamSlug }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/orgs/${org}/teams/${teamSlug}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
  },
});

const teamsListDiscussionsInOrg = action({
  display: {
    label: "Teams List Discussions In Org",
    description: "List discussions",
  },
  perform: async (
    context,
    { connection, org, teamSlug, direction, perPage, page, pinned },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/discussions`,
      {
        params: { direction, per_page: perPage, page, pinned },
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
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
    pinned: {
      label: "Pinned",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Pinned discussions only filter",
    },
  },
});

const teamsCreateDiscussionInOrg = action({
  display: {
    label: "Teams Create Discussion In Org",
    description: "Create a discussion",
  },
  perform: async (
    context,
    { connection, org, teamSlug, title, body, isPrivate },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/teams/${teamSlug}/discussions`,
      {
        title,
        body,
        private: isPrivate,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    title: {
      label: "Title",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion post"s title',
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion post"s body text',
    },
    isPrivate: {
      label: "Private",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Private posts are only visible to team members, organization owners, and team maintainers",
    },
  },
});

const teamsGetDiscussionInOrg = action({
  display: {
    label: "Teams Get Discussion In Org",
    description: "Get a discussion",
  },
  perform: async (context, { connection, org, teamSlug, discussionNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
  },
});

const teamsUpdateDiscussionInOrg = action({
  display: {
    label: "Teams Update Discussion In Org",
    description: "Update a discussion",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, title, body },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}`,
      { title, body },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    title: {
      label: "Title",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion post"s title',
    },
    body: {
      label: "Body",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion post"s body text',
    },
  },
});

const teamsDeleteDiscussionInOrg = action({
  display: {
    label: "Teams Delete Discussion In Org",
    description: "Delete a discussion",
  },
  perform: async (context, { connection, org, teamSlug, discussionNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
  },
});

const teamsListDiscussionCommentsInOrg = action({
  display: {
    label: "Teams List Discussion Comments In Org",
    description: "List discussion comments",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, direction, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments`,
      { params: { direction, per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
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

const teamsCreateDiscussionCommentInOrg = action({
  display: {
    label: "Teams Create Discussion Comment In Org",
    description: "Create a discussion comment",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, body },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments`,
      { body },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion comment"s body text',
    },
  },
});

const teamsGetDiscussionCommentInOrg = action({
  display: {
    label: "Teams Get Discussion Comment In Org",
    description: "Get a discussion comment",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, commentNumber },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
    },
  },
});

const teamsUpdateDiscussionCommentInOrg = action({
  display: {
    label: "Teams Update Discussion Comment In Org",
    description: "Update a discussion comment",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, commentNumber, body },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}`,
      { body },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion comment"s body text',
    },
  },
});

const teamsDeleteDiscussionCommentInOrg = action({
  display: {
    label: "Teams Delete Discussion Comment In Org",
    description: "Delete a discussion comment",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, commentNumber },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
    },
  },
});

const reactionsListForTeamDiscussionCommentInOrg = action({
  display: {
    label: "Reactions List For Team Discussion Comment In Org",
    description: "List reactions for a team discussion comment",
  },
  perform: async (
    context,
    {
      connection,
      org,
      teamSlug,
      discussionNumber,
      commentNumber,
      content,
      perPage,
      page,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}/reactions`,
      { params: { content, per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
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

const reactionsCreateForTeamDiscussionCommentInOrg = action({
  display: {
    label: "Reactions Create For Team Discussion Comment In Org",
    description: "Create reaction for a team discussion comment",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, commentNumber, content },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}/reactions`,
      { content },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
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

const reactionsDeleteForTeamDiscussionComment = action({
  display: {
    label: "Reactions Delete For Team Discussion Comment",
    description: "Delete team discussion comment reaction",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, commentNumber, reactionId },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}/reactions/${reactionId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
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

const reactionsListForTeamDiscussionInOrg = action({
  display: {
    label: "Reactions List For Team Discussion In Org",
    description: "List reactions for a team discussion",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, content, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/reactions`,
      { params: { content, per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
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

const reactionsCreateForTeamDiscussionInOrg = action({
  display: {
    label: "Reactions Create For Team Discussion In Org",
    description: "Create reaction for a team discussion",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, content },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/reactions`,
      { content },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
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

const reactionsDeleteForTeamDiscussion = action({
  display: {
    label: "Reactions Delete For Team Discussion",
    description: "Delete team discussion reaction",
  },
  perform: async (
    context,
    { connection, org, teamSlug, discussionNumber, reactionId },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/reactions/${reactionId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
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

const teamsListLinkedExternalIdpGroupsToTeamForOrg = action({
  display: {
    label: "Teams List Linked External Idp Groups To Team For Org",
    description: "List a connection between an external group and a team",
  },
  perform: async (context, { connection, org, teamSlug }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/external-groups`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
  },
});

const teamsLinkExternalIdpGroupToTeamForOrg = action({
  display: {
    label: "Teams Link External Idp Group To Team For Org",
    description: "Update the connection between an external group and a team",
  },
  perform: async (context, { connection, org, teamSlug, groupId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/orgs/${org}/teams/${teamSlug}/external-groups`,
      {
        group_id: groupId,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    groupId: {
      label: "Group Id",
      type: "string",
      required: true,
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "External Group Id",
    },
  },
});

const teamsUnlinkExternalIdpGroupFromTeamForOrg = action({
  display: {
    label: "Teams Unlink External Idp Group From Team For Org",
    description: "Remove the connection between an external group and a team",
  },
  perform: async (context, { connection, org, teamSlug }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/teams/${teamSlug}/external-groups`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
  },
});

const teamsListPendingInvitationsInOrg = action({
  display: {
    label: "Teams List Pending Invitations In Org",
    description: "List pending team invitations",
  },
  perform: async (context, { connection, org, teamSlug, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/invitations`,
      {
        params: { per_page: perPage, page },
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
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

const teamsListMembersInOrg = action({
  display: {
    label: "Teams List Members In Org",
    description: "List team members",
  },
  perform: async (
    context,
    { connection, org, teamSlug, role, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/members`,
      { params: { role, per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    role: {
      label: "Role",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "Member", value: "member" },
        { label: "Maintainer", value: "maintainer" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filters members returned by their role in the team",
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

const teamsGetMembershipForUserInOrg = action({
  display: {
    label: "Teams Get Membership For User In Org",
    description: "Get team membership for a user",
  },
  perform: async (context, { connection, org, teamSlug, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/memberships/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const teamsAddOrUpdateMembershipForUserInOrg = action({
  display: {
    label: "Teams Add Or Update Membership For User In Org",
    description: "Add or update team membership for a user",
  },
  perform: async (context, { connection, org, teamSlug, username, role }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/teams/${teamSlug}/memberships/${username}`,
      { role },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
    role: {
      label: "Role",
      type: "string",
      required: false,
      default: "member",
      model: [
        { label: "Member", value: "member" },
        { label: "Maintainer", value: "maintainer" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The role that this user should have in the team",
    },
  },
});

const teamsRemoveMembershipForUserInOrg = action({
  display: {
    label: "Teams Remove Membership For User In Org",
    description: "Remove team membership for a user",
  },
  perform: async (context, { connection, org, teamSlug, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/teams/${teamSlug}/memberships/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const teamsListProjectsInOrg = action({
  display: {
    label: "Teams List Projects In Org",
    description: "List team projects",
  },
  perform: async (context, { connection, org, teamSlug, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/projects`,
      { params: { per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
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

const teamsCheckPermissionsForProjectInOrg = action({
  display: {
    label: "Teams Check Permissions For Project In Org",
    description: "Check team permissions for a project",
  },
  perform: async (context, { connection, org, teamSlug, projectId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/projects/${projectId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
  },
});

const teamsAddOrUpdateProjectPermissionsInOrg = action({
  display: {
    label: "Teams Add Or Update Project Permissions In Org",
    description: "Add or update team project permissions",
  },
  perform: async (
    context,
    { connection, org, teamSlug, projectId, permission },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/teams/${teamSlug}/projects/${projectId}`,
      { permission },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
    permission: {
      label: "Permission",
      type: "string",
      required: false,
      model: [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
        { label: "Admin", value: "admin" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The permission to grant to the team for this project",
    },
  },
});

const teamsRemoveProjectInOrg = action({
  display: {
    label: "Teams Remove Project In Org",
    description: "Remove a project from a team",
  },
  perform: async (context, { connection, org, teamSlug, projectId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/teams/${teamSlug}/projects/${projectId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
  },
});

const teamsListReposInOrg = action({
  display: {
    label: "Teams List Repos In Org",
    description: "List team repositories",
  },
  perform: async (context, { connection, org, teamSlug, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/teams/${teamSlug}/repos`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
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

const teamsCheckPermissionsForRepoInOrg = action({
  display: {
    label: "Teams Check Permissions For Repo In Org",
    description: "Check team permissions for a repository",
  },
  perform: async (context, { connection, org, teamSlug, owner, repo }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/repos/${owner}/${repo}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    owner,
    repo,
  },
});

const teamsAddOrUpdateRepoPermissionsInOrg = action({
  display: {
    label: "Teams Add Or Update Repo Permissions In Org",
    description: "Add or update team repository permissions",
  },
  perform: async (
    context,
    { connection, org, teamSlug, owner, repo, permission },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/orgs/${org}/teams/${teamSlug}/repos/${owner}/${repo}`,
      { permission },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    owner,
    repo,
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
      comments: "The permission to grant the team on this repository",
    },
  },
});

const teamsRemoveRepoInOrg = action({
  display: {
    label: "Teams Remove Repo In Org",
    description: "Remove a repository from a team",
  },
  perform: async (context, { connection, org, teamSlug, owner, repo }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/orgs/${org}/teams/${teamSlug}/repos/${owner}/${repo}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    owner,
    repo,
  },
});

const teamsListIdpGroupsInOrg = action({
  display: {
    label: "Teams List Idp Groups In Org",
    description: "List IdP groups for a team",
  },
  perform: async (context, { connection, org, teamSlug }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/orgs/${org}/teams/${teamSlug}/team-sync/group-mappings`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
  },
});

const teamsCreateOrUpdateIdpGroupConnectionsInOrg = action({
  display: {
    label: "Teams Create Or Update Idp Group Connections In Org",
    description: "Create or update IdP group connections",
  },
  perform: async (context, { connection, org, teamSlug, groups }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/orgs/${org}/teams/${teamSlug}/team-sync/group-mappings`,
      { groups },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
    },
    groups: {
      label: "Groups",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The IdP groups you want to connect to a GitHub team",
    },
  },
});

const teamsListChildInOrg = action({
  display: {
    label: "Teams List Child In Org",
    description: "List child teams",
  },
  perform: async (context, { connection, org, teamSlug, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/orgs/${org}/teams/${teamSlug}/teams`, {
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
    org: {
      label: "Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name",
    },
    teamSlug: {
      label: "Team Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug of the team name",
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

export default {
  orgsGet,
  orgsUpdate,
  actionsGetActionsCacheUsageForOrg,
  actionsGetActionsCacheUsageByRepoForOrg,
  actionsGetGithubActionsPermissionsOrganization,
  actionsSetGithubActionsPermissionsOrganization,
  actionsListSelectedRepositoriesEnabledGithubActionsOrganization,
  actionsSetSelectedRepositoriesEnabledGithubActionsOrganization,
  actionsEnableSelectedRepositoryGithubActionsOrganization,
  actionsDisableSelectedRepositoryGithubActionsOrganization,
  actionsGetAllowedActionsOrganization,
  actionsSetAllowedActionsOrganization,
  actionsGetGithubActionsDefaultWorkflowPermissionsOrganization,
  actionsSetGithubActionsDefaultWorkflowPermissionsOrganization,
  actionsListSelfHostedRunnerGroupsForOrg,
  actionsCreateSelfHostedRunnerGroupForOrg,
  actionsGetSelfHostedRunnerGroupForOrg,
  actionsUpdateSelfHostedRunnerGroupForOrg,
  actionsDeleteSelfHostedRunnerGroupFromOrg,
  actionsListRepoAccessToSelfHostedRunnerGroupInOrg,
  actionsSetRepoAccessToSelfHostedRunnerGroupInOrg,
  actionsAddRepoAccessToSelfHostedRunnerGroupInOrg,
  actionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg,
  actionsListSelfHostedRunnersInGroupForOrg,
  actionsSetSelfHostedRunnersInGroupForOrg,
  actionsAddSelfHostedRunnerToGroupForOrg,
  actionsRemoveSelfHostedRunnerFromGroupForOrg,
  actionsListSelfHostedRunnersForOrg,
  actionsListRunnerApplicationsForOrg,
  actionsCreateRegistrationTokenForOrg,
  actionsCreateRemoveTokenForOrg,
  actionsGetSelfHostedRunnerForOrg,
  actionsDeleteSelfHostedRunnerFromOrg,
  actionsListLabelsForSelfHostedRunnerForOrg,
  actionsAddCustomLabelsToSelfHostedRunnerForOrg,
  actionsSetCustomLabelsForSelfHostedRunnerForOrg,
  actionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg,
  actionsRemoveCustomLabelFromSelfHostedRunnerForOrg,
  actionsListOrgSecrets,
  actionsGetOrgPublicKey,
  actionsGetOrgSecret,
  actionsCreateOrUpdateOrgSecret,
  actionsDeleteOrgSecret,
  actionsListSelectedReposForOrgSecret,
  actionsSetSelectedReposForOrgSecret,
  actionsAddSelectedRepoToOrgSecret,
  actionsRemoveSelectedRepoFromOrgSecret,
  orgsGetAuditLog,
  orgsListBlockedUsers,
  orgsCheckBlockedUser,
  orgsBlockUser,
  orgsUnblockUser,
  codeScanningListAlertsForOrg,
  orgsListSamlSsoAuthorizations,
  orgsRemoveSamlSsoAuthorization,
  dependabotListOrgSecrets,
  dependabotGetOrgPublicKey,
  dependabotGetOrgSecret,
  dependabotCreateOrUpdateOrgSecret,
  dependabotDeleteOrgSecret,
  dependabotListSelectedReposForOrgSecret,
  dependabotSetSelectedReposForOrgSecret,
  dependabotAddSelectedRepoToOrgSecret,
  dependabotRemoveSelectedRepoFromOrgSecret,
  activityListPublicOrgEvents,
  teamsExternalIdpGroupInfoForOrg,
  teamsListExternalIdpGroupsForOrg,
  orgsListFailedInvitations,
  orgsListWebhooks,
  orgsCreateWebhook,
  orgsGetWebhook,
  orgsUpdateWebhook,
  orgsDeleteWebhook,
  orgsGetWebhookConfigForOrg,
  orgsUpdateWebhookConfigForOrg,
  orgsListWebhookDeliveries,
  orgsGetWebhookDelivery,
  orgsRedeliverWebhookDelivery,
  orgsPingWebhook,
  appsGetOrgInstallation,
  orgsListAppInstallations,
  interactionsGetRestrictionsForOrg,
  interactionsSetRestrictionsForOrg,
  interactionsRemoveRestrictionsForOrg,
  orgsListPendingInvitations,
  orgsCreateInvitation,
  orgsCancelInvitation,
  orgsListInvitationTeams,
  issuesListForOrg,
  orgsListMembers,
  orgsCheckMembershipForUser,
  orgsRemoveMember,
  orgsGetMembershipForUser,
  orgsSetMembershipForUser,
  orgsRemoveMembershipForUser,
  migrationsListForOrg,
  migrationsStartForOrg,
  migrationsGetStatusForOrg,
  migrationsDownloadArchiveForOrg,
  migrationsDeleteArchiveForOrg,
  migrationsUnlockRepoForOrg,
  migrationsListReposForOrg,
  orgsListOutsideCollaborators,
  orgsConvertMemberToOutsideCollaborator,
  orgsRemoveOutsideCollaborator,
  packagesListPackagesForOrganization,
  packagesGetPackageForOrganization,
  packagesDeletePackageForOrg,
  packagesRestorePackageForOrg,
  packagesGetAllPackageVersionsForPackageOwnedByOrg,
  packagesGetPackageVersionForOrganization,
  packagesDeletePackageVersionForOrg,
  packagesRestorePackageVersionForOrg,
  projectsListForOrg,
  projectsCreateForOrg,
  orgsListPublicMembers,
  orgsCheckPublicMembershipForUser,
  orgsSetPublicMembershipForAuthenticatedUser,
  orgsRemovePublicMembershipForAuthenticatedUser,
  reposListForOrg,
  reposCreateInOrg,
  secretScanningListAlertsForOrg,
  billingGetGithubActionsBillingOrg,
  billingGetGithubAdvancedSecurityBillingOrg,
  billingGetGithubPackagesBillingOrg,
  billingGetSharedStorageBillingOrg,
  teamsListIdpGroupsForOrg,
  teamsList,
  teamsCreate,
  teamsGetByName,
  teamsUpdateInOrg,
  teamsDeleteInOrg,
  teamsListDiscussionsInOrg,
  teamsCreateDiscussionInOrg,
  teamsGetDiscussionInOrg,
  teamsUpdateDiscussionInOrg,
  teamsDeleteDiscussionInOrg,
  teamsListDiscussionCommentsInOrg,
  teamsCreateDiscussionCommentInOrg,
  teamsGetDiscussionCommentInOrg,
  teamsUpdateDiscussionCommentInOrg,
  teamsDeleteDiscussionCommentInOrg,
  reactionsListForTeamDiscussionCommentInOrg,
  reactionsCreateForTeamDiscussionCommentInOrg,
  reactionsDeleteForTeamDiscussionComment,
  reactionsListForTeamDiscussionInOrg,
  reactionsCreateForTeamDiscussionInOrg,
  reactionsDeleteForTeamDiscussion,
  teamsListLinkedExternalIdpGroupsToTeamForOrg,
  teamsLinkExternalIdpGroupToTeamForOrg,
  teamsUnlinkExternalIdpGroupFromTeamForOrg,
  teamsListPendingInvitationsInOrg,
  teamsListMembersInOrg,
  teamsGetMembershipForUserInOrg,
  teamsAddOrUpdateMembershipForUserInOrg,
  teamsRemoveMembershipForUserInOrg,
  teamsListProjectsInOrg,
  teamsCheckPermissionsForProjectInOrg,
  teamsAddOrUpdateProjectPermissionsInOrg,
  teamsRemoveProjectInOrg,
  teamsListReposInOrg,
  teamsCheckPermissionsForRepoInOrg,
  teamsAddOrUpdateRepoPermissionsInOrg,
  teamsRemoveRepoInOrg,
  teamsListIdpGroupsInOrg,
  teamsCreateOrUpdateIdpGroupConnectionsInOrg,
  teamsListChildInOrg,
};
