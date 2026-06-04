import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  deleteCustomObjectsExamplePayload,
  describeCustomObjectExamplePayload,
  getCustomObjectsByFilterExamplePayload,
  listCustomObjectsExamplePayload,
  syncCustomObjectsExamplePayload,
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

const customObjectNameInput = input({
  label: "Custom Object Name",
  type: "string",
  required: true,
  clean: (value): string => util.types.toString(value),
  comments: "The name of the Custom Object",
  dataSource: "selectCustomObject",
});

const listCustomObjects = action({
  display: {
    label: "List Custom Objects",
    description:
      "Returns a list of Custom Object types available in the target instance, along with id and deduplication information for each type.",
  },
  perform: async (context, { connection }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v1/customobjects.json`);
    return data;
  },
  inputs: {
    connection: connectionInput,
  },
  examplePayload: listCustomObjectsExamplePayload,
});

const describeCustomObject = action({
  display: {
    label: "Describe Custom Object",
    description: "Returns metadata regarding a given custom object.",
  },
  perform: async (context, { connection, customObjectName }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/v1/customobjects/${customObjectName}/describe.json`,
    );
    return data;
  },
  inputs: {
    connection: connectionInput,
    customObjectName: customObjectNameInput,
  },
  examplePayload: describeCustomObjectExamplePayload,
});

const getCustomObjectsByFilter = action({
  display: {
    label: "Get Custom Objects By Filter",
    description:
      "Retrieves a list of custom objects records based on filter and set of values.",
  },
  perform: async (
    context,
    {
      connection,
      customObjectName,
      filterType,
      filterValues,
      fields,
      batchSize,
      nextPageToken,
    },
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
    const { data } = await client.get(
      `/v1/customobjects/${customObjectName}.json`,
      {
        params,
      },
    );
    return data;
  },
  inputs: {
    connection: connectionInput,
    customObjectName: customObjectNameInput,
    filterType: filterTypeInput,
    filterValues: filterValuesInput,
    fields: fieldsInput,
    batchSize: batchSizeInput,
    nextPageToken: nextPageTokenInput,
  },
  examplePayload: getCustomObjectsByFilterExamplePayload,
});

const syncCustomObjects = action({
  display: {
    label: "Sync Custom Objects (Create, Update, Upsert)",
    description:
      "Inserts, updates, or upserts custom object records to the target instance.",
  },
  perform: async (
    context,
    { connection, customObjectName, action, customObjects, dedupeBy },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const params: Record<string, unknown> = {
      action,
      input: customObjects,
      dedupeBy,
    };
    const { data } = await client.post(
      `/v1/customobjects/${customObjectName}.json`,
      params,
    );
    return data;
  },
  inputs: {
    connection: connectionInput,
    customObjectName: customObjectNameInput,
    action: actionInput,
    customObjects: input({
      label: "Custom Objects",
      type: "data",
      required: true,
      clean: util.types.toObject,
      comments:
        "An array of Custom Objects to use as input for synchronization.",
    }),
    dedupeBy: dedupeByInput,
  },
  examplePayload: syncCustomObjectsExamplePayload,
});

const deleteCustomObjects = action({
  display: {
    label: "Delete Custom Objects",
    description: "Delete one or more Custom Objects.",
  },
  perform: async (context, { connection, customObjectName, deleteBy, ids }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/v1/customobjects/${customObjectName}/delete.json`,
      { deleteBy, input: ids },
    );
    return data;
  },
  inputs: {
    connection: connectionInput,
    customObjectName: customObjectNameInput,
    deleteBy: deleteByField,
    ids: idsToDeleteInput,
  },
  examplePayload: deleteCustomObjectsExamplePayload,
});

export default {
  listCustomObjects,
  describeCustomObject,
  getCustomObjectsByFilter,
  syncCustomObjects,
  deleteCustomObjects,
};
