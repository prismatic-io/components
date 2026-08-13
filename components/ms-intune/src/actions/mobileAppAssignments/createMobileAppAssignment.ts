import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getMobileAppAssignmentExamplePayload as createMobileAppAssignmentExamplePayload } from "../../examplePayloads";
import { createMobileAppAssignmentInputs } from "../../inputs";
import { getMobileAppObject } from "../../util";
export const createMobileAppAssignment = action({
  display: {
    label: "Create Mobile App Assignment",
    description: "Create a mobile app assignment.",
  },
  perform: async (
    context,
    { connection, mobileAppId, intent, settings, target },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = getMobileAppObject(intent, target, settings);
    const { data } = await client.post(
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assignments`,
      body,
    );
    return {
      data,
    };
  },
  inputs: createMobileAppAssignmentInputs,
  examplePayload: createMobileAppAssignmentExamplePayload,
});
