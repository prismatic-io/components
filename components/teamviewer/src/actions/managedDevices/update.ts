import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_CONTENT_RESPONSE } from "../../constants";
import { updateManagedDeviceInputs } from "../../inputs/managedDevices";

export const updateManagedDevice = action({
  display: {
    label: "Update Managed Device",
    description:
      "Modify the attributes of a managed device using its designated 'id.' You can provide the device's 'name' (alias) to enact changes, provide a 'teamviewerPolicyId' to update or add a TeamViewer policy, or provide a 'managedGroupId' to inherit the TeamViewer Policy from a managed group to which the device is associated.",
  },
  perform: async (
    context,
    {
      connection,
      name,
      managedGroupId,
      teamviewerPolicyId,
      managedDeviceId,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      name,
      managedGroupId,
      teamviewerPolicyId,
    };

    await client.put(`/managed/devices/${managedDeviceId}`, body);

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: updateManagedDeviceInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
