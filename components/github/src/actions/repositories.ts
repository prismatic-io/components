import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const reposListPublic = action({
  display: {
    label: "Repos List Public",
    description: "List public repositories",
  },
  perform: async (context, { connection, since }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/repositories`, { params: { since } });
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
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "A repository ID",
    },
  },
});

const actionsListEnvironmentSecrets = action({
  display: {
    label: "Actions List Environment Secrets",
    description: "List environment secrets",
  },
  perform: async (
    context,
    { connection, repositoryId, environmentName, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repositories/${repositoryId}/environments/${environmentName}/secrets`,
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
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository",
    },
    environmentName: {
      label: "Environment Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the environment",
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

const actionsGetEnvironmentPublicKey = action({
  display: {
    label: "Actions Get Environment Public Key",
    description: "Get an environment public key",
  },
  perform: async (context, { connection, repositoryId, environmentName }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repositories/${repositoryId}/environments/${environmentName}/secrets/public-key`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository",
    },
    environmentName: {
      label: "Environment Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the environment",
    },
  },
});

const actionsGetEnvironmentSecret = action({
  display: {
    label: "Actions Get Environment Secret",
    description: "Get an environment secret",
  },
  perform: async (
    context,
    { connection, repositoryId, environmentName, secretName },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/repositories/${repositoryId}/environments/${environmentName}/secrets/${secretName}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository",
    },
    environmentName: {
      label: "Environment Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the environment",
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

const actionsCreateOrUpdateEnvironmentSecret = action({
  display: {
    label: "Actions Create Or Update Environment Secret",
    description: "Create or update an environment secret",
  },
  perform: async (
    context,
    {
      connection,
      repositoryId,
      environmentName,
      secretName,
      encryptedValue,
      keyId,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/repositories/${repositoryId}/environments/${environmentName}/secrets/${secretName}`,
      { encrypted_value: encryptedValue, key_id: keyId },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository",
    },
    environmentName: {
      label: "Environment Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the environment",
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
      required: true,
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
  },
});

const actionsDeleteEnvironmentSecret = action({
  display: {
    label: "Actions Delete Environment Secret",
    description: "Delete an environment secret",
  },
  perform: async (
    context,
    { connection, repositoryId, environmentName, secretName },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repositories/${repositoryId}/environments/${environmentName}/secrets/${secretName}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    repositoryId: {
      label: "Repository Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository",
    },
    environmentName: {
      label: "Environment Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the environment",
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

export default {
  reposListPublic,
  actionsListEnvironmentSecrets,
  actionsGetEnvironmentPublicKey,
  actionsGetEnvironmentSecret,
  actionsCreateOrUpdateEnvironmentSecret,
  actionsDeleteEnvironmentSecret,
};
