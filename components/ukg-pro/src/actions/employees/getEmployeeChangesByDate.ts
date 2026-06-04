import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getEmployeeChangesByDateExamplePayload } from "../../examplePayloads";
import { getEmployeeChangesByDateInputs } from "../../inputs";
import type { EmployeeChange } from "../../types";
import { fetchWithPagination } from "../../util";







export const getEmployeeChangesByDate = action({
  display: {
    label: "Get Employee Changes by Date",
    description:
      "Retrieve employees with changes since a specified date. Note: Date must be at least 3 hours ago.",
  },
  inputs: getEmployeeChangesByDateInputs,
  perform: async (context, { connection, startDate, endDate, fetchAll, page, perPage }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination<EmployeeChange>(
      client,
      "/personnel/v1/employee-changes",
      { start_date: startDate, end_date: endDate, page, per_page: perPage },
      fetchAll,
    );

    return { data };
  },
  examplePayload: getEmployeeChangesByDateExamplePayload,
});
