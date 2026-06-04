import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { updateEmployeeExamplePayload } from "../../examplePayloads";
import { updateEmployeeInputs } from "../../inputs";


export const updateEmployee = action({
  display: {
    label: "Update Employee",
    description: "Update an existing employee.",
  },
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.post(
      `/v1/employees/${params.employeeId}/`,
      params.employeeFieldValues,
    );
    return { data };
  },
  inputs: updateEmployeeInputs,
  examplePayload: updateEmployeeExamplePayload,
});
