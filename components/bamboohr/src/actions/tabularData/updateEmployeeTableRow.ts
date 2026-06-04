import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { updateEmployeeTableRowExamplePayload } from "../../examplePayloads";
import { updateEmployeeTableRowInputs } from "../../inputs";

export const updateEmployeeTableRow = action({
  display: {
    label: "Update Employee Table Row",
    description: "Update a specific row in an employee table.",
  },
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.post(
      `/v1/employees/${params.employeeId}/tables/${params.tableName}/${params.rowId}`,
      params.tableFieldValues,
    );
    return { data };
  },
  inputs: updateEmployeeTableRowInputs,
  examplePayload: updateEmployeeTableRowExamplePayload,
});
