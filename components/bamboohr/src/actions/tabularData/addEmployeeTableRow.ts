import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { addEmployeeTableRowExamplePayload } from "../../examplePayloads";
import { addEmployeeTableRowInputs } from "../../inputs";


export const addEmployeeTableRow = action({
  display: {
    label: "Add Employee Table Row",
    description: "Add a row to the specified table for an employee.",
  },
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.post(
      `/v1/employees/${params.employeeId}/tables/${params.tableName}`,
      params.tableFieldValues,
    );
    return { data };
  },
  inputs: addEmployeeTableRowInputs,
  examplePayload: addEmployeeTableRowExamplePayload,
});
