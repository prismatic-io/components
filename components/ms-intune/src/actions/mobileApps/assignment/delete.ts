import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { deleteMobileAppAssignmentInputs } from "../../../inputs/mobileApps/assignments/delete";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../../constants";

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
      `/deviceAppManagement/mobileApps/${mobileAppId}/assignments/${mobileAppAssignmentId}`,
    );

    return {
      data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
    };
  },
  inputs: {
    connection,
    ...deleteMobileAppAssignmentInputs,
  },
  examplePayload: { data: NO_RESPONSE_SUCCESSFULL_PAYLOAD },
});
