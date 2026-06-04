import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { getMobileAppAssignmentExamplePayload as createMobileAppAssignmentExamplePayload } from "../../../examplePayloads";
import { createMobileAppAssignmentInputs } from "../../../inputs/mobileApps/assignments/create";
import { getMobileAppObject } from "../../../util";

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
      `/deviceAppManagement/mobileApps/${mobileAppId}/assignments`,
      body,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...createMobileAppAssignmentInputs,
  },
  examplePayload: createMobileAppAssignmentExamplePayload,
});
