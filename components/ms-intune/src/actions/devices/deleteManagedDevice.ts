import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import deleteManagedDeviceInputs from "../../inputs/devices/deleteManagedDeviceInputs";

export const deleteManagedDevice = action({
  display: {
    label: "Delete Managed Device",
    description: "Deletes a Managed Device.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/deviceManagement/managedDevices/${managedDeviceId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...deleteManagedDeviceInputs,
  },
  examplePayload: { data: {} },
});
