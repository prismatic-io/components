import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { usersGetByUsernameExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

const usersList = action({
  display: {
    label: "Users List",
    description: "List users",
  },
  perform: async (context, { connection, since, perPage }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users`, {
      params: { since, per_page: perPage },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      placeholder: "Enter user ID",
      example: "123456",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Only return users with an ID greater than this ID.",
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

const usersGetByUsername = action({
  display: {
    label: "Users Get By Username",
    description: "Get a user",
  },
  examplePayload: usersGetByUsernameExamplePayload,
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
  },
});

const activityListEventsForAuthenticatedUser = action({
  display: {
    label: "Activity List Events For Authenticated User",
    description: "List events for the authenticated user",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/events`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

const activityListOrgEventsForAuthenticatedUser = action({
  display: {
    label: "Activity List Org Events For Authenticated User",
    description: "List organization events for the authenticated user",
  },
  perform: async (context, { connection, username, org, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/events/orgs/${org}`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
    org: {
      label: "Org",
      type: "string",
      required: true,
      placeholder: "Enter organization name",
      example: "github",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The organization name.",
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

const activityListPublicEventsForUser = action({
  display: {
    label: "Activity List Public Events For User",
    description: "List public events for a user",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/events/public`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

const usersListFollowersForUser = action({
  display: {
    label: "Users List Followers For User",
    description: "List followers of a user",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/followers`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

const usersListFollowingForUser = action({
  display: {
    label: "Users List Following For User",
    description: "List the people a user follows",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/following`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

const usersCheckFollowingForUser = action({
  display: {
    label: "Users Check Following For User",
    description: "Check if a user follows another user",
  },
  perform: async (context, { connection, username, targetUser }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/users/${username}/following/${targetUser}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
    targetUser: {
      label: "Target User",
      type: "string",
      required: true,
      placeholder: "Enter target username",
      example: "torvalds",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The username to check.",
    },
  },
});

const gistsListForUser = action({
  display: {
    label: "Gists List For User",
    description: "List gists for a user",
  },
  perform: async (context, { connection, username, since, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/gists`, {
      params: { since, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      placeholder: "Enter timestamp (ISO 8601 format)",
      example: "2024-01-15T10:30:00Z",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Only show items updated after the given timestamp in ISO 8601 format.",
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

const usersListGpgKeysForUser = action({
  display: {
    label: "Users List Gpg Keys For User",
    description: "List GPG keys for a user",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/gpg_keys`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

const usersGetContextForUser = action({
  display: {
    label: "Users Get Context For User",
    description: "Get contextual information for a user",
  },
  perform: async (
    context,
    { connection, username, subjectType, subjectId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/hovercard`, {
      params: { subject_type: subjectType, subject_id: subjectId },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
    subjectType: {
      label: "Subject Type",
      type: "string",
      required: false,
      placeholder: "Select subject type",
      model: [
        { label: "Organization", value: "organization" },
        { label: "Repository", value: "repository" },
        { label: "Issue", value: "issue" },
        { label: "Pull Request", value: "pull_request" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of context to request for the user's hovercard.",
    },
    subjectId: {
      label: "Subject ID",
      type: "string",
      required: false,
      placeholder: "Enter subject ID",
      example: "123456",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The ID of the subject specified in subject_type.",
    },
  },
});

const appsGetUserInstallation = action({
  display: {
    label: "Apps Get User Installation",
    description: "Get a user installation for the authenticated app",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/installation`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
  },
});

const usersListPublicKeysForUser = action({
  display: {
    label: "Users List Public Keys For User",
    description: "List public keys for a user",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/keys`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

const orgsListForUser = action({
  display: {
    label: "Orgs List For User",
    description: "List organizations for a user",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/orgs`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

const packagesListPackagesForUser = action({
  display: {
    label: "Packages List Packages For User",
    description: "List packages for a user",
  },
  perform: async (
    context,
    { connection, username, packageType, visibility }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/packages`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      placeholder: "Select package type",
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of package.",
    },
    visibility: {
      label: "Visibility",
      type: "string",
      required: false,
      placeholder: "Select visibility",
      model: [
        { label: "Public", value: "public" },
        { label: "Private", value: "private" },
        { label: "Internal", value: "internal" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The visibility of the packages to filter by.",
    },
  },
});

const packagesGetPackageForUser = action({
  display: {
    label: "Packages Get Package For User",
    description: "Get a package for a user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, username }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/users/${username}/packages/${packageType}/${packageName}`
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
      placeholder: "Select package type",
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of package.",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      placeholder: "Enter package name",
      example: "my-package",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package.",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
  },
});

const packagesDeletePackageForUser = action({
  display: {
    label: "Packages Delete Package For User",
    description: "Delete a package for a user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, username }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/users/${username}/packages/${packageType}/${packageName}`
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
      placeholder: "Select package type",
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of package.",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      placeholder: "Enter package name",
      example: "my-package",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package.",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
  },
});

const packagesRestorePackageForUser = action({
  display: {
    label: "Packages Restore Package For User",
    description: "Restore a package for a user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, username, token }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/users/${username}/packages/${packageType}/${packageName}/restore`,
      {},
      { params: { token } }
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
      placeholder: "Select package type",
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of package.",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      placeholder: "Enter package name",
      example: "my-package",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package.",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
    token: {
      label: "Token",
      type: "string",
      required: false,
      placeholder: "Enter package token",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The package token for authentication.",
    },
  },
});

const packagesGetAllPackageVersionsForPackageOwnedByUser = action({
  display: {
    label: "Packages Get All Package Versions For Package Owned By User",
    description: "Get all package versions for a package owned by a user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, username }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/users/${username}/packages/${packageType}/${packageName}/versions`
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
      placeholder: "Select package type",
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of package.",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      placeholder: "Enter package name",
      example: "my-package",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package.",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
  },
});

const packagesGetPackageVersionForUser = action({
  display: {
    label: "Packages Get Package Version For User",
    description: "Get a package version for a user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, packageVersionId, username }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/users/${username}/packages/${packageType}/${packageName}/versions/${packageVersionId}`
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
      placeholder: "Select package type",
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of package.",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      placeholder: "Enter package name",
      example: "my-package",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package.",
    },
    packageVersionId: {
      label: "Package Version ID",
      type: "string",
      required: true,
      placeholder: "Enter package version ID",
      example: "12345",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the package version.",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
  },
});

const packagesDeletePackageVersionForUser = action({
  display: {
    label: "Packages Delete Package Version For User",
    description: "Delete package version for a user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, username, packageVersionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/users/${username}/packages/${packageType}/${packageName}/versions/${packageVersionId}`
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
      placeholder: "Select package type",
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of package.",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      placeholder: "Enter package name",
      example: "my-package",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package.",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
    packageVersionId: {
      label: "Package Version ID",
      type: "string",
      required: true,
      placeholder: "Enter package version ID",
      example: "12345",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the package version.",
    },
  },
});

const packagesRestorePackageVersionForUser = action({
  display: {
    label: "Packages Restore Package Version For User",
    description: "Restore package version for a user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, username, packageVersionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/users/${username}/packages/${packageType}/${packageName}/versions/${packageVersionId}/restore`,
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
    packageType: {
      label: "Package Type",
      type: "string",
      required: true,
      placeholder: "Select package type",
      model: [
        { label: "Npm", value: "npm" },
        { label: "Maven", value: "maven" },
        { label: "Rubygems", value: "rubygems" },
        { label: "Docker", value: "docker" },
        { label: "Nuget", value: "nuget" },
        { label: "Container", value: "container" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The type of package.",
    },
    packageName: {
      label: "Package Name",
      type: "string",
      required: true,
      placeholder: "Enter package name",
      example: "my-package",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the package.",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
    packageVersionId: {
      label: "Package Version ID",
      type: "string",
      required: true,
      placeholder: "Enter package version ID",
      example: "12345",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the package version.",
    },
  },
});

const projectsListForUser = action({
  display: {
    label: "Projects List For User",
    description: "List user projects",
  },
  perform: async (context, { connection, username, state, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/projects`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
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
      comments: "Filters projects by their state (open, closed, or all).",
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

const activityListReceivedEventsForUser = action({
  display: {
    label: "Activity List Received Events For User",
    description: "List events received by the authenticated user",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/received_events`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

const activityListReceivedPublicEventsForUser = action({
  display: {
    label: "Activity List Received Public Events For User",
    description: "List public events received by a user",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/users/${username}/received_events/public`,
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

const reposListForUser = action({
  display: {
    label: "Repos List For User",
    description: "List repositories for a user",
  },
  perform: async (
    context,
    { connection, username, type, sort, direction, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/repos`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
    type: {
      label: "Type",
      type: "string",
      required: false,
      default: "owner",
      placeholder: "Select type",
      model: [
        { label: "All", value: "all" },
        { label: "Owner", value: "owner" },
        { label: "Member", value: "member" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filters repositories by the user's relationship to them.",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "full_name",
      placeholder: "Select sort field",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
        { label: "Pushed", value: "pushed" },
        { label: "Full Name", value: "full_name" },
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

const billingGetGithubActionsBillingUser = action({
  display: {
    label: "Billing Get Github Actions Billing User",
    description: "Get GitHub Actions billing for a user",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/users/${username}/settings/billing/actions`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
  },
});

const billingGetGithubPackagesBillingUser = action({
  display: {
    label: "Billing Get Github Packages Billing User",
    description: "Get GitHub Packages billing for a user",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/users/${username}/settings/billing/packages`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
  },
});

const billingGetSharedStorageBillingUser = action({
  display: {
    label: "Billing Get Shared Storage Billing User",
    description: "Get shared storage billing for a user",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/users/${username}/settings/billing/shared-storage`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
    },
  },
});

const activityListReposStarredByUser = action({
  display: {
    label: "Activity List Repos Starred By User",
    description: "List repositories starred by a user",
  },
  perform: async (
    context,
    { connection, username, sort, direction, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/starred`, {
      params: { sort, direction, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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
      default: "desc",
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

const activityListReposWatchedByUser = action({
  display: {
    label: "Activity List Repos Watched By User",
    description: "List repositories watched by a user",
  },
  perform: async (context, { connection, username, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}/subscriptions`, {
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
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter username",
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The GitHub username.",
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

export default {
  usersList,
  usersGetByUsername,
  activityListEventsForAuthenticatedUser,
  activityListOrgEventsForAuthenticatedUser,
  activityListPublicEventsForUser,
  usersListFollowersForUser,
  usersListFollowingForUser,
  usersCheckFollowingForUser,
  gistsListForUser,
  usersListGpgKeysForUser,
  usersGetContextForUser,
  appsGetUserInstallation,
  usersListPublicKeysForUser,
  orgsListForUser,
  packagesListPackagesForUser,
  packagesGetPackageForUser,
  packagesDeletePackageForUser,
  packagesRestorePackageForUser,
  packagesGetAllPackageVersionsForPackageOwnedByUser,
  packagesGetPackageVersionForUser,
  packagesDeletePackageVersionForUser,
  packagesRestorePackageVersionForUser,
  projectsListForUser,
  activityListReceivedEventsForUser,
  activityListReceivedPublicEventsForUser,
  reposListForUser,
  billingGetGithubActionsBillingUser,
  billingGetGithubPackagesBillingUser,
  billingGetSharedStorageBillingUser,
  activityListReposStarredByUser,
  activityListReposWatchedByUser,
};
