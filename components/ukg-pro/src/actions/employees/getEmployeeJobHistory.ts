import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getEmployeeJobHistoryExamplePayload } from "../../examplePayloads";
import { getEmployeeJobHistoryInputs } from "../../inputs";
import type { EmployeeJobHistoryDetails } from "../../types";
import { fetchWithPagination } from "../../util";







export const getEmployeeJobHistory = action({
  display: {
    label: "Get Employee Job History",
    description: "Retrieve the complete job history for a specific employee.",
  },
  inputs: getEmployeeJobHistoryInputs,
  perform: async (context, { connection, employeeId, page, perPage, fetchAll }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination<EmployeeJobHistoryDetails>(
      client,
      "/employee-job-history-details",
      { employeeId, page, per_page: perPage },
      fetchAll,
    );

    return { data };
  },
  examplePayload: getEmployeeJobHistoryExamplePayload,
});
