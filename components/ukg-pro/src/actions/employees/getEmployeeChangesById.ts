import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getEmployeeChangesByIdExamplePayload } from "../../examplePayloads";
import { getEmployeeChangesByIdInputs } from "../../inputs";







export const getEmployeeChangesById = action({
  display: {
    label: "Get Employee Changes by ID",
    description: "Retrieve change history for a specific employee.",
  },
  inputs: getEmployeeChangesByIdInputs,
  perform: async (context, { connection, employeeId }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await client.get(`/personnel/v1/employee-changes/${employeeId}`);

    return { data };
  },
  examplePayload: getEmployeeChangesByIdExamplePayload,
});
