import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { updateEmployeeEmailExamplePayload } from "../../examplePayloads";
import { updateEmployeeEmailInputs } from "../../inputs";

export const updateEmployeeEmail = action({
  display: {
    label: "Update Employee Email",
    description: "Updates the email address for a specific employee.",
  },
  perform: async (context, { connection, identifier, email }) => {
    const client = getClient(connection, context.debug.enabled);

    await client.put(`/people/${identifier}/email`, {
      email,
    });
    return {
      data: {
        success: true,
        message: "Employee email updated successfully",
      },
    };
  },
  inputs: updateEmployeeEmailInputs,
  examplePayload: updateEmployeeEmailExamplePayload,
});
