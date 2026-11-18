import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, NO_RESPONSE_SUCCESSFUL_PAYLOAD } from "../../constants";
import { retireDeviceExamplePayload } from "../../examplePayloads";
import { retireDeviceInputs } from "../../inputs";
import { retireDeviceOutputSchema } from "../../outputSchemas";

export const retireDevice = action({
  display: {
    label: "Retire Managed Device",
    description:
      "Retire a device from Intune management upon employee offboarding.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: retireDeviceOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.post(`${ENDPOINTS.MANAGED_DEVICES}/${managedDeviceId}/retire`);
    return {
      data: NO_RESPONSE_SUCCESSFUL_PAYLOAD,
    };
  },
  examplePerform: async () => retireDeviceExamplePayload,
  inputs: retireDeviceInputs,
  examplePayload: retireDeviceExamplePayload,
});
