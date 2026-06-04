import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getAllEmploymentDetailsByCompanyInputs } from "../../inputs";
import type { EmploymentDetails } from "../../types";
import { fetchWithPagination } from "../../util";







export const getAllEmploymentDetailsByCompany = action({
  display: {
    label: "Get All Employment Details by Company",
    description: "Retrieve employment details for all employees within a specific company.",
  },
  inputs: getAllEmploymentDetailsByCompanyInputs,
  perform: async (
    context,
    { connection, companyId, filterParameters, fetchAll, page, perPage },
  ) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination<EmploymentDetails>(
      client,
      `/personnel/v1/companies/${companyId}/employment-details`,
      { ...filterParameters, page, per_page: perPage },
      fetchAll,
    );

    return { data };
  },
  
  
});
