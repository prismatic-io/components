import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { getDeviceExamplePayload } from "../../examplePayloads/devices";
import { getDeviceInputs } from "../../inputs/devices/get";
import { connection } from "../../inputs/general";

export const getDevice = action({
  display: {
    label: "Get Device",
    description: "Retrieve a device by ID",
  },
  inputs: {
    ...getDeviceInputs,
    connection,
  },
  perform: async (context, { connection, deviceId }) => {
    const client = createHttpClient(connection, context.debug.enabled);

    const { data } = await client.get(`/devices/${deviceId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getDeviceExamplePayload,
  },
});
