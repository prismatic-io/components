import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDeviceInputs } from "../../inputs/devices";
import { getDeviceExamplePayload } from "../../examplePayloads/devices";

export const getDevice = action({
  display: {
    label: "Get Device",
    description: "Returns a device by its ID.",
  },
  perform: async (context, { connection, deviceId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/devices/${deviceId}`);

    return {
      data,
    };
  },
  inputs: getDeviceInputs,
  examplePayload: getDeviceExamplePayload,
});
