import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { removeAllDevicesFromUserExamplePayload } from "../../examplePayloads";
import { removeAllDevicesFromUserInputs } from "../../inputs";
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
      `${ENDPOINTS.DETECTED_APPS}/${detectedAppId}/managedDevices/${managedDeviceId}/users/${userId}/removeAllDevicesFromManagement`,
    );
    return {
      data,
    };
  },
  inputs: removeAllDevicesFromUserInputs,
  examplePayload: removeAllDevicesFromUserExamplePayload,
});
