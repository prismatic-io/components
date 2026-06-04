import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { wipeDeviceInputs } from "../../inputs/devices/wipe";
import { wipeDeviceExamplePayload } from "../../examplePayloads";

export const wipeDevice = action({
  display: {
    label: "Wipe Device",
    description: "Remotely wipe a compromised or lost device.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/deviceManagement/managedDevices/${managedDeviceId}/wipe`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...wipeDeviceInputs,
  },
  examplePayload: wipeDeviceExamplePayload,
});
