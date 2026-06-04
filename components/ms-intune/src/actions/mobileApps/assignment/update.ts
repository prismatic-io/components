import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { getMobileAppAssignmentExamplePayload as updateMobileAppAssignmentExamplePayload } from "../../../examplePayloads";
import { updateMobileAppAssignmentInputs } from "../../../inputs/mobileApps/assignments/update";
import { getMobileAppObject } from "../../../util";

export const updateMobileAppAssignment = action({
  display: {
    label: "Update Mobile App Assignment",
    description: "Update a mobile app assignment.",
  },
  perform: async (
    context,
    {
      connection,
      mobileAppAssignmentId,
      mobileAppId,
      intent,
      settings,
      target,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = getMobileAppObject(intent, target, settings);
    const { data } = await client.patch(
      `/deviceAppManagement/mobileApps/${mobileAppId}/assignments/${mobileAppAssignmentId}`,
      body,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateMobileAppAssignmentInputs,
  },
  examplePayload: updateMobileAppAssignmentExamplePayload,
});
