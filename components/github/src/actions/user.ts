import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, owner, page, perPage, repo } from "../inputs";
import { orgsListForAuthenticatedUserExamplePayload } from "../examplePayloads";

const usersGetAuthenticated = action({
  display: {
    label: "Users Get Authenticated",
    description: "Get the authenticated user",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/user`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const usersUpdateAuthenticated = action({
  display: {
    label: "Users Update Authenticated",
    description: "Update the authenticated user",
  },
  perform: async (
    context,
    {
      connection,
      name,
      email,
      blog,
      twitterUsername,
      company,
      location,
      hireable,
      bio,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/user`, {
      name,
      email,
      blog,
      twitter_username: twitterUsername,
      company,
      location,
      hireable,
      bio,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      example: "Omar Jahandar",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new name of the user",
    },
    email: {
      label: "Email",
      type: "string",
      required: false,
      example: "omar@example.com",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The publicly visible email address of the user",
    },
    blog: {
      label: "Blog",
      type: "string",
      required: false,
      example: "blog.example.com",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new blog URL of the user",
    },
    twitterUsername: {
      label: "Twitter Username",
      type: "string",
      required: false,
      example: "therealomarj",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new Twitter username of the user",
    },
    company: {
      label: "Company",
      type: "string",
      required: false,
      example: "Acme corporation",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new company of the user",
    },
    location: {
      label: "Location",
      type: "string",
      required: false,
      example: "Berlin, Germany",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new location of the user",
    },
    hireable: {
      label: "Hireable",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "The new hiring availability of the user",
    },
    bio: {
      label: "Bio",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The new short biography of the user",
    },
  },
});

