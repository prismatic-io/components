import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { listCompaniesExamplePayload } from "../../examplePayloads";
import { listCompaniesInputs } from "../../inputs";
import { fetchWithPagination } from "../../util";







export const listCompanies = action({
  display: {
    label: "List Companies",
    description: "Retrieve a list of all companies defined in the organization.",
  },
  inputs: listCompaniesInputs,
  perform: async (
    context,
    {
      connection,
      companyCode,
      companyId,
      fetchAll,
      isMasterCompany,
      masterCompanyId,
      page,
      perPage,
    },
  ) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination(
      client,
      "/configuration/v1/company-details",
      { companyCode, companyId, isMasterCompany, masterCompanyId, page, perPage },
      fetchAll,
    );

    return { data };
  },
  examplePayload: listCompaniesExamplePayload,
});
