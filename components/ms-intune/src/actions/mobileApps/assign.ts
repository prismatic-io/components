import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import assignMobileAppInputs from "../../inputs/mobileApps/assign";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";
import { getMobileAppObject } from "../../util";

export const assignMobileApp = action({
  display: {
    label: "Assign Mobile App",
    description: "Assign a mobile app to a group.",
  },
  perform: async (
    context,
    { connection, groupId, intent, mobileAppId, settings, target },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const mobileAppAssign = getMobileAppObject(
      intent,
      target,
      settings,
      groupId,
    );
    const { data } = await client.post(
      `/deviceAppManagement/mobileApps/${mobileAppId}/assign`,
      {
        mobileAppAssignments: [mobileAppAssign],
      },
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...assignMobileAppInputs,
  },
  examplePayload: { data: NO_RESPONSE_SUCCESSFULL_PAYLOAD },
});
