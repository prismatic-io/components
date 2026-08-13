import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, ODATA_TYPES } from "../../constants";
import { updateManagedDeviceExamplePayload } from "../../examplePayloads";
import { updateManagedDeviceInputs } from "../../inputs";
export const updateManagedDevice = action({
  display: {
    label: "Update Managed Device",
    description: "Update the properties of a Managed Device object.",
  },
  perform: async (
    context,
    { connection, managedDeviceId, notes, managedDeviceName, extraFields },
  ) => {
    const client = createClient(connection, context.debug.enabled, true);
    const payload = {
      "@odata.type": ODATA_TYPES.MANAGED_DEVICE,
      managedDeviceName,
      notes,
      ...(extraFields || {}),
    };
    const { data } = await client.patch(
      `${ENDPOINTS.MANAGED_DEVICES}/${managedDeviceId}`,
      payload,
    );
    return {
      data,
    };
  },
  inputs: updateManagedDeviceInputs,
  examplePayload: updateManagedDeviceExamplePayload,
});
