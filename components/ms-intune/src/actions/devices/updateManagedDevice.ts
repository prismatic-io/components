import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import updateManagedDeviceInputs from "../../inputs/devices/updateManagedDeviceInputs";

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
      "@odata.type": "#microsoft.graph.managedDevice",
      managedDeviceName,
      notes,
      ...(extraFields || {}),
    };
    const { data } = await client.patch(
      `/deviceManagement/managedDevices/${managedDeviceId}`,
      payload,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateManagedDeviceInputs,
  },
  examplePayload: { data: {} },
});
