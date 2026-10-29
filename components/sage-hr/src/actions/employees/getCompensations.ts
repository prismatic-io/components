import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getEmployeeCompensationsExamplePayload } from "../../examplePayloads";
import { connectionInput, employee_id } from "../../inputs";

export const getEmployeeCompensations = action({
  display: {
    label: "Get Employee Compensations",
    description: "Retrieve single employee's compensation details",
  },
  inputs: {
    connectionInput,
    employee_id,
  },
  perform: async (context, { connectionInput, employee_id }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/employees/${employee_id}/compensations`,
    );
    return {
      data,
    };
  },
  examplePayload: getEmployeeCompensationsExamplePayload,
});
