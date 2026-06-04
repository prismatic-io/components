import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDeviceInputs } from "../../inputs/devices";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const updateDevice = action({
  display: {
    label: "Update Device",
    description: "Updates a device by its ID.",
  },
  perform: async (
    context,
    {
      connection,
      alias,
      description,
      groupid,
      password,
      remotecontrol_id,
      deviceId,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      alias,
      description,
      groupid,
      password,
      remotecontrol_id,
    };

    await client.put(`/devices/${deviceId}`, body);

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: updateDeviceInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
