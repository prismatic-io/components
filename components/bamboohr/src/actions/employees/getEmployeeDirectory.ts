import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { listEmployeesExamplePayload } from "../../examplePayloads";
import { getEmployeeDirectoryInputs } from "../../inputs";


export const getEmployeeDirectory = action({
  display: {
    label: "List Employees",
    description: "List all employees from the directory.",
  },
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/v1/employees/directory");
    return { data };
  },
  inputs: getEmployeeDirectoryInputs,
  examplePayload: listEmployeesExamplePayload,
});
