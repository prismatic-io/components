import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { getEmployeeTableExamplePayload } from "../../examplePayloads";
import { getEmployeeTableInputs } from "../../inputs";


export const getEmployeeTable = action({
  display: {
    label: "Get Employee Table",
    description: "Retrieve a specific table associated with an employee.",
  },
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/v1/employees/${params.employeeId}/tables/${params.tableName}`,
    );
    return { data };
  },
  inputs: getEmployeeTableInputs,
  examplePayload: getEmployeeTableExamplePayload,
});
