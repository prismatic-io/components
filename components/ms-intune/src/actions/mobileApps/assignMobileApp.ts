import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, NO_RESPONSE_SUCCESSFUL_PAYLOAD } from "../../constants";
import { assignMobileAppExamplePayload } from "../../examplePayloads";
import { assignMobileAppInputs } from "../../inputs";
import { assignMobileAppOutputSchema } from "../../outputSchemas";
import { getMobileAppObject } from "../../util";

export const assignMobileApp = action({
  display: {
    label: "Assign Mobile App",
    description: "Assign a mobile app to a group.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assignMobileAppOutputSchema,
  }),
  performSafety: "notAllowed",
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
    await client.post(`${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assign`, {
      mobileAppAssignments: [mobileAppAssign],
    });
    return {
      data: NO_RESPONSE_SUCCESSFUL_PAYLOAD,
    };
  },
  examplePerform: async () => assignMobileAppExamplePayload,
  inputs: assignMobileAppInputs,
  examplePayload: assignMobileAppExamplePayload,
});
