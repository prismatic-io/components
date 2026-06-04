import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDepartmentsResponse } from "../../examplePayloads/departments";
import { defaultListInputs } from "../../inputs";
import type { Department } from "../../interfaces/departments";
import { fetchAllData } from "../../util";

export const listDepartments = action({
  display: {
    label: "List Departments",
    description: "Retrieve a list of all Departments",
  },
  inputs: {
    ...defaultListInputs,
  },
  perform: async (context, { connection, customQueryParams, fetchAll, pageSize, start }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<Department>(
      client,
      "departments",
      {
        ...customQueryParams,
        page_size: pageSize,
        start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listDepartmentsResponse,
  },
});
