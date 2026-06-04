import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  deleteOpportunitiesExamplePayload,
  describeOpportunitiesExamplePayload,
  getOpportunitiesByFilterExamplePayload,
  syncOpportunitiesExamplePayload,
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

const describeOpportunities = action({
  display: {
    label: "Describe Opportunities",
    description:
      "Returns metadata about Opportunities and the fields available for interaction via the API.",
  },
  perform: async (context, { connection }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v1/opportunities/describe.json`);
    return data;
  },
  inputs: {
    connection: connectionInput,
  },
  examplePayload: describeOpportunitiesExamplePayload,
});

const getOpportunitiesByFilter = action({
  display: {
    label: "Get Opportunities By Filter",
    description:
      "Retrieves Opportunity records from the destination instance based on the submitted filter.",
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
    const { data } = await client.get(`/v1/opportunities.json`, {
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
  examplePayload: getOpportunitiesByFilterExamplePayload,
});

const syncOpportunities = action({
  display: {
    label: "Sync Opportunities (Create, Update, Upsert)",
    description:
      "Allows inserts, updates, or upserts of Opportunities to the target instance.",
  },
  perform: async (context, { connection, action, opportunities, dedupeBy }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v1/opportunities.json`, {
      action,
      input: opportunities,
      dedupeBy,
    });
    return data;
  },
  inputs: {
    connection: connectionInput,
    action: actionInput,
    opportunities: input({
      label: "Opportunities",
      type: "data",
      required: true,
      clean: util.types.toObject,
      comments:
        "An array of Opportunities objects to use as input for synchronization.",
    }),
    dedupeBy: dedupeByInput,
  },
  examplePayload: syncOpportunitiesExamplePayload,
});

const deleteOpportunities = action({
  display: {
    label: "Delete Opportunities",
    description: "Delete one or more Opportunities.",
  },
  perform: async (context, { connection, deleteBy, ids }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v1/opportunities/delete.json`, {
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
  examplePayload: deleteOpportunitiesExamplePayload,
});

export default {
  describeOpportunities,
  getOpportunitiesByFilter,
  syncOpportunities,
  deleteOpportunities,
};
