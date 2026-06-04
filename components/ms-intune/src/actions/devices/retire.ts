import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { retireDeviceInputs } from "../../inputs/devices/retire";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";

export const retireDevice = action({
  display: {
    label: "Retire Managed Device",
    description:
      "Retire a device from Intune management upon employee offboarding.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/deviceManagement/managedDevices/${managedDeviceId}/retire`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...retireDeviceInputs,
  },
  examplePayload: { data: NO_RESPONSE_SUCCESSFULL_PAYLOAD },
});
