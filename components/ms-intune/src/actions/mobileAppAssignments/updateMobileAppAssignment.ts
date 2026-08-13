import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getMobileAppAssignmentExamplePayload as updateMobileAppAssignmentExamplePayload } from "../../examplePayloads";
import { updateMobileAppAssignmentInputs } from "../../inputs";
import { getMobileAppObject } from "../../util";
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
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assignments/${mobileAppAssignmentId}`,
      body,
    );
    return {
      data,
    };
  },
  inputs: updateMobileAppAssignmentInputs,
  examplePayload: updateMobileAppAssignmentExamplePayload,
});
