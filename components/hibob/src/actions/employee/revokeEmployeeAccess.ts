import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { revokeEmployeeAccessExamplePayload } from "../../examplePayloads";
import { revokeEmployeeAccessInputs } from "../../inputs";

export const revokeEmployeeAccess = action({
  display: {
    label: "Revoke Employee Access",
    description: "Revokes access to HiBob for a specific employee.",
  },
  perform: async (context, { connection, identifier }) => {
    const client = getClient(connection, context.debug.enabled);

    await client.post(`/employees/${identifier}/uninvite`);
    return {
      data: {
        success: true,
        message: "Employee access revoked successfully",
      },
    };
  },
  inputs: revokeEmployeeAccessInputs,
  examplePayload: revokeEmployeeAccessExamplePayload,
});
