import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { reprocessLicenseAssignmentExamplePayload } from "../../examplePayloads";
import { reprocessLicenseAssignmentInputs } from "../../inputs";
export const reprocessUserLicenseAssignment = action({
  display: {
    label: "Reprocess User License Assignment",
    description: "Reprocess all group-based license assignments for the user.",
  },
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${ENDPOINTS.USERS}/${userId}/reprocessLicenseAssignment`,
    );
    return {
      data,
    };
  },
  inputs: reprocessLicenseAssignmentInputs,
  examplePayload: reprocessLicenseAssignmentExamplePayload,
});
