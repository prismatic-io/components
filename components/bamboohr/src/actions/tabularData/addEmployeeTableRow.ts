import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { MESSAGES } from "../../constants";
import { addEmployeeTableRowExamplePayload } from "../../examplePayloads";
import { addEmployeeTableRowInputs } from "../../inputs";

export const addEmployeeTableRow = action({
  display: {
    label: "Add Employee Table Row",
    description: "Add a row to the specified table for an employee.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    await client.post(
      `/v1_1/employees/${params.employeeId}/tables/${params.tableName}`,
      params.tableFieldValues,
    );
    return { data: { message: MESSAGES.ROW_ADDED } };
  },
  examplePerform: async () => addEmployeeTableRowExamplePayload,
  inputs: addEmployeeTableRowInputs,
  examplePayload: addEmployeeTableRowExamplePayload,
});
