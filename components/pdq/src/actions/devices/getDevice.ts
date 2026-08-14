import { action, outputSchema } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { DEVICES_ENDPOINT } from "../../constants";
import { getDeviceExamplePayload } from "../../examplePayloads/devices";
import { getDeviceInputs } from "../../inputs";
import { getDeviceOutputSchema } from "../../outputSchemas";
export const getDevice = action({
  display: {
    label: "Get Device",
    description: "Retrieve a device by ID.",
  },
  inputs: getDeviceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDeviceOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, deviceId }) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const { data } = await client.get(`${DEVICES_ENDPOINT}/${deviceId}`);
    return {
      data,
    };
  },
  examplePayload: getDeviceExamplePayload,
});
