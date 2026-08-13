import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDepartmentsResponse } from "../../examplePayloads/departments";
import { defaultListInputs } from "../../inputs";
import type { Department } from "../../interfaces/departments";
import { listDepartmentsOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listDepartments = action({
  display: {
    label: "List Departments",
    description: "Retrieve a list of all Departments",
  },
  inputs: {
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDepartmentsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<Department>(
      client,
      "departments",
      {
        ...customQueryParams,
        page_size: pagination.pageSize,
        start: pagination.start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { fetchAll },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...listDepartmentsResponse,
      page: fetchAll ? null : listDepartmentsResponse.page,
    },
  }),
  examplePayload: {
    data: listDepartmentsResponse,
  },
});
