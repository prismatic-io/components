import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connectionInput,
  employeeIdInput,
  terminationDateInput,
  runTerminationPayrollInput,
} from "../inputs";
import { terminateEmployeeExamplePayload } from "../examplePayloads";

const terminateEmployee = action({
  display: {
    label: "Terminate Employee",
    description: "End an employee's employment",
  },
  inputs: {
    connection: connectionInput,
    employeeId: employeeIdInput,
    terminationDate: terminationDateInput,
    runTerminationPayroll: runTerminationPayrollInput,
  },
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
  examplePayload: terminateEmployeeExamplePayload,
});

export default { terminateEmployee };
