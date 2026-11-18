import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, NO_RESPONSE_SUCCESSFUL_PAYLOAD } from "../../constants";
import { wipeDeviceExamplePayload } from "../../examplePayloads";
import { wipeDeviceInputs } from "../../inputs";
import { wipeDeviceOutputSchema } from "../../outputSchemas";

export const wipeDevice = action({
  display: {
    label: "Wipe Device",
    description: "Remotely wipe a compromised or lost device.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: wipeDeviceOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.post(`${ENDPOINTS.MANAGED_DEVICES}/${managedDeviceId}/wipe`);
    return {
      data: NO_RESPONSE_SUCCESSFUL_PAYLOAD,
    };
  },
  examplePerform: async () => wipeDeviceExamplePayload,
  inputs: wipeDeviceInputs,
  examplePayload: wipeDeviceExamplePayload,
});
