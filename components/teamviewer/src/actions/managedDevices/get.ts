import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getManagedDeviceInputs } from "../../inputs/managedDevices";
import { getManagedDeviceExamplePayload } from "../../examplePayloads/managedDevices";

export const getManagedDevice = action({
  display: {
    label: "Get Managed Device",
    description: "Returns a managed device by its ID.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/managed/devices/${managedDeviceId}`);

    return {
      data,
    };
  },
  inputs: getManagedDeviceInputs,
  examplePayload: getManagedDeviceExamplePayload,
});
