import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getManagedDeviceExamplePayload } from "../../examplePayloads";
import { getManagedDeviceInputs } from "../../inputs";
import { getManagedDeviceOutputSchema } from "../../outputSchemas";

export const getManagedDevice = action({
  display: {
    label: "Get Managed Device",
    description:
      "Read properties and relationships of the Managed Device object.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getManagedDeviceOutputSchema,
  }),
  performSafety: "safe",
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
