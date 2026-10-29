import { action } from "@prismatic-io/spectral";
import {
  companyIdInput,
  connectionInput,
  fetchAll,
  paginationPageInput,
} from "../inputs";
import { createClient } from "../client";
import {
  listCompaniesExamplePayload,
  getCompanyExamplePayload,
  listCompanyAdminsExamplePayload,
} from "../examplePayloads";
import { fetchAllPages } from "../util";

const listCompanies = action({
  display: {
    label: "List Companies",
    description:
      "List all companies that the currently authenticated user is a part of",
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    page: paginationPageInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    if (params.fetchAll) {
      const data = await fetchAllPages(client, "/companies");
      return { data: { data, headers: {} } };
    }

    const { data, headers } = await client.get("/companies", {
      params: { page: params.page },
    });
    return { data: { data, headers } };
  },
  examplePayload: listCompaniesExamplePayload,
});

const getCompany = action({
  display: {
    label: "Get Company by ID",
    description: "Get company metadata by ID",
  },
  inputs: {
    connection: connectionInput,
    companyId: companyIdInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.get(
      `/companies/${params.companyId}`,
    );
    return { data: { data, headers } };
  },
  examplePayload: getCompanyExamplePayload,
});

const listCompanyAdmins = action({
  display: {
    label: "List Company Admins",
    description: "List all admin users at a company",
  },
  inputs: {
    connection: connectionInput,
    companyId: companyIdInput,
    fetchAll,
    page: paginationPageInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    if (params.fetchAll) {
      const data = await fetchAllPages(
        client,
        `/companies/${params.companyId}/admins`,
      );
      return { data: { data, headers: {} } };
    }

    const { data, headers } = await client.get(
      `/companies/${params.companyId}/admins`,
      {
        params: { page: params.page },
      },
    );
    return { data: { data, headers } };
  },
  examplePayload: listCompanyAdminsExamplePayload,
});

export default { getCompany, listCompanies, listCompanyAdmins };
