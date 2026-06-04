import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getEmployeeEmploymentDetailsExamplePayload } from "../../examplePayloads";
import { getEmployeeEmploymentDetailsInputs } from "../../inputs";
import type { EmployeeEmploymentDetails } from "../../types";
import { fetchWithPagination } from "../../util";







export const getEmployeeEmploymentDetails = action({
  display: {
    label: "Get Employee Employment Details",
    description:
      "Retrieve employee's employment details according to the specified query parameters.",
  },
  inputs: getEmployeeEmploymentDetailsInputs,
  perform: async (
    context,
    {
      connection,
      companyId,
      employeeId,
      fetchAll,
      filterParameters,
      page,
      perPage,
      deductionGroupCode,
      earningGroupCode,
      primaryJobCode,
      primaryProjectCode,
      primaryWorkLocationCode,
    },
  ) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination<EmployeeEmploymentDetails>(
      client,
      "/personnel/v1/employee-employment-details",
      {
        ...filterParameters,
        page,
        per_page: perPage,
        companyId,
        employeeId,
        deductionGroupCode,
        earningGroupCode,
        primaryJobCode,
        primaryWorkLocationCode,
        primaryProjectCode,
      },
      fetchAll,
    );

    return { data };
  },
  examplePayload: getEmployeeEmploymentDetailsExamplePayload,
});
