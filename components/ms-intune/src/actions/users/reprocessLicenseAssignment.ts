import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { reprocessLicenseAssignmentExamplePayload } from "../../examplePayloads";
import { reprocessLicenseAssignmentInputs } from "../../inputs/users/reprocessLicenseAssignment";

export const reprocessUserLicenseAssignment = action({
  display: {
    label: "Reprocess User License Assignment",
    description: "Reprocess all group-based license assignments for the user.",
  },
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/users/${userId}/reprocessLicenseAssignment`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...reprocessLicenseAssignmentInputs,
  },
  examplePayload: reprocessLicenseAssignmentExamplePayload,
});
