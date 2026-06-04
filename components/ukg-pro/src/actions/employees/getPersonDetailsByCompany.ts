import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getPersonDetailsByCompanyExamplePayload } from "../../examplePayloads";
import { getPersonDetailsByCompanyInputs } from "../../inputs";
import type { EmployeeDetails } from "../../types";
import { fetchWithPagination } from "../../util";







export const getPersonDetailsByCompany = action({
  display: {
    label: "Get Person Details by Company",
    description: "Retrieve person details for all employees within a specific company.",
  },
  inputs: getPersonDetailsByCompanyInputs,
  perform: async (context, { connection, companyId, fetchAll, page, perPage }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination<EmployeeDetails>(
      client,
      `/personnel/v1/companies/${companyId}/person-details`,
      { page, per_page: perPage },
      fetchAll,
    );

    return { data };
  },
  examplePayload: getPersonDetailsByCompanyExamplePayload,
});
