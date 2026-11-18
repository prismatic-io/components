import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { reprocessUserLicenseAssignmentExamplePayload } from "../../examplePayloads";
import { reprocessUserLicenseAssignmentInputs } from "../../inputs";
import { reprocessUserLicenseAssignmentOutputSchema } from "../../outputSchemas";

export const reprocessUserLicenseAssignment = action({
  display: {
    label: "Reprocess User License Assignment",
    description: "Reprocess all group-based license assignments for the user.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: reprocessUserLicenseAssignmentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${ENDPOINTS.USERS}/${userId}/reprocessLicenseAssignment`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => reprocessUserLicenseAssignmentExamplePayload,
  inputs: reprocessUserLicenseAssignmentInputs,
  examplePayload: reprocessUserLicenseAssignmentExamplePayload,
});
