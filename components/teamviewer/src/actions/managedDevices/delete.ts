import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteManagedDeviceInputs } from "../../inputs/managedDevices";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const deleteManagedDevice = action({
  display: {
    label: "Delete Managed Device",
    description: "Deletes a managed device by its ID.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/managed/devices/${managedDeviceId}`);

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: deleteManagedDeviceInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
