import { action, outputSchema } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { getEmployeeExamplePayload } from "../../examplePayloads";
import { getEmployeeInputs } from "../../inputs";
import { getEmployeeOutputSchema } from "../../outputSchemas";
import { EMPLOYEE_FIELDS } from "../../constants";

export const getEmployee = action({
  display: {
    label: "Get Employee",
    description: "Retrieve an employee by ID.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/v1/employees/${params.employeeId}/?fields=${EMPLOYEE_FIELDS.join(",")}`,
    );
    return { data };
  },
  inputs: getEmployeeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEmployeeOutputSchema,
  }),
  examplePayload: getEmployeeExamplePayload,
});
