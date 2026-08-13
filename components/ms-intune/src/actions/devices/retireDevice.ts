import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { retireDeviceExamplePayload } from "../../examplePayloads";
import { retireDeviceInputs } from "../../inputs";
export const retireDevice = action({
  display: {
    label: "Retire Managed Device",
    description:
      "Retire a device from Intune management upon employee offboarding.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${ENDPOINTS.MANAGED_DEVICES}/${managedDeviceId}/retire`,
    );
    return {
      data,
    };
  },
  inputs: retireDeviceInputs,
  examplePayload: retireDeviceExamplePayload,
});
