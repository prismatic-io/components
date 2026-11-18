import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteMobileAppAssignmentExamplePayload } from "../../examplePayloads";
import { deleteMobileAppAssignmentInputs } from "../../inputs";
import { deleteMobileAppAssignmentOutputSchema } from "../../outputSchemas";

export const deleteMobileAppAssignment = action({
  display: {
    label: "Delete Mobile App Assignment",
    description: "Delete a single mobile app assignment.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteMobileAppAssignmentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, mobileAppAssignmentId, mobileAppId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assignments/${mobileAppAssignmentId}`,
    );

    return {
      data: {
        success: true,
        id: mobileAppAssignmentId,
        message: "Mobile app assignment deleted successfully.",
      },
    };
  },
  examplePerform: async () => deleteMobileAppAssignmentExamplePayload,
  inputs: deleteMobileAppAssignmentInputs,
  examplePayload: deleteMobileAppAssignmentExamplePayload,
});
