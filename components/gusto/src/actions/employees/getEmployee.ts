import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { getEmployeeInputs } from "../../inputs";
import { createClient } from "../../client";
import { getEmployeeExamplePayload } from "../../examplePayloads";
import { getEmployeeOutputSchema } from "../../outputSchemas";

export const getEmployee = action({
  display: {
    label: "Get Employee",
    description: "Gets an employee by ID.",
  },
  inputs: getEmployeeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEmployeeOutputSchema,
  }),
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.get(
      `/employees/${params.employeeId}`,
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.SAFE,
  examplePayload: getEmployeeExamplePayload,
});
