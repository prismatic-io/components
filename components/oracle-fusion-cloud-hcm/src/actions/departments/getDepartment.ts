import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDepartmentExamplePayload } from "../../examplePayloads/departments";
import { getDepartmentInputs } from "../../inputs";
import { departmentOutputSchema } from "../../outputSchemas";
import type { Department } from "../../types";
export const getDepartment = action({
  display: {
    label: "Get Department",
    description:
      "Retrieve a single department by Department ID from Oracle Fusion Cloud HCM.",
  },
  examplePayload: getDepartmentExamplePayload,
  inputs: getDepartmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: departmentOutputSchema,
  }),
  perform: async (
    context,
    { connection, departmentId, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<Department>(
      `/organizations/${departmentId}`,
      {
        params: {
          effectiveDate,
          onlyData: includeMetadataLinks,
        },
      },
    );
    return { data };
  },
});
