import { action, outputSchema } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { getEmployeeTableExamplePayload } from "../../examplePayloads";
import { getEmployeeTableInputs } from "../../inputs";
import { getEmployeeTableOutputSchema } from "../../outputSchemas";

export const getEmployeeTable = action({
  display: {
    label: "Get Employee Table",
    description: "Retrieve a specific table associated with an employee.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/v1/employees/${params.employeeId}/tables/${params.tableName}`,
    );
    return { data };
  },
  inputs: getEmployeeTableInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEmployeeTableOutputSchema,
  }),
  examplePayload: getEmployeeTableExamplePayload,
});
