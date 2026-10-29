import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTerminatedEmployeeExamplePayload } from "../../examplePayloads";
import { connectionInput, employee_id } from "../../inputs";

export const getTerminatedEmployee = action({
  display: {
    label: "Get Terminated Employee",
    description: "Retrieve single terminated employee",
  },
  inputs: {
    connectionInput,
    employee_id,
  },
  perform: async (context, { connectionInput, employee_id }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/terminated-employees/${employee_id}`);
    return {
      data,
    };
  },
  examplePayload: getTerminatedEmployeeExamplePayload,
});
