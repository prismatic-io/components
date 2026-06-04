import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { getEmployeeExamplePayload } from "../../examplePayloads";
import { getEmployeeInputs } from "../../inputs";
import { employeeFields } from "../../util";


export const getEmployee = action({
  display: {
    label: "Get Employee",
    description: "Retrieve an employee by ID.",
  },
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/v1/employees/${params.employeeId}/?fields=${employeeFields.join(",")}`,
    );
    return { data };
  },
  inputs: getEmployeeInputs,
  examplePayload: getEmployeeExamplePayload,
});
