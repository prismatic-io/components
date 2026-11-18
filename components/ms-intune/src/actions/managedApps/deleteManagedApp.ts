import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteManagedAppExamplePayload } from "../../examplePayloads";
import { deleteManagedAppInputs } from "../../inputs";
import { deleteManagedAppOutputSchema } from "../../outputSchemas";

export const deleteManagedApp = action({
  display: {
    label: "Delete Managed App",
    description: "Deletes an App.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteManagedAppOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, mobileAppId }) => {
    const client = createClient(connection, context.debug.enabled, true);
    await client.delete(`${ENDPOINTS.MOBILE_APPS}/${mobileAppId}`);
    return {
      data: {
        success: true,
        id: mobileAppId,
        message: "Managed app deleted successfully.",
      },
    };
  },
  examplePerform: async () => deleteManagedAppExamplePayload,
  inputs: deleteManagedAppInputs,
  examplePayload: deleteManagedAppExamplePayload,
});
