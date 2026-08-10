import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDepartmentsExamplePayload } from "../../examplePayloads/departments";
import { listDepartmentsInputs } from "../../inputs";
import { listDepartmentsOutputSchema } from "../../outputSchemas";
import type { Department } from "../../types";
import { paginateResults } from "../../util/pagination";
export const listDepartments = action({
  display: {
    label: "List Departments",
    description:
      "Retrieve a paginated list of departments from Oracle Fusion Cloud HCM.",
  },
  examplePayload: listDepartmentsExamplePayload,
  inputs: listDepartmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDepartmentsOutputSchema,
  }),
  perform: async (
    context,
    { connection, fetchAll, pagination, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<Department>(
      client,
      "/organizations",
      fetchAll,
      {
        offset: pagination.offset,
        limit: pagination.limit,
        effectiveDate,
        onlyData: includeMetadataLinks,
      },
    );
    return { data };
  },
});
