import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { assignMobileAppExamplePayload } from "../../examplePayloads";
import { assignMobileAppInputs } from "../../inputs";
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
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assign`,
      {
        mobileAppAssignments: [mobileAppAssign],
      },
    );
    return {
      data,
    };
  },
  inputs: assignMobileAppInputs,
  examplePayload: assignMobileAppExamplePayload,
});
