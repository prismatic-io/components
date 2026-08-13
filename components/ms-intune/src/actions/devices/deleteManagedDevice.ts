import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteManagedDeviceExamplePayload } from "../../examplePayloads";
import { deleteManagedDeviceInputs } from "../../inputs";
export const deleteManagedDevice = action({
  display: {
    label: "Delete Managed Device",
    description: "Deletes a Managed Device.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `${ENDPOINTS.MANAGED_DEVICES}/${managedDeviceId}`,
    );
    return {
      data,
    };
  },
  inputs: deleteManagedDeviceInputs,
  examplePayload: deleteManagedDeviceExamplePayload,
});
