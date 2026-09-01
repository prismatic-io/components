import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getEmployeeContractDetailsExamplePayload } from "../../examplePayloads";
import { getEmploymentContractDetailsInputs } from "../../inputs";
import type { EmployeeContractDetails } from "../../types";
import { fetchWithPagination } from "../../util";
export const getEmploymentContractDetails = action({
  display: {
    label: "Get All Employment Contract Details",
    description: "Retrieve contract details for all employees.",
  },
  inputs: getEmploymentContractDetailsInputs,
  perform: async (
    context,
    { connection, companyId, fetchAll, filterParameters, pagination },
  ) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);
    const { data } = await fetchWithPagination<EmployeeContractDetails>(
      client,
      "/personnel/v1/employee-contract-details",
      {
        ...filterParameters,
        companyId,
        page: pagination.page,
        per_page: pagination.perPage,
      },
      fetchAll,
    );
    return { data };
  },
  examplePayload: getEmployeeContractDetailsExamplePayload,
});
