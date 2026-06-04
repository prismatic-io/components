import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getEmployeeEmploymentDetailsExamplePayload as getEmployeeEmploymentDetailsByEmployeeIdAndCompanyIdExamplePayload } from "../../examplePayloads";
import { getEmployeeEmploymentDetailsByEmployeeIdAndCompanyIdInputs } from "../../inputs";
import type { EmployeeEmploymentDetails } from "../../types";
import { fetchWithPagination } from "../../util";







export const getEmployeeEmploymentDetailsByEmployeeIdAndCompanyId = action({
  display: {
    label: "Get Employee Employment Details by Employee ID and Company ID",
    description: "Retrieve employment details for a specific employee by company and employee ID.",
  },
  inputs: getEmployeeEmploymentDetailsByEmployeeIdAndCompanyIdInputs,
  perform: async (
    context,
    { connection, companyId, employeeId, fetchAll, filterParameters, page, perPage },
  ) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination<EmployeeEmploymentDetails>(
      client,
      `/personnel/v1/companies/${companyId}/employees/${employeeId}/employment-details`,
      { ...filterParameters, page, per_page: perPage },
      fetchAll,
    );

    return { data };
  },
  examplePayload: getEmployeeEmploymentDetailsByEmployeeIdAndCompanyIdExamplePayload,
});
