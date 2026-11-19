import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { terminateEmployeeInputs } from "../../inputs";
import { createClient } from "../../client";
import { terminateEmployeeExamplePayload } from "../../examplePayloads";
import { terminateEmployeeOutputSchema } from "../../outputSchemas";

export const terminateEmployee = action({
  display: {
    label: "Terminate Employee",
    description: "Ends an employee's employment.",
  },
  inputs: terminateEmployeeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: terminateEmployeeOutputSchema,
  }),
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.post(
      `/employees/${params.employeeId}/terminations`,
      {
        effective_date: params.terminationDate,
        run_termination_payroll: params.runTerminationPayroll,
      },
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: terminateEmployeeExamplePayload,
});