const usersListBlockedByAuthenticatedUser = action({
  display: {
    label: "Users List Blocked By Authenticated User",
    description: "List users blocked by the authenticated user",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/user/blocks`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const usersCheckBlocked = action({
  display: {
    label: "Users Check Blocked",
    description: "Check if a user is blocked by the authenticated user",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/blocks/${username}`);
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
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const usersBlock = action({
  display: {
    label: "Users Block",
    description: "Block a user",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/user/blocks/${username}`, {});
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
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const usersUnblock = action({
  display: {
    label: "Users Unblock",
    description: "Unblock a user",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/user/blocks/${username}`);
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
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const codespacesListForAuthenticatedUser = action({
  display: {
    label: "Codespaces List For Authenticated User",
    description: "List codespaces for the authenticated user",
  },
  perform: async (context, { connection, perPage, page, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/codespaces`, {
      params: { per_page: perPage, page, repository_id: repositoryId },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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
    repositoryId: {
      label: "Repository Id",
      type: "string",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "ID of the Repository to filter on",
    },
  },
});

const codespacesCreateForAuthenticatedUser = action({
  display: {
    label: "Codespaces Create For Authenticated User",
    description: "Create a codespace for the authenticated user",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/user/codespaces`, {});
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const codespacesListSecretsForAuthenticatedUser = action({
  display: {
    label: "Codespaces List Secrets For Authenticated User",
    description: "List secrets for the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/codespaces/secrets`, {
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

const codespacesGetPublicKeyForAuthenticatedUser = action({
  display: {
    label: "Codespaces Get Public Key For Authenticated User",
    description: "Get public key for the authenticated user",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/user/codespaces/secrets/public-key`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const codespacesGetSecretForAuthenticatedUser = action({
  display: {
    label: "Codespaces Get Secret For Authenticated User",
    description: "Get a secret for the authenticated user",
  },
  perform: async (context, { connection, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/codespaces/secrets/${secretName}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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

const codespacesCreateOrUpdateSecretForAuthenticatedUser = action({
  display: {
    label: "Codespaces Create Or Update Secret For Authenticated User",
    description: "Create or update a secret for the authenticated user",
  },
  perform: async (
    context,
    { connection, secretName, encryptedValue, keyId, selectedRepositoryIds }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/user/codespaces/secrets/${secretName}`,
      {
        encrypted_value: encryptedValue,
        key_id: keyId,
        selected_repository_ids: selectedRepositoryIds,
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
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "ID of the key you used to encrypt the secret",
    },
    selectedRepositoryIds: {
      label: "Selected Repository Ids",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "An array of repository ids that can access the user secret",
    },
  },
});

const codespacesDeleteSecretForAuthenticatedUser = action({
  display: {
    label: "Codespaces Delete Secret For Authenticated User",
    description: "Delete a secret for the authenticated user",
  },
  perform: async (context, { connection, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/user/codespaces/secrets/${secretName}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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

const codespacesListRepositoriesForSecretForAuthenticatedUser = action({
  display: {
    label: "Codespaces List Repositories For Secret For Authenticated User",
    description: "List selected repositories for a user secret",
  },
  perform: async (context, { connection, secretName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/user/codespaces/secrets/${secretName}/repositories`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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

const codespacesSetRepositoriesForSecretForAuthenticatedUser = action({
  display: {
    label: "Codespaces Set Repositories For Secret For Authenticated User",
    description: "Set selected repositories for a user secret",
  },
  perform: async (
    context,
    { connection, secretName, selectedRepositoryIds }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/user/codespaces/secrets/${secretName}/repositories`,
      { selected_repository_ids: selectedRepositoryIds }
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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
        "An array of repository ids for which a codespace can access the secret",
    },
  },
});

const codespacesAddRepositoryForSecretForAuthenticatedUser = action({
  display: {
    label: "Codespaces Add Repository For Secret For Authenticated User",
    description: "Add a selected repository to a user secret",
  },
  perform: async (context, { connection, secretName, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/user/codespaces/secrets/${secretName}/repositories/${repositoryId}`,
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

const codespacesRemoveRepositoryForSecretForAuthenticatedUser = action({
  display: {
    label: "Codespaces Remove Repository For Secret For Authenticated User",
    description: "Remove a selected repository from a user secret",
  },
  perform: async (context, { connection, secretName, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/user/codespaces/secrets/${secretName}/repositories/${repositoryId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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

const codespacesGetForAuthenticatedUser = action({
  display: {
    label: "Codespaces Get For Authenticated User",
    description: "Get a codespace for the authenticated user",
  },
  perform: async (context, { connection, codespaceName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/codespaces/${codespaceName}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    codespaceName: {
      label: "Codespace Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the codespace",
    },
  },
});

const codespacesUpdateForAuthenticatedUser = action({
  display: {
    label: "Codespaces Update For Authenticated User",
    description: "Update a codespace for the authenticated user",
  },
  perform: async (
    context,
    { connection, codespaceName, machine, displayName, recentFolders }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/user/codespaces/${codespaceName}`, {
      machine,
      display_name: displayName,
      recent_folders: recentFolders,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    codespaceName: {
      label: "Codespace Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the codespace",
    },
    machine: {
      label: "Machine",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A valid machine to transition this codespace to",
    },
    displayName: {
      label: "Display Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Display name for this codespace",
    },
    recentFolders: {
      label: "Recent Folders",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Recently opened folders inside the codespace",
    },
  },
});

const codespacesDeleteForAuthenticatedUser = action({
  display: {
    label: "Codespaces Delete For Authenticated User",
    description: "Delete a codespace for the authenticated user",
  },
  perform: async (context, { connection, codespaceName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/user/codespaces/${codespaceName}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    codespaceName: {
      label: "Codespace Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the codespace",
    },
  },
});

const codespacesExportForAuthenticatedUser = action({
  display: {
    label: "Codespaces Export For Authenticated User",
    description: "Export a codespace for the authenticated user",
  },
  perform: async (context, { connection, codespaceName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/user/codespaces/${codespaceName}/exports`,
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
    codespaceName: {
      label: "Codespace Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the codespace",
    },
  },
});

const codespacesGetExportDetailsForAuthenticatedUser = action({
  display: {
    label: "Codespaces Get Export Details For Authenticated User",
    description: "Get details about a codespace export",
  },
  perform: async (context, { connection, codespaceName, exportId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/user/codespaces/${codespaceName}/exports/${exportId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    codespaceName: {
      label: "Codespace Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the codespace",
    },
    exportId: {
      label: "Export Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The ID of the export operation, or "latest"',
    },
  },
});

const codespacesCodespaceMachinesForAuthenticatedUser = action({
  display: {
    label: "Codespaces Codespace Machines For Authenticated User",
    description: "List machine types for a codespace",
  },
  perform: async (context, { connection, codespaceName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/user/codespaces/${codespaceName}/machines`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    codespaceName: {
      label: "Codespace Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the codespace",
    },
  },
});

const codespacesStartForAuthenticatedUser = action({
  display: {
    label: "Codespaces Start For Authenticated User",
    description: "Start a codespace for the authenticated user",
  },
  perform: async (context, { connection, codespaceName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/user/codespaces/${codespaceName}/start`,
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
    codespaceName: {
      label: "Codespace Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the codespace",
    },
  },
});

const codespacesStopForAuthenticatedUser = action({
  display: {
    label: "Codespaces Stop For Authenticated User",
    description: "Stop a codespace for the authenticated user",
  },
  perform: async (context, { connection, codespaceName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/user/codespaces/${codespaceName}/stop`,
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
    codespaceName: {
      label: "Codespace Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the codespace",
    },
  },
});

const usersSetPrimaryEmailVisibilityForAuthenticatedUser = action({
  display: {
    label: "Users Set Primary Email Visibility For Authenticated User",
    description: "Set primary email visibility for the authenticated user",
  },
  perform: async (context, { connection, visibility }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/user/email/visibility`, {
      visibility,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    visibility: {
      label: "Visibility",
      type: "string",
      required: true,
      model: [
        { label: "Public", value: "public" },
        { label: "Private", value: "private" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Denotes whether an email is publicly visible",
    },
  },
});

const usersListEmailsForAuthenticatedUser = action({
  display: {
    label: "Users List Emails For Authenticated User",
    description: "List email addresses for the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/emails`, {
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

const usersAddEmailForAuthenticatedUser = action({
  display: {
    label: "Users Add Email For Authenticated User",
    description: "Add an email address for the authenticated user",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/user/emails`, {});
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const usersDeleteEmailForAuthenticatedUser = action({
  display: {
    label: "Users Delete Email For Authenticated User",
    description: "Delete an email address for the authenticated user",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/user/emails`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const usersListFollowersForAuthenticatedUser = action({
  display: {
    label: "Users List Followers For Authenticated User",
    description: "List followers of the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/followers`, {
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

const usersListFollowedByAuthenticatedUser = action({
  display: {
    label: "Users List Followed By Authenticated User",
    description: "List the people the authenticated user follows",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/following`, {
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

const usersCheckPersonIsFollowedByAuthenticated = action({
  display: {
    label: "Users Check Person Is Followed By Authenticated",
    description: "Check if a person is followed by the authenticated user",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/following/${username}`);
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
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const usersFollow = action({
  display: {
    label: "Users Follow",
    description: "Follow a user",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/user/following/${username}`, {});
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
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const usersUnfollow = action({
  display: {
    label: "Users Unfollow",
    description: "Unfollow a user",
  },
  perform: async (context, { connection, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/user/following/${username}`);
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
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const usersListGpgKeysForAuthenticatedUser = action({
  display: {
    label: "Users List Gpg Keys For Authenticated User",
    description: "List GPG keys for the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/gpg_keys`, {
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

const usersCreateGpgKeyForAuthenticatedUser = action({
  display: {
    label: "Users Create Gpg Key For Authenticated User",
    description: "Create a GPG key for the authenticated user",
  },
  perform: async (context, { connection, name, armoredPublicKey }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/user/gpg_keys`, {
      name,
      armored_public_key: armoredPublicKey,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A descriptive name for the new key",
    },
    armoredPublicKey: {
      label: "Armored Public Key",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A GPG key in ASCII-armored format",
    },
  },
});

const usersGetGpgKeyForAuthenticatedUser = action({
  display: {
    label: "Users Get Gpg Key For Authenticated User",
    description: "Get a GPG key for the authenticated user",
  },
  perform: async (context, { connection, gpgKeyId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/gpg_keys/${gpgKeyId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gpgKeyId: {
      label: "Gpg Key Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the GPG key",
    },
  },
});

const usersDeleteGpgKeyForAuthenticatedUser = action({
  display: {
    label: "Users Delete Gpg Key For Authenticated User",
    description: "Delete a GPG key for the authenticated user",
  },
  perform: async (context, { connection, gpgKeyId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/user/gpg_keys/${gpgKeyId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gpgKeyId: {
      label: "Gpg Key Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the GPG key",
    },
  },
});

const appsListInstallationsForAuthenticatedUser = action({
  display: {
    label: "Apps List Installations For Authenticated User",
    description: "List app installations accessible to the user access token",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/installations`, {
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

const appsListInstallationReposForAuthenticatedUser = action({
  display: {
    label: "Apps List Installation Repos For Authenticated User",
    description: "List repositories accessible to the user access token",
  },
  perform: async (context, { connection, installationId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/user/installations/${installationId}/repositories`,
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
    installationId: {
      label: "Installation Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the installation",
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

const appsAddRepoToInstallationForAuthenticatedUser = action({
  display: {
    label: "Apps Add Repo To Installation For Authenticated User",
    description: "Add a repository to an app installation",
  },
  perform: async (context, { connection, installationId, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/user/installations/${installationId}/repositories/${repositoryId}`,
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
    installationId: {
      label: "Installation Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the installation",
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

const appsRemoveRepoFromInstallationForAuthenticatedUser = action({
  display: {
    label: "Apps Remove Repo From Installation For Authenticated User",
    description: "Remove a repository from an app installation",
  },
  perform: async (context, { connection, installationId, repositoryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/user/installations/${installationId}/repositories/${repositoryId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    installationId: {
      label: "Installation Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the installation",
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

const interactionsGetRestrictionsForAuthenticatedUser = action({
  display: {
    label: "Interactions Get Restrictions For Authenticated User",
    description: "Get interaction restrictions for your public repositories",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/user/interaction-limits`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const interactionsSetRestrictionsForAuthenticatedUser = action({
  display: {
    label: "Interactions Set Restrictions For Authenticated User",
    description: "Set interaction restrictions for your public repositories",
  },
  perform: async (context, { connection, limit, expiry }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/user/interaction-limits`, {
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

const interactionsRemoveRestrictionsForAuthenticatedUser = action({
  display: {
    label: "Interactions Remove Restrictions For Authenticated User",
    description:
      "Remove interaction restrictions from your public repositories",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/user/interaction-limits`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const issuesListForAuthenticatedUser = action({
  display: {
    label: "Issues List For Authenticated User",
    description: "List user account issues assigned to the authenticated user",
  },
  perform: async (
    context,
    { connection, filter, state, labels, sort, direction, since, perPage, page }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/issues`, {
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

const usersListPublicSshKeysForAuthenticatedUser = action({
  display: {
    label: "Users List Public Ssh Keys For Authenticated User",
    description: "List public SSH keys for the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/keys`, {
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

const usersCreatePublicSshKeyForAuthenticatedUser = action({
  display: {
    label: "Users Create Public Ssh Key For Authenticated User",
    description: "Create a public SSH key for the authenticated user",
  },
  perform: async (context, { connection, title, key }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/user/keys`, { title, key });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    title: {
      label: "Title",
      type: "string",
      required: false,
      example: "Personal MacBook Air",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A descriptive name for the new key",
    },
    key: {
      label: "Key",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The public SSH key to add to your GitHub account",
    },
  },
});

const usersGetPublicSshKeyForAuthenticatedUser = action({
  display: {
    label: "Users Get Public Ssh Key For Authenticated User",
    description: "Get a public SSH key for the authenticated user",
  },
  perform: async (context, { connection, keyId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/keys/${keyId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    keyId: {
      label: "Key Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the key",
    },
  },
});

const usersDeletePublicSshKeyForAuthenticatedUser = action({
  display: {
    label: "Users Delete Public Ssh Key For Authenticated User",
    description: "Delete a public SSH key for the authenticated user",
  },
  perform: async (context, { connection, keyId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/user/keys/${keyId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    keyId: {
      label: "Key Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the key",
    },
  },
});

const appsListSubscriptionsForAuthenticatedUser = action({
  display: {
    label: "Apps List Subscriptions For Authenticated User",
    description: "List subscriptions for the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/marketplace_purchases`, {
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

const appsListSubscriptionsForAuthenticatedUserStubbed = action({
  display: {
    label: "Apps List Subscriptions For Authenticated User Stubbed",
    description: "List subscriptions for the authenticated user (stubbed)",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/marketplace_purchases/stubbed`, {
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

const orgsListMembershipsForAuthenticatedUser = action({
  display: {
    label: "Orgs List Memberships For Authenticated User",
    description: "List organization memberships for the authenticated user",
  },
  perform: async (context, { connection, state, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/memberships/orgs`, {
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
    state: {
      label: "State",
      type: "string",
      required: false,
      model: [
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Indicates the state of the memberships to return",
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

const orgsGetMembershipForAuthenticatedUser = action({
  display: {
    label: "Orgs Get Membership For Authenticated User",
    description: "Get an organization membership for the authenticated user",
  },
  perform: async (context, { connection, org }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/memberships/orgs/${org}`);
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

const orgsUpdateMembershipForAuthenticatedUser = action({
  display: {
    label: "Orgs Update Membership For Authenticated User",
    description: "Update an organization membership for the authenticated user",
  },
  perform: async (context, { connection, org, state }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/user/memberships/orgs/${org}`, {
      state,
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
      required: true,
      model: [{ label: "Active", value: "active" }],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The state that the membership should be in",
    },
  },
});

const migrationsListForAuthenticatedUser = action({
  display: {
    label: "Migrations List For Authenticated User",
    description: "List user migrations",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/migrations`, {
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

const migrationsStartForAuthenticatedUser = action({
  display: {
    label: "Migrations Start For Authenticated User",
    description: "Start a user migration",
  },
  perform: async (
    context,
    {
      connection,
      lockRepositories,
      excludeMetadata,
      excludeGitData,
      excludeAttachments,
      excludeReleases,
      excludeOwnerProjects,
      orgMetadataOnly,
      exclude,
      repositories,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/user/migrations`, {
      lock_repositories: lockRepositories,
      exclude_metadata: excludeMetadata,
      exclude_git_data: excludeGitData,
      exclude_attachments: excludeAttachments,
      exclude_releases: excludeReleases,
      exclude_owner_projects: excludeOwnerProjects,
      org_metadata_only: orgMetadataOnly,
      exclude,
      repositories,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    lockRepositories: {
      label: "Lock Repositories",
      type: "boolean",
      required: false,
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Lock the repositories being migrated at the start of the migration",
    },
    excludeMetadata: {
      label: "Exclude Metadata",
      type: "boolean",
      required: false,
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether metadata should be excluded and only git source should be included for the migration",
    },
    excludeGitData: {
      label: "Exclude Git Data",
      type: "boolean",
      required: false,
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Indicates whether the repository git data should be excluded from the migration",
    },
    excludeAttachments: {
      label: "Exclude Attachments",
      type: "boolean",
      required: false,
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Do not include attachments in the migration",
    },
    excludeReleases: {
      label: "Exclude Releases",
      type: "boolean",
      required: false,
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Do not include releases in the migration",
    },
    excludeOwnerProjects: {
      label: "Exclude Owner Projects",
      type: "boolean",
      required: false,
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
      example: "repositories",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "Exclude attributes from the API response to improve performance",
    },
    repositories: {
      label: "Repositories",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const migrationsGetStatusForAuthenticatedUser = action({
  display: {
    label: "Migrations Get Status For Authenticated User",
    description: "Get a user migration status",
  },
  perform: async (context, { connection, migrationId, exclude }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/migrations/${migrationId}`, {
      params: { exclude },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const migrationsGetArchiveForAuthenticatedUser = action({
  display: {
    label: "Migrations Get Archive For Authenticated User",
    description: "Download a user migration archive",
  },
  perform: async (context, { connection, migrationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/user/migrations/${migrationId}/archive`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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

const migrationsDeleteArchiveForAuthenticatedUser = action({
  display: {
    label: "Migrations Delete Archive For Authenticated User",
    description: "Delete a user migration archive",
  },
  perform: async (context, { connection, migrationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/user/migrations/${migrationId}/archive`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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

const migrationsUnlockRepoForAuthenticatedUser = action({
  display: {
    label: "Migrations Unlock Repo For Authenticated User",
    description: "Unlock a user repository",
  },
  perform: async (context, { connection, migrationId, repoName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/user/migrations/${migrationId}/repos/${repoName}/lock`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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

const migrationsListReposForAuthenticatedUser = action({
  display: {
    label: "Migrations List Repos For Authenticated User",
    description: "List repositories for a user migration",
  },
  perform: async (context, { connection, migrationId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/user/migrations/${migrationId}/repositories`,
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

const orgsListForAuthenticatedUser = action({
  display: {
    label: "Orgs List For Authenticated User",
    description: "List organizations for the authenticated user",
  },
  examplePayload: orgsListForAuthenticatedUserExamplePayload,
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/orgs`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    perPage,
    page,
  },
});

const packagesListPackagesForAuthenticatedUser = action({
  display: {
    label: "Packages List Packages For Authenticated User",
    description: 'List packages for the authenticated user"s namespace',
  },
  perform: async (context, { connection, packageType, visibility }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/packages`, {
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

const packagesGetPackageForAuthenticatedUser = action({
  display: {
    label: "Packages Get Package For Authenticated User",
    description: "Get a package for the authenticated user",
  },
  perform: async (context, { connection, packageType, packageName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/user/packages/${packageType}/${packageName}`
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
  },
});

const packagesDeletePackageForAuthenticatedUser = action({
  display: {
    label: "Packages Delete Package For Authenticated User",
    description: "Delete a package for the authenticated user",
  },
  perform: async (context, { connection, packageType, packageName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/user/packages/${packageType}/${packageName}`
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
  },
});

const packagesRestorePackageForAuthenticatedUser = action({
  display: {
    label: "Packages Restore Package For Authenticated User",
    description: "Restore a package for the authenticated user",
  },
  perform: async (context, { connection, packageType, packageName, token }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/user/packages/${packageType}/${packageName}/restore`,
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
    token: {
      label: "Token",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "package token",
    },
  },
});

const packagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser = action({
  display: {
    label:
      "Packages Get All Package Versions For Package Owned By Authenticated User",
    description:
      "Get all package versions for a package owned by the authenticated user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, page, perPage, state }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/user/packages/${packageType}/${packageName}/versions`,
      { params: { page, per_page: perPage, state } }
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

const packagesGetPackageVersionForAuthenticatedUser = action({
  display: {
    label: "Packages Get Package Version For Authenticated User",
    description: "Get a package version for the authenticated user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, packageVersionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/user/packages/${packageType}/${packageName}/versions/${packageVersionId}`
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
    packageVersionId: {
      label: "Package Version Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the package version",
    },
  },
});

const packagesDeletePackageVersionForAuthenticatedUser = action({
  display: {
    label: "Packages Delete Package Version For Authenticated User",
    description: "Delete a package version for the authenticated user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, packageVersionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/user/packages/${packageType}/${packageName}/versions/${packageVersionId}`
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
    packageVersionId: {
      label: "Package Version Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the package version",
    },
  },
});

const packagesRestorePackageVersionForAuthenticatedUser = action({
  display: {
    label: "Packages Restore Package Version For Authenticated User",
    description: "Restore a package version for the authenticated user",
  },
  perform: async (
    context,
    { connection, packageType, packageName, packageVersionId }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/user/packages/${packageType}/${packageName}/versions/${packageVersionId}/restore`,
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
    packageVersionId: {
      label: "Package Version Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Unique identifier of the package version",
    },
  },
});

const projectsCreateForAuthenticatedUser = action({
  display: {
    label: "Projects Create For Authenticated User",
    description: "Create a user project",
  },
  perform: async (context, { connection, name, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/user/projects`, { name, body });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      example: "Week One Sprint",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Name of the project",
    },
    body: {
      label: "Body",
      type: "string",
      required: false,
      example:
        "This project represents the sprint of the first week in January",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Body of the project",
    },
  },
});

const usersListPublicEmailsForAuthenticatedUser = action({
  display: {
    label: "Users List Public Emails For Authenticated User",
    description: "List public email addresses for the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/public_emails`, {
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

const reposListForAuthenticatedUser = action({
  display: {
    label: "Repos List For Authenticated User",
    description: "List repositories for the authenticated user",
  },
  perform: async (
    context,
    {
      connection,
      visibility,
      affiliation,
      type,
      sort,
      direction,
      perPage,
      page,
      since,
      before,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/repos`, {
      params: {
        visibility,
        affiliation,
        type,
        sort,
        direction,
        per_page: perPage,
        page,
        since,
        before,
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
    visibility: {
      label: "Visibility",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "All", value: "all" },
        { label: "Public", value: "public" },
        { label: "Private", value: "private" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Limit results to repositories with the specified visibility",
    },
    affiliation: {
      label: "Affiliation",
      type: "string",
      required: false,
      default: "owner,collaborator,organization_member",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Comma-separated list of values",
    },
    type: {
      label: "Type",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "All", value: "all" },
        { label: "Owner", value: "owner" },
        { label: "Public", value: "public" },
        { label: "Private", value: "private" },
        { label: "Member", value: "member" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Limit results to repositories of the specified type",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "full_name",
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
  },
});

const reposCreateForAuthenticatedUser = action({
  display: {
    label: "Repos Create For Authenticated User",
    description: "Create a repository for the authenticated user",
  },
  perform: async (
    context,
    {
      connection,
      name,
      description,
      homepage,
      isPrivate,
      hasIssues,
      hasProjects,
      hasWiki,
      teamId,
      autoInit,
      gitignoreTemplate,
      licenseTemplate,
      allowSquashMerge,
      allowMergeCommit,
      allowRebaseMerge,
      allowAutoMerge,
      deleteBranchOnMerge,
      hasDownloads,
      isTemplate,
    }
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/user/repos`, {
      name,
      description,
      homepage,
      private: isPrivate,
      has_issues: hasIssues,
      has_projects: hasProjects,
      has_wiki: hasWiki,
      team_id: teamId,
      auto_init: autoInit,
      gitignore_template: gitignoreTemplate,
      license_template: licenseTemplate,
      allow_squash_merge: allowSquashMerge,
      allow_merge_commit: allowMergeCommit,
      allow_rebase_merge: allowRebaseMerge,
      allow_auto_merge: allowAutoMerge,
      delete_branch_on_merge: deleteBranchOnMerge,
      has_downloads: hasDownloads,
      is_template: isTemplate,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      example: "Team Environment",
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
    hasIssues: {
      label: "Has Issues",
      type: "boolean",
      required: false,
      default: "true",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether issues are enabled",
    },
    hasProjects: {
      label: "Has Projects",
      type: "boolean",
      required: false,
      default: "true",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether projects are enabled",
    },
    hasWiki: {
      label: "Has Wiki",
      type: "boolean",
      required: false,
      default: "true",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether the wiki is enabled",
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
      comments: "Whether the repository is initialized with a minimal README",
    },
    gitignoreTemplate: {
      label: "Gitignore Template",
      type: "string",
      required: false,
      example: "Haskell",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The desired language or platform to apply to the ",
    },
    licenseTemplate: {
      label: "License Template",
      type: "string",
      required: false,
      example: "mit",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The license keyword of the open source license for this repository",
    },
    allowSquashMerge: {
      label: "Allow Squash Merge",
      type: "boolean",
      required: false,
      default: "true",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to allow squash merges for pull requests",
    },
    allowMergeCommit: {
      label: "Allow Merge Commit",
      type: "boolean",
      required: false,
      default: "true",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to allow merge commits for pull requests",
    },
    allowRebaseMerge: {
      label: "Allow Rebase Merge",
      type: "boolean",
      required: false,
      default: "true",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to allow rebase merges for pull requests",
    },
    allowAutoMerge: {
      label: "Allow Auto Merge",
      type: "boolean",
      required: false,
      default: "false",
      example: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to allow Auto-merge to be used on pull requests",
    },
    deleteBranchOnMerge: {
      label: "Delete Branch On Merge",
      type: "boolean",
      required: false,
      default: "false",
      example: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to delete head branches when pull requests are merged",
    },
    hasDownloads: {
      label: "Has Downloads",
      type: "boolean",
      required: false,
      default: "true",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether downloads are enabled",
    },
    isTemplate: {
      label: "Is Template",
      type: "boolean",
      required: false,
      default: "false",
      example: "true",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Whether this repository acts as a template that can be used to generate new repositories",
    },
  },
});

const reposListInvitationsForAuthenticatedUser = action({
  display: {
    label: "Repos List Invitations For Authenticated User",
    description: "List repository invitations for the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/repository_invitations`, {
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

const reposAcceptInvitationForAuthenticatedUser = action({
  display: {
    label: "Repos Accept Invitation For Authenticated User",
    description: "Accept a repository invitation",
  },
  perform: async (context, { connection, invitationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/user/repository_invitations/${invitationId}`,
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
    invitationId: {
      label: "Invitation Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the invitation",
    },
  },
});

const reposDeclineInvitationForAuthenticatedUser = action({
  display: {
    label: "Repos Decline Invitation For Authenticated User",
    description: "Decline a repository invitation",
  },
  perform: async (context, { connection, invitationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/user/repository_invitations/${invitationId}`
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
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

const activityListReposStarredByAuthenticatedUser = action({
  display: {
    label: "Activity List Repos Starred By Authenticated User",
    description: "List repositories starred by the authenticated user",
  },
  perform: async (context, { connection, sort, direction, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/starred`, {
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

const activityCheckRepoIsStarredByAuthenticatedUser = action({
  display: {
    label: "Activity Check Repo Is Starred By Authenticated User",
    description: "Check if a repository is starred by the authenticated user",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/user/starred/${owner}/${repo}`);
    return { data };
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

const activityStarRepoForAuthenticatedUser = action({
  display: {
    label: "Activity Star Repo For Authenticated User",
    description: "Star a repository for the authenticated user",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/user/starred/${owner}/${repo}`, {});
    return { data };
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

const activityUnstarRepoForAuthenticatedUser = action({
  display: {
    label: "Activity Unstar Repo For Authenticated User",
    description: "Unstar a repository for the authenticated user",
  },
  perform: async (context, { connection, owner, repo }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/user/starred/${owner}/${repo}`);
    return { data };
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

const activityListWatchedReposForAuthenticatedUser = action({
  display: {
    label: "Activity List Watched Repos For Authenticated User",
    description: "List repositories watched by the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/subscriptions`, {
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

const teamsListForAuthenticatedUser = action({
  display: {
    label: "Teams List For Authenticated User",
    description: "List teams for the authenticated user",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/user/teams`, {
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
  usersGetAuthenticated,
  usersUpdateAuthenticated,
  usersListBlockedByAuthenticatedUser,
  usersCheckBlocked,
  usersBlock,
  usersUnblock,
  codespacesListForAuthenticatedUser,
  codespacesCreateForAuthenticatedUser,
  codespacesListSecretsForAuthenticatedUser,
  codespacesGetPublicKeyForAuthenticatedUser,
  codespacesGetSecretForAuthenticatedUser,
  codespacesCreateOrUpdateSecretForAuthenticatedUser,
  codespacesDeleteSecretForAuthenticatedUser,
  codespacesListRepositoriesForSecretForAuthenticatedUser,
  codespacesSetRepositoriesForSecretForAuthenticatedUser,
  codespacesAddRepositoryForSecretForAuthenticatedUser,
  codespacesRemoveRepositoryForSecretForAuthenticatedUser,
  codespacesGetForAuthenticatedUser,
  codespacesUpdateForAuthenticatedUser,
  codespacesDeleteForAuthenticatedUser,
  codespacesExportForAuthenticatedUser,
  codespacesGetExportDetailsForAuthenticatedUser,
  codespacesCodespaceMachinesForAuthenticatedUser,
  codespacesStartForAuthenticatedUser,
  codespacesStopForAuthenticatedUser,
  usersSetPrimaryEmailVisibilityForAuthenticatedUser,
  usersListEmailsForAuthenticatedUser,
  usersAddEmailForAuthenticatedUser,
  usersDeleteEmailForAuthenticatedUser,
  usersListFollowersForAuthenticatedUser,
  usersListFollowedByAuthenticatedUser,
  usersCheckPersonIsFollowedByAuthenticated,
  usersFollow,
  usersUnfollow,
  usersListGpgKeysForAuthenticatedUser,
  usersCreateGpgKeyForAuthenticatedUser,
  usersGetGpgKeyForAuthenticatedUser,
  usersDeleteGpgKeyForAuthenticatedUser,
  appsListInstallationsForAuthenticatedUser,
  appsListInstallationReposForAuthenticatedUser,
  appsAddRepoToInstallationForAuthenticatedUser,
  appsRemoveRepoFromInstallationForAuthenticatedUser,
  interactionsGetRestrictionsForAuthenticatedUser,
  interactionsSetRestrictionsForAuthenticatedUser,
  interactionsRemoveRestrictionsForAuthenticatedUser,
  issuesListForAuthenticatedUser,
  usersListPublicSshKeysForAuthenticatedUser,
  usersCreatePublicSshKeyForAuthenticatedUser,
  usersGetPublicSshKeyForAuthenticatedUser,
  usersDeletePublicSshKeyForAuthenticatedUser,
  appsListSubscriptionsForAuthenticatedUser,
  appsListSubscriptionsForAuthenticatedUserStubbed,
  orgsListMembershipsForAuthenticatedUser,
  orgsGetMembershipForAuthenticatedUser,
  orgsUpdateMembershipForAuthenticatedUser,
  migrationsListForAuthenticatedUser,
  migrationsStartForAuthenticatedUser,
  migrationsGetStatusForAuthenticatedUser,
  migrationsGetArchiveForAuthenticatedUser,
  migrationsDeleteArchiveForAuthenticatedUser,
  migrationsUnlockRepoForAuthenticatedUser,
  migrationsListReposForAuthenticatedUser,
  orgsListForAuthenticatedUser,
  packagesListPackagesForAuthenticatedUser,
  packagesGetPackageForAuthenticatedUser,
  packagesDeletePackageForAuthenticatedUser,
  packagesRestorePackageForAuthenticatedUser,
  packagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser,
  packagesGetPackageVersionForAuthenticatedUser,
  packagesDeletePackageVersionForAuthenticatedUser,
  packagesRestorePackageVersionForAuthenticatedUser,
  projectsCreateForAuthenticatedUser,
  usersListPublicEmailsForAuthenticatedUser,
  reposListForAuthenticatedUser,
  reposCreateForAuthenticatedUser,
  reposListInvitationsForAuthenticatedUser,
  reposAcceptInvitationForAuthenticatedUser,
  reposDeclineInvitationForAuthenticatedUser,
  activityListReposStarredByAuthenticatedUser,
  activityCheckRepoIsStarredByAuthenticatedUser,
  activityStarRepoForAuthenticatedUser,
  activityUnstarRepoForAuthenticatedUser,
  activityListWatchedReposForAuthenticatedUser,
  teamsListForAuthenticatedUser,
};
