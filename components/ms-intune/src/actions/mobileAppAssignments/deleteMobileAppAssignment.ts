import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";
import { deleteMobileAppAssignmentExamplePayload } from "../../examplePayloads";
import { deleteMobileAppAssignmentInputs } from "../../inputs";
export const deleteMobileAppAssignment = action({
  display: {
    label: "Delete Mobile App Assignment",
    description: "Delete a single mobile app assignment.",
  },
  perform: async (
    context,
    { connection, mobileAppAssignmentId, mobileAppId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assignments/${mobileAppAssignmentId}`,
    );
    return {
      data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
    };
  },
  inputs: deleteMobileAppAssignmentInputs,
  examplePayload: deleteMobileAppAssignmentExamplePayload,
});
