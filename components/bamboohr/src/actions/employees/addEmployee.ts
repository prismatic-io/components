import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { addEmployeeExamplePayload } from "../../examplePayloads";
import { addEmployeeInputs } from "../../inputs";
export const addEmployee = action({
  display: {
    label: "Create Employee",
    description: "Create a new employee.",
  },
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const response = await client.post("/v1/employees/", {
      firstName: params.firstName,
      lastName: params.lastName,
      ...params.employeeFieldValues,
    });
    const location =
      response.headers.location || response.headers.Location || "";
    const id = location.split("/").pop() || "";
    return { data: { id, location } };
  },
  inputs: addEmployeeInputs,
  examplePayload: addEmployeeExamplePayload,
});
