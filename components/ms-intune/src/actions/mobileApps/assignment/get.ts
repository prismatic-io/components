import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { getMobileAppAssignmentExamplePayload } from "../../../examplePayloads";
import { getMobileAppAssignmentInputs } from "../../../inputs/mobileApps/assignments/get";

export const getMobileAppAssignment = action({
  display: {
    label: "Get Mobile App Assignment",
    description: "Retrieve a single mobile app assignment.",
  },
  perform: async (
    context,
    { connection, mobileAppAssignmentId, mobileAppId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/deviceAppManagement/mobileApps/${mobileAppId}/assignments/${mobileAppAssignmentId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getMobileAppAssignmentInputs,
  },
  examplePayload: getMobileAppAssignmentExamplePayload,
});
