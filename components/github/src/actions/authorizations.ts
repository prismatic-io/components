import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const oauthAuthorizationsListAuthorizations = action({
  display: {
    label: "Oauth Authorizations List Authorizations",
    description: "List your authorizations",
  },
  perform: async (context, { connection, perPage, page, clientId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/authorizations`, {
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

const oauthAuthorizationsCreateAuthorization = action({
  display: {
    label: "Oauth Authorizations Create Authorization",
    description: "Create a new authorization",
  },
  perform: async (
    context,
    { connection, scopes, note, noteUrl, clientId, clientSecret, fingerprint },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/authorizations`, {
      scopes,
      note,
      note_url: noteUrl,
      client_id: clientId,
      client_secret: clientSecret,
      fingerprint,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: false,
      example: "public_repo,user",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A list of scopes that this authorization is in",
    },
    note: {
      label: "Note",
      type: "string",
      required: false,
      example: "Update all gems",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A note to remind you what the OAuth token is for",
    },
    noteUrl: {
      label: "Note Url",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A URL to remind you what app the OAuth token is for",
    },
    clientId: {
      label: "Client Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The OAuth app client key for which to create the token",
    },
    clientSecret: {
      label: "Client Secret",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The OAuth app client secret for which to create the token",
    },
    fingerprint: {
      label: "Fingerprint",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "A unique string to distinguish an authorization from others created for the same client ID and user",
    },
  },
});

const oauthAuthorizationsGetOrCreateAuthorizationForApp = action({
  display: {
    label: "Oauth Authorizations Get Or Create Authorization For App",
    description: "Get-or-create an authorization for a specific app",
  },
  perform: async (
    context,
    { connection, clientId, clientSecret, scopes, note, noteUrl, fingerprint },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/authorizations/clients/${clientId}`, {
      client_secret: clientSecret,
      scopes,
      note,
      note_url: noteUrl,
      fingerprint,
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
    clientSecret: {
      label: "Client Secret",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The OAuth app client secret for which to create the token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: false,
      example: "public_repo,user",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A list of scopes that this authorization is in",
    },
    note: {
      label: "Note",
      type: "string",
      required: false,
      example: "Update all gems",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A note to remind you what the OAuth token is for",
    },
    noteUrl: {
      label: "Note Url",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A URL to remind you what app the OAuth token is for",
    },
    fingerprint: {
      label: "Fingerprint",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "A unique string to distinguish an authorization from others created for the same client ID and user",
    },
  },
});

const oauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprint = action({
  display: {
    label:
      "Oauth Authorizations Get Or Create Authorization For App And Fingerprint",
    description:
      "Get-or-create an authorization for a specific app and fingerprint",
  },
  perform: async (
    context,
    { connection, clientId, fingerprint, clientSecret, scopes, note, noteUrl },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/authorizations/clients/${clientId}/${fingerprint}`,
      {
        client_secret: clientSecret,
        scopes,
        note,
        note_url: noteUrl,
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
    fingerprint: {
      label: "Fingerprint",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
    clientSecret: {
      label: "Client Secret",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The OAuth app client secret for which to create the token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: false,
      example: "public_repo,user",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A list of scopes that this authorization is in",
    },
    note: {
      label: "Note",
      type: "string",
      required: false,
      example: "Update all gems",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A note to remind you what the OAuth token is for",
    },
    noteUrl: {
      label: "Note Url",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A URL to remind you what app the OAuth token is for",
    },
  },
});

const oauthAuthorizationsGetAuthorization = action({
  display: {
    label: "Oauth Authorizations Get Authorization",
    description: "Get a single authorization",
  },
  perform: async (context, { connection, authorizationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/authorizations/${authorizationId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    authorizationId: {
      label: "Authorization Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the authorization",
    },
  },
});

const oauthAuthorizationsUpdateAuthorization = action({
  display: {
    label: "Oauth Authorizations Update Authorization",
    description: "Update an existing authorization",
  },
  perform: async (
    context,
    {
      connection,
      authorizationId,
      scopes,
      addScopes,
      removeScopes,
      note,
      noteUrl,
      fingerprint,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/authorizations/${authorizationId}`, {
      scopes,
      add_scopes: addScopes,
      remove_scopes: removeScopes,
      note,
      note_url: noteUrl,
      fingerprint,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    authorizationId: {
      label: "Authorization Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the authorization",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: false,
      example: "public_repo,user",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A list of scopes that this authorization is in",
    },
    addScopes: {
      label: "Add Scopes",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A list of scopes to add to this authorization",
    },
    removeScopes: {
      label: "Remove Scopes",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A list of scopes to remove from this authorization",
    },
    note: {
      label: "Note",
      type: "string",
      required: false,
      example: "Update all gems",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A note to remind you what the OAuth token is for",
    },
    noteUrl: {
      label: "Note Url",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A URL to remind you what app the OAuth token is for",
    },
    fingerprint: {
      label: "Fingerprint",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "A unique string to distinguish an authorization from others created for the same client ID and user",
    },
  },
});

const oauthAuthorizationsDeleteAuthorization = action({
  display: {
    label: "Oauth Authorizations Delete Authorization",
    description: "Delete an authorization",
  },
  perform: async (context, { connection, authorizationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/authorizations/${authorizationId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    authorizationId: {
      label: "Authorization Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the authorization",
    },
  },
});

export default {
  oauthAuthorizationsListAuthorizations,
  oauthAuthorizationsCreateAuthorization,
  oauthAuthorizationsGetOrCreateAuthorizationForApp,
  oauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprint,
  oauthAuthorizationsGetAuthorization,
  oauthAuthorizationsUpdateAuthorization,
  oauthAuthorizationsDeleteAuthorization,
};
