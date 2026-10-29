import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDeviceInputs } from "../../inputs/devices";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const deleteDevice = action({
  display: {
    label: "Delete Device",
    description: "Deletes a device by its ID.",
  },
  perform: async (context, { connection, deviceId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/devices/${deviceId}`);

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: deleteDeviceInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
