import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getEmployeeDemographicDetailsInputs } from "../../inputs";
import type { EmployeeDemographicDetails } from "../../types";
import { fetchWithPagination } from "../../util";







export const getEmployeeDemographicDetails = action({
  display: {
    label: "Get Employee Demographic Details",
    description: "Retrieve demographic details for employees, optionally filtered by date range.",
  },
  inputs: getEmployeeDemographicDetailsInputs,
  perform: async (
    context,
    { connection, page, perPage, fetchAll, companyId, filterParameters },
  ) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination<EmployeeDemographicDetails>(
      client,
      "/personnel/v1/employee-demographic-details",
      { ...filterParameters, page, per_page: perPage, companyId },
      fetchAll,
    );
    return { data };
  },
  
  
});
