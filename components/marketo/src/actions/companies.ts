import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  deleteCompaniesExamplePayload,
  describeCompanyExamplePayload,
  getCompaniesByFilterExamplePayload,
  syncCompaniesExamplePayload,
} from "../examplePayloads";
import {
  actionInput,
  batchSizeInput,
  connectionInput,
  dedupeByInput,
  deleteByField,
  fetchAllInput,
  fieldsInput,
  filterTypeInput,
  filterValuesInput,
  idsToDeleteInput,
  nextPageTokenInput,
} from "../inputs";
import type { Company } from "../interfaces";
import { fetchPaginatedData } from "../utils";

const describeCompany = action({
  display: {
    label: "Describe Company",
    description:
      "Returns metadata about companies and the fields available for interaction via the API.",
  },
  perform: async (context, { connection }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v1/companies/describe.json`);
    return data;
  },
  inputs: {
    connection: connectionInput,
  },
  examplePayload: describeCompanyExamplePayload,
});

const getCompaniesByFilter = action({
  display: {
    label: "Get Companies By Filter",
    description:
      "Retrieves company records from the destination instance based on the submitted filter.",
  },
  perform: async (
    context,
    {
      connection,
      filterType,
      filterValues,
      fields,
      batchSize,
      nextPageToken,
      fetchAll,
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

    const data = await fetchPaginatedData<Company>(
      client,
      `/v1/companies.json`,
      fetchAll,
      params,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    filterType: filterTypeInput,
    filterValues: { ...filterValuesInput, dataSource: "selectCompany" },
    fields: fieldsInput,
    batchSize: batchSizeInput,
    nextPageToken: nextPageTokenInput,
    fetchAll: fetchAllInput,
  },
  examplePayload: getCompaniesByFilterExamplePayload,
});

const syncCompanies = action({
  display: {
    label: "Sync Companies (Create, Update, Upsert)",
    description:
      "Allows inserting, updating, or upserting of company records into Marketo.",
  },
  perform: async (context, { connection, action, companies, dedupeBy }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v1/companies.json`, {
      action,
      input: companies,
      dedupeBy,
    });
    return data;
  },
  inputs: {
    connection: connectionInput,
    action: actionInput,
    companies: input({
      label: "Companies",
      type: "data",
      required: true,
      clean: util.types.toObject,
      comments:
        "An array of Company objects to use as input for synchronization.",
    }),
    dedupeBy: dedupeByInput,
  },
  examplePayload: syncCompaniesExamplePayload,
});

const deleteCompanies = action({
  display: {
    label: "Delete Companies",
    description: "Delete one or more Companies.",
  },
  perform: async (context, { connection, deleteBy, ids }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v1/companies/delete.json`, {
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
  examplePayload: deleteCompaniesExamplePayload,
});

export default {
  describeCompany,
  getCompaniesByFilter,
  syncCompanies,
  deleteCompanies,
};
