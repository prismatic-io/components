import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDepartmentsExamplePayload } from "../../examplePayloads";
import { listDepartmentsInputs } from "../../inputs";
import type { Department } from "../../types";
import { paginateResults } from "../../util";
export const listDepartments = action({
  display: {
    label: "List Departments",
    description: "List all departments with optional filtering and pagination.",
  },
  inputs: listDepartmentsInputs,
  perform: async (
    context,
    { connection, pagination, sort, filter, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateResults<Department>(
      client,
      "/v1/departments",
      fetchAll,
      { page: pagination.page, "page-size": pagination.pageSize, sort, filter },
    );
    return { data };
  },
  examplePayload: listDepartmentsExamplePayload,
});
