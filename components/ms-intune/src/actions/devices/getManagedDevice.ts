import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getManagedDeviceExamplePayload } from "../../examplePayloads";
import { getManagedDeviceInputs } from "../../inputs";
export const getManagedDevice = action({
  display: {
    label: "Get Managed Device",
    description:
      "Read properties and relationships of the Managed Device object.",
  },
  perform: async (context, { connection, managedDeviceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.MANAGED_DEVICES}/${managedDeviceId}`,
    );
    return {
      data,
    };
  },
  inputs: getManagedDeviceInputs,
  examplePayload: getManagedDeviceExamplePayload,
});
