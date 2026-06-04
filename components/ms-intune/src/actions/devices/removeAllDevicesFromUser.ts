import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import removeAllDevicesFromUserInputs from "../../inputs/devices/removeAllDevicesFromUserInputs";




export const removeAllDevicesFromUser = action({
  display: {
    label: "Remove All Devices From User",
    description: "Retire all devices from management for this user.",
  },
  perform: async (
    context,
    { connection, detectedAppId, managedDeviceId, userId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/deviceManagement/detectedApps/${detectedAppId}/managedDevices/${managedDeviceId}/users/${userId}/removeAllDevicesFromManagement`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...removeAllDevicesFromUserInputs,
  },
  examplePayload: { data: {} },
});
