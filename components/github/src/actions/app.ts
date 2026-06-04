import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const appsGetAuthenticated = action({
  display: {
    label: "Apps Get Authenticated",
    description: "Get the authenticated app",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/app`);
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

const appsGetWebhookConfigForApp = action({
  display: {
    label: "Apps Get Webhook Config For App",
    description: "Get a webhook configuration for an app",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/app/hook/config`);
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

const appsUpdateWebhookConfigForApp = action({
  display: {
    label: "Apps Update Webhook Config For App",
    description: "Update a webhook configuration for an app",
  },
  perform: async (
    context,
    { connection, url, contentType, secret, insecureSsl },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/app/hook/config`, {
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

const appsListWebhookDeliveries = action({
  display: {
    label: "Apps List Webhook Deliveries",
    description: "List deliveries for an app webhook",
  },
  perform: async (context, { connection, perPage, cursor }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/app/hook/deliveries`, {
      params: { per_page: perPage, cursor },
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

const appsGetWebhookDelivery = action({
  display: {
    label: "Apps Get Webhook Delivery",
    description: "Get a delivery for an app webhook",
  },
  perform: async (context, { connection, deliveryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/app/hook/deliveries/${deliveryId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    deliveryId: {
      label: "Delivery Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const appsRedeliverWebhookDelivery = action({
  display: {
    label: "Apps Redeliver Webhook Delivery",
    description: "Redeliver a delivery for an app webhook",
  },
  perform: async (context, { connection, deliveryId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/app/hook/deliveries/${deliveryId}/attempts`,
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
    deliveryId: {
      label: "Delivery Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
    },
  },
});

const appsListInstallations = action({
  display: {
    label: "Apps List Installations",
    description: "List installations for the authenticated app",
  },
  perform: async (context, { connection, perPage, page, since, outdated }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/app/installations`, {
      params: { per_page: perPage, page, since, outdated },
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
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated after the given time",
    },
    outdated: {
      label: "Outdated",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const appsGetInstallation = action({
  display: {
    label: "Apps Get Installation",
    description: "Get an installation for the authenticated app",
  },
  perform: async (context, { connection, installationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/app/installations/${installationId}`);
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
  },
});

const appsDeleteInstallation = action({
  display: {
    label: "Apps Delete Installation",
    description: "Delete an installation for the authenticated app",
  },
  perform: async (context, { connection, installationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/app/installations/${installationId}`,
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
  },
});

const appsCreateInstallationAccessToken = action({
  display: {
    label: "Apps Create Installation Access Token",
    description: "Create an installation access token for an app",
  },
  perform: async (
    context,
    { connection, installationId, repositories, repositoryIds, permissions },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/app/installations/${installationId}/access_tokens`,
      { repositories, repository_ids: repositoryIds, permissions },
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
    repositories: {
      label: "Repositories",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of repository names that the token should have access to",
    },
    repositoryIds: {
      label: "Repository Ids",
      type: "string",
      required: false,
      example: "1",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "List of repository IDs that the token should have access to",
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

const appsSuspendInstallation = action({
  display: {
    label: "Apps Suspend Installation",
    description: "Suspend an app installation",
  },
  perform: async (context, { connection, installationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/app/installations/${installationId}/suspended`,
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
    installationId: {
      label: "Installation Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the installation",
    },
  },
});

const appsUnsuspendInstallation = action({
  display: {
    label: "Apps Unsuspend Installation",
    description: "Unsuspend an app installation",
  },
  perform: async (context, { connection, installationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/app/installations/${installationId}/suspended`,
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
  },
});

export default {
  appsGetAuthenticated,
  appsGetWebhookConfigForApp,
  appsUpdateWebhookConfigForApp,
  appsListWebhookDeliveries,
  appsGetWebhookDelivery,
  appsRedeliverWebhookDelivery,
  appsListInstallations,
  appsGetInstallation,
  appsDeleteInstallation,
  appsCreateInstallationAccessToken,
  appsSuspendInstallation,
  appsUnsuspendInstallation,
};
