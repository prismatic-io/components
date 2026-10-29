import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  deleteLeadsExamplePayload,
  describeLeadExamplePayload,
  getLeadByIdExamplePayload,
  getLeadsByFilterExamplePayload,
  getSearchableLeadFieldsExamplePayload,
  syncLeadsExamplePayload,
} from "../examplePayloads";
import {
  batchSizeInput,
  connectionInput,
  fieldsInput,
  filterTypeInput,
  filterValuesInput,
  nextPageTokenInput,
} from "../inputs";
import type { Lead, PaginatedResponse } from "../interfaces";

const describeLead = action({
  display: {
    label: "Describe Lead",
    description:
      "Returns metadata about lead objects in the target instance, including a list of all fields available for interaction via the APIs.",
  },
  perform: async (context, { connection }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<PaginatedResponse<Lead>>(
      `/v1/leads/describe.json`,
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
  },
  examplePayload: describeLeadExamplePayload,
});

const getSearchableLeadFields = action({
  display: {
    label: "Get Searchable Lead Fields",
    description:
      "Returns list of searchable fields on lead objects in the target instance.",
  },
  perform: async (context, { connection }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v1/leads/describe2.json`);
    return data;
  },
  inputs: {
    connection: connectionInput,
  },
  examplePayload: getSearchableLeadFieldsExamplePayload,
});

const getLeadById = action({
  display: {
    label: "Get Lead By Id",
    description: "Retrieves a single lead record through its Marketo id.",
  },
  perform: async (context, { connection, leadId, fields }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v1/lead/${leadId}.json`, {
      params: { fields },
    });
    return data;
  },
  inputs: {
    connection: connectionInput,
    leadId: input({
      label: "Lead Id",
      type: "string",
      required: true,
      clean: (value): string => util.types.toString(value),
      comments: "The Marketo lead id.",
      dataSource: "selectLead",
    }),
    fields: fieldsInput,
  },
  examplePayload: getLeadByIdExamplePayload,
});

const getLeadsByFilter = action({
  display: {
    label: "Get Leads By Filter",
    description:
      "Returns a list of up to 300 leads based on a list of values in a particular field.",
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
    const { data } = await client.get(`/v1/leads.json`, {
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
  examplePayload: getLeadsByFilterExamplePayload,
});

const syncLeads = action({
  display: {
    label: "Sync Leads (Create, Update, Upsert)",
    description: "Syncs a list of leads to the target instance.",
  },
  perform: async (
    context,
    { connection, action, asyncProcessing, leads, lookupField, partitionName },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const params: Record<string, unknown> = {
      action,
      asyncProcessing,
      input: leads,
      lookupField,
    };
    if (partitionName) {
      params.partitionName = partitionName;
    }
    const { data } = await client.post(`/v1/leads.json`, params);
    return data;
  },
  inputs: {
    connection: connectionInput,
    action: input({
      label: "Action",
      placeholder: "Action",
      type: "string",
      required: true,
      default: "createOrUpdate",
      model: [
        { label: "Create or Update", value: "createOrUpdate" },
        { label: "Create Only", value: "createOnly" },
        { label: "Update Only", value: "updateOnly" },
        { label: "Create Duplicates", value: "createDuplicate" },
      ],
      comments: "Type of sync operation to perform",
      clean: (value): string => util.types.toString(value, "createOrUpdate"),
    }),
    asyncProcessing: input({
      label: "Async Processing",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value): boolean => util.types.toBool(value, false),
      comments: "If set to true, the call will return immediately",
    }),
    leads: input({
      label: "Leads",
      type: "data",
      required: true,
      clean: util.types.toObject,
      comments: "An array of Lead objects to use as input for synchronization.",
    }),
    lookupField: input({
      label: "Lookup Field",
      type: "string",
      required: false,
      default: "email",
      clean: (value): string => util.types.toString(value, "email"),
      comments:
        "Field to deduplicate on. The field must be present in each lead record of the input. Defaults to email if unset.",
    }),
    partitionName: input({
      label: "Partition Name",
      type: "string",
      required: false,
      clean: util.types.toString,
      comments:
        "Name of the partition to operate on, if applicable. Should be set whenever possible, when interacting with an instance where partitions are enabled.",
    }),
  },
  examplePayload: syncLeadsExamplePayload,
});

const deleteLeads = action({
  display: {
    label: "Delete Leads",
    description: "Delete one or more Leads by their Marketo id.",
  },
  perform: async (context, { connection, ids }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v1/leads/delete.json`, {
      input: ids.map((id) => ({ id })),
    });
    return data;
  },
  inputs: {
    connection: connectionInput,
    ids: input({
      label: "Ids",
      type: "string",
      required: true,
      collection: "valuelist",
      clean: (values): string[] =>
        (Array.isArray(values) ? values : []).map((value) =>
          util.types.toString(value),
        ),
      comments: "The Marketo id(s) of the record(s) to delete.",
    }),
  },
  examplePayload: deleteLeadsExamplePayload,
});

export default {
  describeLead,
  getSearchableLeadFields,
  getLeadById,
  getLeadsByFilter,
  syncLeads,
  deleteLeads,
};
