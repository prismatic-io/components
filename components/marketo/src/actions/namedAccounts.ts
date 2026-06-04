import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  deleteNamedAccountsExamplePayload,
  describeNamedAccountExamplePayload,
  getNamedAccountsByFilterExamplePayload,
  syncNamedAccountsExamplePayload,
} from "../examplePayloads";
import {
  actionInput,
  batchSizeInput,
  connectionInput,
  dedupeByInput,
  deleteByField,
  fieldsInput,
  filterTypeInput,
  filterValuesInput,
  idsToDeleteInput,
  nextPageTokenInput,
} from "../inputs";

const describeNamedAccount = action({
  display: {
    label: "Describe Named Account",
    description:
      "Returns metadata about Named Accounts and the fields available for interaction via the API.",
  },
  perform: async (context, { connection }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v1/namedaccounts/describe.json`);
    return data;
  },
  inputs: {
    connection: connectionInput,
  },
  examplePayload: describeNamedAccountExamplePayload,
});

const getNamedAccountsByFilter = action({
  display: {
    label: "Get Named Accounts By Filter",
    description:
      "Retrieves Named Account records from the destination instance based on the submitted filter.",
  },
  perform: async (
    context,
    { connection, filterType, filterValues, fields, batchSize, nextPageToken },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const params: Record<string, unknown> = {
      filterType,
      filterValues,
      fields,
      batchSize,
    };
    if (nextPageToken) {
      params.nextPageToken = nextPageToken;
    }
    const { data } = await client.get(`/v1/namedaccounts.json`, {
      params,
    });
    return data;
  },
  inputs: {
    connection: connectionInput,
    filterType: filterTypeInput,
    filterValues: filterValuesInput,
    fields: fieldsInput,
    batchSize: batchSizeInput,
    nextPageToken: nextPageTokenInput,
  },
  examplePayload: getNamedAccountsByFilterExamplePayload,
});

const syncNamedAccounts = action({
  display: {
    label: "Sync Named Accounts (Create, Update, Upsert)",
    description:
      "Allows inserts, updates, or upserts of Named Accounts to the target instance.",
  },
  perform: async (context, { connection, action, namedAccounts, dedupeBy }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v1/namedaccounts.json`, {
      action,
      input: namedAccounts,
      dedupeBy,
    });
    return data;
  },
  inputs: {
    connection: connectionInput,
    action: actionInput,
    namedAccounts: input({
      label: "Named Accounts",
      type: "data",
      required: true,
      clean: util.types.toObject,
      comments:
        "An array of Named Account objects to use as input for synchronization.",
    }),
    dedupeBy: dedupeByInput,
  },
  examplePayload: syncNamedAccountsExamplePayload,
});

const deleteNamedAccounts = action({
  display: {
    label: "Delete Named Accounts",
    description: "Delete one or more Named Accounts.",
  },
  perform: async (context, { connection, deleteBy, ids }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v1/namedaccounts/delete.json`, {
      deleteBy,
      input: ids,
    });
    return data;
  },
  inputs: {
    connection: connectionInput,
    deleteBy: deleteByField,
    ids: idsToDeleteInput,
  },
  examplePayload: deleteNamedAccountsExamplePayload,
});

export default {
  describeNamedAccount,
  getNamedAccountsByFilter,
  syncNamedAccounts,
  deleteNamedAccounts,
};
