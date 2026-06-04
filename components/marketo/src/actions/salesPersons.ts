import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  deleteSalesPersonsExamplePayload,
  describeSalesPersonExamplePayload,
  getSalesPersonsByFilterExamplePayload,
  syncSalesPersonsExamplePayload,
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

const describeSalesPerson = action({
  display: {
    label: "Describe Sales Person",
    description:
      "Returns metadata about Sales Persons and the fields available for interaction via the API.",
  },
  perform: async (context, { connection }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v1/salespersons/describe.json`);
    return data;
  },
  inputs: {
    connection: connectionInput,
  },
  examplePayload: describeSalesPersonExamplePayload,
});

const getSalesPersonsByFilter = action({
  display: {
    label: "Get Sales Persons By Filter",
    description:
      "Retrieves Sales Person records from the destination instance based on the submitted filter.",
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
    const { data } = await client.get(`/v1/salespersons.json`, {
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
  examplePayload: getSalesPersonsByFilterExamplePayload,
});

const syncSalesPersons = action({
  display: {
    label: "Sync Sales Persons (Create, Update, Upsert)",
    description:
      "Allows inserts, updates, or upserts of Sales Persons to the target instance.",
  },
  perform: async (context, { connection, action, salesPersons, dedupeBy }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v1/salespersons.json`, {
      action,
      input: salesPersons,
      dedupeBy,
    });
    return data;
  },
  inputs: {
    connection: connectionInput,
    action: actionInput,
    salesPersons: input({
      label: "Sales Persons",
      type: "data",
      required: true,
      clean: util.types.toObject,
      comments:
        "An array of Sales Person objects to use as input for synchronization.",
    }),
    dedupeBy: dedupeByInput,
  },
  examplePayload: syncSalesPersonsExamplePayload,
});

const deleteSalesPersons = action({
  display: {
    label: "Delete Sales Persons",
    description: "Delete one or more Sales Persons.",
  },
  perform: async (context, { connection, deleteBy, ids }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v1/salespersons/delete.json`, {
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
  examplePayload: deleteSalesPersonsExamplePayload,
});

export default {
  describeSalesPerson,
  getSalesPersonsByFilter,
  syncSalesPersons,
  deleteSalesPersons,
};
