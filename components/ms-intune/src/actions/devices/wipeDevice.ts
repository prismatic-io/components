import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { wipeDeviceExamplePayload } from "../../examplePayloads";
import { wipeDeviceInputs } from "../../inputs";
export const wipeDevice = action({
  display: {
    label: "Wipe Device",
    description: "Remotely wipe a compromised or lost device.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${ENDPOINTS.MANAGED_DEVICES}/${managedDeviceId}/wipe`,
    );
    return {
      data,
    };
  },
  inputs: wipeDeviceInputs,
  examplePayload: wipeDeviceExamplePayload,
});
