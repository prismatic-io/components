import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const oauthAuthorizationsListGrants = action({
  display: {
    label: "Oauth Authorizations List Grants",
    description: "List your grants",
  },
  perform: async (context, { connection, perPage, page, clientId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/applications/grants`, {
      params: { per_page: perPage, page, client_id: clientId },
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
    clientId: {
      label: "Client Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The client ID of your GitHub app",
    },
  },
});

const oauthAuthorizationsGetGrant = action({
  display: {
    label: "Oauth Authorizations Get Grant",
    description: "Get a single grant",
  },
  perform: async (context, { connection, grantId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/applications/grants/${grantId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    grantId: {
      label: "Grant Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the grant",
    },
  },
});

const oauthAuthorizationsDeleteGrant = action({
  display: {
    label: "Oauth Authorizations Delete Grant",
    description: "Delete a grant",
  },
  perform: async (context, { connection, grantId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/applications/grants/${grantId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    grantId: {
      label: "Grant Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the grant",
    },
  },
});

const appsDeleteAuthorization = action({
  display: {
    label: "Apps Delete Authorization",
    description: "Delete an app authorization",
  },
  perform: async (context, { connection, clientId, accessToken }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/applications/${clientId}/grant`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    clientId: {
      label: "Client Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The client ID of the GitHub app",
    },
    accessToken: {
      label: "Access Token",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The OAuth access token used to authenticate to the GitHub API",
    },
  },
});

const appsCheckToken = action({
  display: {
    label: "Apps Check Token",
    description: "Check a token",
  },
  perform: async (context, { connection, clientId, accessToken }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/applications/${clientId}/token`, {
      access_token: accessToken,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    clientId: {
      label: "Client Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The client ID of the GitHub app",
    },
    accessToken: {
      label: "Access Token",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The access_token of the OAuth application",
    },
  },
});

const appsResetToken = action({
  display: {
    label: "Apps Reset Token",
    description: "Reset a token",
  },
  perform: async (context, { connection, clientId, accessToken }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/applications/${clientId}/token`, {
      access_token: accessToken,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    clientId: {
      label: "Client Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The client ID of the GitHub app",
    },
    accessToken: {
      label: "Access Token",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The access_token of the OAuth application",
    },
  },
});

const appsDeleteToken = action({
  display: {
    label: "Apps Delete Token",
    description: "Delete an app token",
  },
  perform: async (context, { connection, clientId, accessToken }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/applications/${clientId}/token`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    clientId: {
      label: "Client Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The client ID of the GitHub app",
    },
    accessToken: {
      label: "Access Token",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The OAuth access token used to authenticate to the GitHub API",
    },
  },
});

const appsScopeToken = action({
  display: {
    label: "Apps Scope Token",
    description: "Create a scoped access token",
  },
  perform: async (
    context,
    {
      connection,
      clientId,
      accessToken,
      target,
      targetId,
      repositories,
      repositoryIds,
      permissions,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/applications/${clientId}/token/scoped`,
      {
        access_token: accessToken,
        target,
        target_id: targetId,
        repositories,
        repository_ids: repositoryIds,
        permissions,
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
    clientId: {
      label: "Client Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The client ID of the GitHub app",
    },
    accessToken: {
      label: "Access Token",
      type: "string",
      required: true,
      example: "e72e16c7e42f292c6912e7710c838347ae178b4a",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The OAuth access token used to authenticate to the GitHub API",
    },
    target: {
      label: "Target",
      type: "string",
      required: false,
      example: "octocat",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The name of the user or organization to scope the user-to-server access token to",
    },
    targetId: {
      label: "Target Id",
      type: "string",
      required: false,
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        "The ID of the user or organization to scope the user-to-server access token to",
    },
    repositories: {
      label: "Repositories",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The list of repository names to scope the user-to-server access token to",
    },
    repositoryIds: {
      label: "Repository Ids",
      type: "string",
      required: false,
      example: "1",
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The list of repository IDs to scope the user-to-server access token to",
    },
    permissions: {
      label: "Permissions",
      type: "string",
      required: false,
      example: "[object Object]",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The permissions granted to the user-to-server access token",
    },
  },
});

export default {
  oauthAuthorizationsListGrants,
  oauthAuthorizationsGetGrant,
  oauthAuthorizationsDeleteGrant,
  appsDeleteAuthorization,
  appsCheckToken,
  appsResetToken,
  appsDeleteToken,
  appsScopeToken,
};
