import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { assignDeviceInputs } from "../../inputs/devices";
import { createDeviceExamplePayload } from "../../examplePayloads/devices";

export const assignDevice = action({
  display: {
    label: "Assign Device",
    description: "Assigns a device to a user account.",
  },
  perform: async (
    context,
    {
      connection,
      assign_mode,
      current_device_password,
      enable_easy_access,
      device_id,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      assign_mode,
      current_device_password,
      device_id,
      enable_easy_access,
    };

    const { data } = await client.post(`/devices/assign`, body);

    return {
      data,
    };
  },
  inputs: assignDeviceInputs,
  examplePayload: createDeviceExamplePayload,
});
