import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getMobileAppAssignmentExamplePayload } from "../../examplePayloads";
import { getMobileAppAssignmentInputs } from "../../inputs";
import { getMobileAppAssignmentOutputSchema } from "../../outputSchemas";

export const getMobileAppAssignment = action({
  display: {
    label: "Get Mobile App Assignment",
    description: "Retrieve a single mobile app assignment.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getMobileAppAssignmentOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, mobileAppAssignmentId, mobileAppId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assignments/${mobileAppAssignmentId}`,
    );

    return {
      data,
    };
  },
  inputs: getMobileAppAssignmentInputs,
  examplePayload: getMobileAppAssignmentExamplePayload,
});
