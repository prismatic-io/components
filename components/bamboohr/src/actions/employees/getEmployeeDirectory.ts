import { action, outputSchema } from "@prismatic-io/spectral";
import { ENDPOINTS } from "../../constants";
import { createBambooClient } from "../../client";
import { getEmployeeDirectoryExamplePayload } from "../../examplePayloads";
import { getEmployeeDirectoryInputs } from "../../inputs";
import { getEmployeeDirectoryOutputSchema } from "../../outputSchemas";

export const getEmployeeDirectory = action({
  display: {
    label: "List Employees",
    description: "List all employees from the directory.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get(ENDPOINTS.EMPLOYEES_DIRECTORY);
    return { data };
  },
  examplePerform: async () => getEmployeeDirectoryExamplePayload,
  inputs: getEmployeeDirectoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEmployeeDirectoryOutputSchema,
  }),
  examplePayload: getEmployeeDirectoryExamplePayload,
});
