import { action, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import {
  createCompanyPayload,
  deleteCompanyPayload,
  listCompaniesPayload,
  updateCompanyPayload,
} from "../examplePayloads";
import {
  additionalProperties,
  after,
  archived,
  associationsList,
  city,
  companyId,
  companyName,
  companyPhone,
  connectionInput,
  description,
  domain,
  dynamicValues,
  fetchAll,
  fieldValues,
  industry,
  limit,
  state,
  timeout,
  updateCompanyName,
  updateDomain,
} from "../inputs";
import { getAllPaginatedData, getProps, toStringList } from "../util";

const companyProps = ["name", "state", "city", "domain", "industry"];

export const listCompanies = action({
  display: {
    label: "List Companies",
    description: "Retrieve a list of all companies",
  },
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(companyProps, params.additionalProperties || []);
    const url = "/crm/v3/objects/companies";
    const configParams = {
      ...parameterizedProperties,
      limit: util.types.toInt(params.limit) || undefined,
      after: util.types.toString(params.after) || undefined,
      associations: toStringList(params.associationsList || []).join(",") || undefined,
      archived: util.types.toBool(params.archived) || false,
    };
    const data = await getAllPaginatedData(client, url, params.fetchAll, false, {
      params: configParams,
    });

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    additionalProperties,
    associationsList,
    archived,
    timeout,
    fetchAll,
    limit,
    after,
  },
  examplePayload: listCompaniesPayload,
});

export const getCompany = action({
  display: {
    label: "Get Company",
    description: "Retrieve the information or metadata of a company by Id, domain, or name",
  },
  perform: async (
    context,
    {
      companyId,
      timeout,
      hubspotConnection,
      companyName,
      domain,
      additionalProperties,
      associationsList,
      archived,
    },
  ) => {
    const id = util.types.toString(companyId);
    const name = util.types.toString(companyName);
    const domainString = util.types.toString(domain);

    if (!id && !domainString && !name && !id) {
      throw new Error(
        "You must supply either an Id, domain, or name to retrieve a company record.",
      );
    }

    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(companyProps, additionalProperties || []);

    const params = {
      ...parameterizedProperties,
      associations: toStringList(associationsList || []).join(",") || undefined,
      archived: util.types.toBool(archived) || false,
    };

    const companiesUrl = "/crm/v3/objects/companies";

    if (domainString) {
      const companies = await getAllPaginatedData(client, companiesUrl, true, true, {
        params: {
          ...params,
          limit: undefined,
          after: undefined,
        },
      });

      const filteredCompanies = (
        (companies as unknown as { properties?: { domain?: string } }[]) || []
      ).filter((company) => {
        return company?.properties?.domain === domainString;
      });

      if (filteredCompanies.length === 0) {
        throw new Error(`No companies found matching ${domainString}`);
      }
      return { data: filteredCompanies };
    }

    if (name) {
      const companies = await getAllPaginatedData(client, companiesUrl, true, true, {
        params: {
          ...params,
          limit: undefined,
          after: undefined,
        },
      });

      const filteredCompanies = (
        (companies as unknown as { properties?: { name?: string } }[]) || []
      ).filter((company) => {
        return company?.properties?.name === name;
      });
      if (filteredCompanies.length === 0) {
        throw new Error(`No companies found matching ${name}`);
      }
      return { data: filteredCompanies };
    }
    return {
      data: (
        await client.get(`${companiesUrl}/${companyId}`, {
          params,
        })
      ).data,
    };
  },
  inputs: {
    companyId: { ...companyId, required: false },
    companyName: { ...companyName, required: false },
    domain: { ...domain, required: false },
    additionalProperties,
    associationsList,
    archived,
    timeout,
    hubspotConnection: connectionInput,
  },
  
});

export const deleteCompany = action({
  display: {
    label: "Delete Company",
    description: "Delete an existing company by Id",
  },
  perform: async (context, { companyId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (await client.delete(`/crm/v3/objects/companies/${companyId}`)).data,
    };
  },
  inputs: {
    companyId,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: deleteCompanyPayload,
});

export const createCompany = action({
  display: {
    label: "Create Company",
    description: "Create a new company",
  },
  perform: async (
    context,
    {
      companyName,
      industry,
      companyPhone,
      domain,
      city,
      state,
      timeout,
      fieldValues,
      dynamicValues,
      description,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.post("/crm/v3/objects/companies", {
          properties: {
            city,
            domain,
            industry,
            name: companyName,
            phone: companyPhone,
            state,
            description: description || undefined,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    companyName,
    industry,
    companyPhone,
    description,
    domain: { ...domain, required: false },
    city,
    state,
    fieldValues,
    dynamicValues,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: createCompanyPayload,
});

export const updateCompany = action({
  display: {
    label: "Update Company",
    description: "Update the information and metadata of an existing company",
  },
  perform: async (
    context,
    {
      companyId,
      updateCompanyName,
      industry,
      companyPhone,
      updateDomain,
      city,
      state,
      timeout,
      fieldValues,
      dynamicValues,
      description,
      hubspotConnection,
    },
  ) => {
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest: context.debug.enabled,
    });

    return {
      data: (
        await client.patch(`/crm/v3/objects/companies/${companyId}`, {
          properties: {
            city: city || undefined,
            domain: updateDomain || undefined,
            industry: industry || undefined,
            name: updateCompanyName || undefined,
            phone: companyPhone || undefined,
            state: state || undefined,
            description: description || undefined,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    companyId,
    updateCompanyName,
    industry,
    description,
    companyPhone,
    updateDomain,
    city,
    state,
    fieldValues,
    dynamicValues,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: updateCompanyPayload,
});
