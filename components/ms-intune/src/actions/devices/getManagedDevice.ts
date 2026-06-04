import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import getManagedDeviceInputs from "../../inputs/devices/getManagedDeviceInputs";
import { getManagedDeviceExamplePayload } from "../../examplePayloads";

export const getManagedDevice = action({
  display: {
    label: "Get Managed Device",
    description:
      "Read properties and relationships of the Managed Device object.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/deviceManagement/managedDevices/${managedDeviceId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getManagedDeviceInputs,
  },
  examplePayload: getManagedDeviceExamplePayload,
});
