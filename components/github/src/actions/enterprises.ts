import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const actionsGetActionsCacheUsageForEnterprise = action({
  display: {
    label: "Actions Get Actions Cache Usage For Enterprise",
    description: "Get GitHub Actions cache usage for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/cache/usage`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

const enterpriseAdminGetGithubActionsPermissionsEnterprise = action({
  display: {
    label: "Enterprise Admin Get Github Actions Permissions Enterprise",
    description: "Get GitHub Actions permissions for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/permissions`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

const enterpriseAdminSetGithubActionsPermissionsEnterprise = action({
  display: {
    label: "Enterprise Admin Set Github Actions Permissions Enterprise",
    description: "Set GitHub Actions permissions for an enterprise",
  },
  perform: async (
    context,
    { connection, enterprise, enabledOrganizations, allowedActions },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/enterprises/${enterprise}/actions/permissions`,
      {
        enabled_organizations: enabledOrganizations,
        allowed_actions: allowedActions,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
    enabledOrganizations: {
      label: "Enabled Organizations",
      type: "string",
      required: true,
      model: [
        { label: "All", value: "all" },
        { label: "None", value: "none" },
        { label: "Selected", value: "selected" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The policy that controls the organizations in the enterprise that are allowed to run GitHub Actions",
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

const enterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterprise =
  action({
    display: {
      label:
        "Enterprise Admin List Selected Organizations Enabled Github Actions Enterprise",
      description:
        "List selected organizations enabled for GitHub Actions in an enterprise",
    },
    perform: async (context, { connection, enterprise, perPage, page }) => {
      const client = createClient(
        connection as Connection,
        context.debug.enabled,
      );
      const { data } = await client.get(
        `/enterprises/${enterprise}/actions/permissions/organizations`,
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
      enterprise: {
        label: "Enterprise",
        type: "string",
        required: true,
        clean: (value) => util.types.toString(value) || undefined,
        comments: "The slug version of the enterprise name",
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

const enterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterprise =
  action({
    display: {
      label:
        "Enterprise Admin Set Selected Organizations Enabled Github Actions Enterprise",
      description:
        "Set selected organizations enabled for GitHub Actions in an enterprise",
    },
    perform: async (
      context,
      { connection, enterprise, selectedOrganizationIds },
    ) => {
      const client = createClient(
        connection as Connection,
        context.debug.enabled,
      );
      const { data } = await client.put(
        `/enterprises/${enterprise}/actions/permissions/organizations`,
        { selected_organization_ids: selectedOrganizationIds },
      );
      return { data };
    },
    inputs: {
      connection: {
        label: "Connection",
        type: "connection",
        required: true,
      },
      enterprise: {
        label: "Enterprise",
        type: "string",
        required: true,
        clean: (value) => util.types.toString(value) || undefined,
        comments: "The slug version of the enterprise name",
      },
      selectedOrganizationIds: {
        label: "Selected Organization Ids",
        type: "string",
        required: true,
        clean: (value) => util.types.toString(value) || undefined,
        comments: "List of organization IDs to enable for GitHub Actions",
      },
    },
  });

const enterpriseAdminEnableSelectedOrganizationGithubActionsEnterprise = action(
  {
    display: {
      label:
        "Enterprise Admin Enable Selected Organization Github Actions Enterprise",
      description:
        "Enable a selected organization for GitHub Actions in an enterprise",
    },
    perform: async (context, { connection, enterprise, orgId }) => {
      const client = createClient(
        connection as Connection,
        context.debug.enabled,
      );
      const { data } = await client.put(
        `/enterprises/${enterprise}/actions/permissions/organizations/${orgId}`,
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
      enterprise: {
        label: "Enterprise",
        type: "string",
        required: true,
        clean: (value) => util.types.toString(value) || undefined,
        comments: "The slug version of the enterprise name",
      },
      orgId: {
        label: "Org Id",
        type: "string",
        required: true,
        clean: (value) => util.types.toNumber(value) || undefined,
        comments: "The unique identifier of the organization",
      },
    },
  },
);

const enterpriseAdminDisableSelectedOrganizationGithubActionsEnterprise =
  action({
    display: {
      label:
        "Enterprise Admin Disable Selected Organization Github Actions Enterprise",
      description:
        "Disable a selected organization for GitHub Actions in an enterprise",
    },
    perform: async (context, { connection, enterprise, orgId }) => {
      const client = createClient(
        connection as Connection,
        context.debug.enabled,
      );
      const { data } = await client.delete(
        `/enterprises/${enterprise}/actions/permissions/organizations/${orgId}`,
      );
      return { data };
    },
    inputs: {
      connection: {
        label: "Connection",
        type: "connection",
        required: true,
      },
      enterprise: {
        label: "Enterprise",
        type: "string",
        required: true,
        clean: (value) => util.types.toString(value) || undefined,
        comments: "The slug version of the enterprise name",
      },
      orgId: {
        label: "Org Id",
        type: "string",
        required: true,
        clean: (value) => util.types.toNumber(value) || undefined,
        comments: "The unique identifier of the organization",
      },
    },
  });

const enterpriseAdminGetAllowedActionsEnterprise = action({
  display: {
    label: "Enterprise Admin Get Allowed Actions Enterprise",
    description: "Get allowed actions and reusable workflows for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/permissions/selected-actions`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

const enterpriseAdminSetAllowedActionsEnterprise = action({
  display: {
    label: "Enterprise Admin Set Allowed Actions Enterprise",
    description: "Set allowed actions and reusable workflows for an enterprise",
  },
  perform: async (
    context,
    {
      connection,
      enterprise,
      githubOwnedAllowed,
      verifiedAllowed,
      patternsAllowed,
    },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/enterprises/${enterprise}/actions/permissions/selected-actions`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const actionsGetGithubActionsDefaultWorkflowPermissionsEnterprise = action({
  display: {
    label: "Actions Get Github Actions Default Workflow Permissions Enterprise",
    description: "Get default workflow permissions for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/permissions/workflow`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

const actionsSetGithubActionsDefaultWorkflowPermissionsEnterprise = action({
  display: {
    label: "Actions Set Github Actions Default Workflow Permissions Enterprise",
    description: "Set default workflow permissions for an enterprise",
  },
  perform: async (
    context,
    {
      connection,
      enterprise,
      defaultWorkflowPermissions,
      canApprovePullRequestReviews,
    },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/enterprises/${enterprise}/actions/permissions/workflow`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminListSelfHostedRunnerGroupsForEnterprise = action({
  display: {
    label: "Enterprise Admin List Self Hosted Runner Groups For Enterprise",
    description: "List self-hosted runner groups for an enterprise",
  },
  perform: async (
    context,
    { connection, enterprise, perPage, page, visibleToOrganization },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/runner-groups`,
      {
        params: {
          per_page: perPage,
          page,
          visible_to_organization: visibleToOrganization,
        },
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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
    visibleToOrganization: {
      label: "Visible To Organization",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Only return runner groups that are allowed to be used by this organization",
    },
  },
});

const enterpriseAdminCreateSelfHostedRunnerGroupForEnterprise = action({
  display: {
    label: "Enterprise Admin Create Self Hosted Runner Group For Enterprise",
    description: "Create a self-hosted runner group for an enterprise",
  },
  perform: async (
    context,
    {
      connection,
      enterprise,
      name,
      visibility,
      selectedOrganizationIds,
      runners,
      allowsPublicRepositories,
      restrictedToWorkflows,
      selectedWorkflows,
    },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/enterprises/${enterprise}/actions/runner-groups`,
      {
        name,
        visibility,
        selected_organization_ids: selectedOrganizationIds,
        runners,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Visibility of a runner group",
    },
    selectedOrganizationIds: {
      label: "Selected Organization Ids",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of organization IDs that can access the runner group",
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

const enterpriseAdminGetSelfHostedRunnerGroupForEnterprise = action({
  display: {
    label: "Enterprise Admin Get Self Hosted Runner Group For Enterprise",
    description: "Get a self-hosted runner group for an enterprise",
  },
  perform: async (context, { connection, enterprise, runnerGroupId }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminUpdateSelfHostedRunnerGroupForEnterprise = action({
  display: {
    label: "Enterprise Admin Update Self Hosted Runner Group For Enterprise",
    description: "Update a self-hosted runner group for an enterprise",
  },
  perform: async (
    context,
    {
      connection,
      enterprise,
      runnerGroupId,
      name,
      visibility,
      allowsPublicRepositories,
      restrictedToWorkflows,
      selectedWorkflows,
    },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.patch(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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
      required: false,
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

const enterpriseAdminDeleteSelfHostedRunnerGroupFromEnterprise = action({
  display: {
    label: "Enterprise Admin Delete Self Hosted Runner Group From Enterprise",
    description: "Delete a self-hosted runner group from an enterprise",
  },
  perform: async (context, { connection, enterprise, runnerGroupId }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterprise = action({
  display: {
    label:
      "Enterprise Admin List Org Access To Self Hosted Runner Group In Enterprise",
    description:
      "List organization access to a self-hosted runner group in an enterprise",
  },
  perform: async (
    context,
    { connection, enterprise, runnerGroupId, perPage, page },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/organizations`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterprise = action({
  display: {
    label:
      "Enterprise Admin Set Org Access To Self Hosted Runner Group In Enterprise",
    description:
      "Set organization access for a self-hosted runner group in an enterprise",
  },
  perform: async (
    context,
    { connection, enterprise, runnerGroupId, selectedOrganizationIds },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/organizations`,
      { selected_organization_ids: selectedOrganizationIds },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
    selectedOrganizationIds: {
      label: "Selected Organization Ids",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of organization IDs that can access the runner group",
    },
  },
});

const enterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterprise = action({
  display: {
    label:
      "Enterprise Admin Add Org Access To Self Hosted Runner Group In Enterprise",
    description:
      "Add organization access to a self-hosted runner group in an enterprise",
  },
  perform: async (
    context,
    { connection, enterprise, runnerGroupId, orgId },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/organizations/${orgId}`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
    runnerGroupId: {
      label: "Runner Group Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the self-hosted runner group",
    },
    orgId: {
      label: "Org Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the organization",
    },
  },
});

const enterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterprise =
  action({
    display: {
      label:
        "Enterprise Admin Remove Org Access To Self Hosted Runner Group In Enterprise",
      description:
        "Remove organization access to a self-hosted runner group in an enterprise",
    },
    perform: async (
      context,
      { connection, enterprise, runnerGroupId, orgId },
    ) => {
      const client = createClient(
        connection as Connection,
        context.debug.enabled,
      );
      const { data } = await client.delete(
        `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/organizations/${orgId}`,
      );
      return { data };
    },
    inputs: {
      connection: {
        label: "Connection",
        type: "connection",
        required: true,
      },
      enterprise: {
        label: "Enterprise",
        type: "string",
        required: true,
        clean: (value) => util.types.toString(value) || undefined,
        comments: "The slug version of the enterprise name",
      },
      runnerGroupId: {
        label: "Runner Group Id",
        type: "string",
        required: true,
        clean: (value) => util.types.toNumber(value) || undefined,
        comments: "Unique identifier of the self-hosted runner group",
      },
      orgId: {
        label: "Org Id",
        type: "string",
        required: true,
        clean: (value) => util.types.toNumber(value) || undefined,
        comments: "The unique identifier of the organization",
      },
    },
  });

const enterpriseAdminListSelfHostedRunnersInGroupForEnterprise = action({
  display: {
    label: "Enterprise Admin List Self Hosted Runners In Group For Enterprise",
    description: "List self-hosted runners in a group for an enterprise",
  },
  perform: async (
    context,
    { connection, enterprise, runnerGroupId, perPage, page },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/runners`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminSetSelfHostedRunnersInGroupForEnterprise = action({
  display: {
    label: "Enterprise Admin Set Self Hosted Runners In Group For Enterprise",
    description: "Set self-hosted runners in a group for an enterprise",
  },
  perform: async (
    context,
    { connection, enterprise, runnerGroupId, runners },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/runners`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminAddSelfHostedRunnerToGroupForEnterprise = action({
  display: {
    label: "Enterprise Admin Add Self Hosted Runner To Group For Enterprise",
    description: "Add a self-hosted runner to a group for an enterprise",
  },
  perform: async (
    context,
    { connection, enterprise, runnerGroupId, runnerId },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/runners/${runnerId}`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterprise = action({
  display: {
    label:
      "Enterprise Admin Remove Self Hosted Runner From Group For Enterprise",
    description: "Remove a self-hosted runner from a group for an enterprise",
  },
  perform: async (
    context,
    { connection, enterprise, runnerGroupId, runnerId },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/runners/${runnerId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminListSelfHostedRunnersForEnterprise = action({
  display: {
    label: "Enterprise Admin List Self Hosted Runners For Enterprise",
    description: "List self-hosted runners for an enterprise",
  },
  perform: async (context, { connection, enterprise, perPage, page }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/runners`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminListRunnerApplicationsForEnterprise = action({
  display: {
    label: "Enterprise Admin List Runner Applications For Enterprise",
    description: "List runner applications for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/runners/downloads`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

const enterpriseAdminCreateRegistrationTokenForEnterprise = action({
  display: {
    label: "Enterprise Admin Create Registration Token For Enterprise",
    description: "Create a registration token for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/enterprises/${enterprise}/actions/runners/registration-token`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

const enterpriseAdminCreateRemoveTokenForEnterprise = action({
  display: {
    label: "Enterprise Admin Create Remove Token For Enterprise",
    description: "Create a remove token for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/enterprises/${enterprise}/actions/runners/remove-token`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

const enterpriseAdminGetSelfHostedRunnerForEnterprise = action({
  display: {
    label: "Enterprise Admin Get Self Hosted Runner For Enterprise",
    description: "Get a self-hosted runner for an enterprise",
  },
  perform: async (context, { connection, enterprise, runnerId }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/runners/${runnerId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminDeleteSelfHostedRunnerFromEnterprise = action({
  display: {
    label: "Enterprise Admin Delete Self Hosted Runner From Enterprise",
    description: "Delete a self-hosted runner from an enterprise",
  },
  perform: async (context, { connection, enterprise, runnerId }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/enterprises/${enterprise}/actions/runners/${runnerId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminListLabelsForSelfHostedRunnerForEnterprise = action({
  display: {
    label: "Enterprise Admin List Labels For Self Hosted Runner For Enterprise",
    description: "List labels for a self-hosted runner for an enterprise",
  },
  perform: async (context, { connection, enterprise, runnerId }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/actions/runners/${runnerId}/labels`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminAddCustomLabelsToSelfHostedRunnerForEnterprise = action({
  display: {
    label:
      "Enterprise Admin Add Custom Labels To Self Hosted Runner For Enterprise",
    description: "Add custom labels to a self-hosted runner for an enterprise",
  },
  perform: async (context, { connection, enterprise, runnerId, labels }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/enterprises/${enterprise}/actions/runners/${runnerId}/labels`,
      { labels },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminSetCustomLabelsForSelfHostedRunnerForEnterprise = action({
  display: {
    label:
      "Enterprise Admin Set Custom Labels For Self Hosted Runner For Enterprise",
    description: "Set custom labels for a self-hosted runner for an enterprise",
  },
  perform: async (context, { connection, enterprise, runnerId, labels }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/enterprises/${enterprise}/actions/runners/${runnerId}/labels`,
      { labels },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const enterpriseAdminRemoveAllCustomLabelsFromSelfHostedRunnerForEnterprise =
  action({
    display: {
      label:
        "Enterprise Admin Remove All Custom Labels From Self Hosted Runner For Enterprise",
      description:
        "Remove all custom labels from a self-hosted runner for an enterprise",
    },
    perform: async (context, { connection, enterprise, runnerId }) => {
      const client = createClient(
        connection as Connection,
        context.debug.enabled,
      );
      const { data } = await client.delete(
        `/enterprises/${enterprise}/actions/runners/${runnerId}/labels`,
      );
      return { data };
    },
    inputs: {
      connection: {
        label: "Connection",
        type: "connection",
        required: true,
      },
      enterprise: {
        label: "Enterprise",
        type: "string",
        required: true,
        clean: (value) => util.types.toString(value) || undefined,
        comments: "The slug version of the enterprise name",
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

const enterpriseAdminRemoveCustomLabelFromSelfHostedRunnerForEnterprise =
  action({
    display: {
      label:
        "Enterprise Admin Remove Custom Label From Self Hosted Runner For Enterprise",
      description:
        "Remove a custom label from a self-hosted runner for an enterprise",
    },
    perform: async (context, { connection, enterprise, runnerId, name }) => {
      const client = createClient(
        connection as Connection,
        context.debug.enabled,
      );
      const { data } = await client.delete(
        `/enterprises/${enterprise}/actions/runners/${runnerId}/labels/${name}`,
      );
      return { data };
    },
    inputs: {
      connection: {
        label: "Connection",
        type: "connection",
        required: true,
      },
      enterprise: {
        label: "Enterprise",
        type: "string",
        required: true,
        clean: (value) => util.types.toString(value) || undefined,
        comments: "The slug version of the enterprise name",
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

const enterpriseAdminGetAuditLog = action({
  display: {
    label: "Enterprise Admin Get Audit Log",
    description: "Get the audit log for an enterprise",
  },
  perform: async (
    context,
    {
      connection,
      enterprise,
      phrase,
      include,
      after,
      before,
      order,
      page,
      perPage,
    },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/enterprises/${enterprise}/audit-log`, {
      params: {
        phrase,
        include,
        after,
        before,
        order,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const secretScanningListAlertsForEnterprise = action({
  display: {
    label: "Secret Scanning List Alerts For Enterprise",
    description: "List secret scanning alerts for an enterprise",
  },
  perform: async (
    context,
    {
      connection,
      enterprise,
      state,
      secretType,
      resolution,
      perPage,
      before,
      after,
    },
  ) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/secret-scanning/alerts`,
      {
        params: {
          state,
          secret_type: secretType,
          resolution,
          per_page: perPage,
          before,
          after,
        },
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
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
  },
});

const billingGetGithubActionsBillingGhe = action({
  display: {
    label: "Billing Get Github Actions Billing Ghe",
    description: "Get GitHub Actions billing for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/settings/billing/actions`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

const billingGetGithubAdvancedSecurityBillingGhe = action({
  display: {
    label: "Billing Get Github Advanced Security Billing Ghe",
    description:
      "Get GitHub Advanced Security active committers for an enterprise",
  },
  perform: async (context, { connection, enterprise, perPage, page }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/settings/billing/advanced-security`,
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
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
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

const billingGetGithubPackagesBillingGhe = action({
  display: {
    label: "Billing Get Github Packages Billing Ghe",
    description: "Get GitHub Packages billing for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/settings/billing/packages`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

const billingGetSharedStorageBillingGhe = action({
  display: {
    label: "Billing Get Shared Storage Billing Ghe",
    description: "Get shared storage billing for an enterprise",
  },
  perform: async (context, { connection, enterprise }) => {
    const client = createClient(
      connection as Connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/enterprises/${enterprise}/settings/billing/shared-storage`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterprise: {
      label: "Enterprise",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The slug version of the enterprise name",
    },
  },
});

export default {
  actionsGetActionsCacheUsageForEnterprise,
  enterpriseAdminGetGithubActionsPermissionsEnterprise,
  enterpriseAdminSetGithubActionsPermissionsEnterprise,
  enterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterprise,
  enterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterprise,
  enterpriseAdminEnableSelectedOrganizationGithubActionsEnterprise,
  enterpriseAdminDisableSelectedOrganizationGithubActionsEnterprise,
  enterpriseAdminGetAllowedActionsEnterprise,
  enterpriseAdminSetAllowedActionsEnterprise,
  actionsGetGithubActionsDefaultWorkflowPermissionsEnterprise,
  actionsSetGithubActionsDefaultWorkflowPermissionsEnterprise,
  enterpriseAdminListSelfHostedRunnerGroupsForEnterprise,
  enterpriseAdminCreateSelfHostedRunnerGroupForEnterprise,
  enterpriseAdminGetSelfHostedRunnerGroupForEnterprise,
  enterpriseAdminUpdateSelfHostedRunnerGroupForEnterprise,
  enterpriseAdminDeleteSelfHostedRunnerGroupFromEnterprise,
  enterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterprise,
  enterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterprise,
  enterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterprise,
  enterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterprise,
  enterpriseAdminListSelfHostedRunnersInGroupForEnterprise,
  enterpriseAdminSetSelfHostedRunnersInGroupForEnterprise,
  enterpriseAdminAddSelfHostedRunnerToGroupForEnterprise,
  enterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterprise,
  enterpriseAdminListSelfHostedRunnersForEnterprise,
  enterpriseAdminListRunnerApplicationsForEnterprise,
  enterpriseAdminCreateRegistrationTokenForEnterprise,
  enterpriseAdminCreateRemoveTokenForEnterprise,
  enterpriseAdminGetSelfHostedRunnerForEnterprise,
  enterpriseAdminDeleteSelfHostedRunnerFromEnterprise,
  enterpriseAdminListLabelsForSelfHostedRunnerForEnterprise,
  enterpriseAdminAddCustomLabelsToSelfHostedRunnerForEnterprise,
  enterpriseAdminSetCustomLabelsForSelfHostedRunnerForEnterprise,
  enterpriseAdminRemoveAllCustomLabelsFromSelfHostedRunnerForEnterprise,
  enterpriseAdminRemoveCustomLabelFromSelfHostedRunnerForEnterprise,
  enterpriseAdminGetAuditLog,
  secretScanningListAlertsForEnterprise,
  billingGetGithubActionsBillingGhe,
  billingGetGithubAdvancedSecurityBillingGhe,
  billingGetGithubPackagesBillingGhe,
  billingGetSharedStorageBillingGhe,
};
