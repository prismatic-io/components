import { action, outputSchema } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { COMPANY_PROPS } from "../../constants";
import { getCompanyInputs } from "../../inputs";
import { getCompanyOutputSchema } from "../../outputSchemas";
import { getAllPaginatedData, getProps } from "../../util";
export const getCompany = action({
  display: {
    label: "Get Company",
    description:
      "Retrieve the information or metadata of a company by Id, domain, or name.",
  },
  performSafety: "notAllowed",
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
    if (!companyId && !domain && !companyName) {
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
    const parameterizedProperties = getProps(
      COMPANY_PROPS,
      additionalProperties || [],
    );
    const params = {
      ...parameterizedProperties,
      associations: associationsList,
      archived: archived,
    };
    const companiesUrl = "/crm/v3/objects/companies";
    if (domain) {
      const companies = await getAllPaginatedData(
        client,
        companiesUrl,
        true,
        true,
        {
          params: {
            ...params,
            limit: undefined,
            after: undefined,
          },
        },
      );
      const filteredCompanies = (
        (companies as unknown as {
          properties?: {
            domain?: string;
          };
        }[]) || []
      ).filter((company) => {
        return company?.properties?.domain === domain;
      });
      if (filteredCompanies.length === 0) {
        throw new Error(`No companies found matching ${domain}`);
      }
      return { data: filteredCompanies };
    }
    if (companyName) {
      const companies = await getAllPaginatedData(
        client,
        companiesUrl,
        true,
        true,
        {
          params: {
            ...params,
            limit: undefined,
            after: undefined,
          },
        },
      );
      const filteredCompanies = (
        (companies as unknown as {
          properties?: {
            name?: string;
          };
        }[]) || []
      ).filter((company) => {
        return company?.properties?.name === companyName;
      });
      if (filteredCompanies.length === 0) {
        throw new Error(`No companies found matching ${companyName}`);
      }
      return { data: filteredCompanies };
    }
    const { data } = await client.get(`${companiesUrl}/${companyId}`, {
      params,
    });
    return { data };
  },
  inputs: getCompanyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCompanyOutputSchema,
  }),
});
