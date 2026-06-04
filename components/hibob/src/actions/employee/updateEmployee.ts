import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { updateEmployeeExamplePayload } from "../../examplePayloads";
import { updateEmployeeInputs } from "../../inputs";

export const updateEmployee = action({
  display: {
    label: "Update Employee",
    description:
      "Updates employee data for a specific employee by ID or email.",
  },
  perform: async (context, { connection, identifier, fields }) => {
    const client = getClient(connection, context.debug.enabled);

    await client.put(`/people/${identifier}`, fields);
    return {
      data: {
        success: true,
        message: "Employee updated successfully",
      },
    };
  },
  inputs: updateEmployeeInputs,
  examplePayload: updateEmployeeExamplePayload,
});
