import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteManagedDeviceExamplePayload } from "../../examplePayloads";
import { deleteManagedDeviceInputs } from "../../inputs";
import { deleteManagedDeviceOutputSchema } from "../../outputSchemas";

export const deleteManagedDevice = action({
  display: {
    label: "Delete Managed Device",
    description: "Deletes a Managed Device.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteManagedDeviceOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`${ENDPOINTS.MANAGED_DEVICES}/${managedDeviceId}`);
    return {
      data: {
        success: true,
        id: managedDeviceId,
        message: "Managed device deleted successfully.",
      },
    };
  },
  examplePerform: async () => deleteManagedDeviceExamplePayload,
  inputs: deleteManagedDeviceInputs,
  examplePayload: deleteManagedDeviceExamplePayload,
});
