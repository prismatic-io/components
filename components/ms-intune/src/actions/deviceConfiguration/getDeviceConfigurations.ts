import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getDeviceConfigurationsExamplePayload } from "../../examplePayloads";
import { getDeviceConfigurationsInputs } from "../../inputs";
import { getDeviceConfigurationOutputSchema } from "../../outputSchemas";

export const getDeviceConfigurations = action({
  display: {
    label: "Get Device Configuration",
    description: "Retrieve a device configuration by ID.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDeviceConfigurationOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, deviceConfigurationId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.DEVICE_CONFIGURATIONS}/${deviceConfigurationId}`,
    );

    return {
      data,
    };
  },
  inputs: getDeviceConfigurationsInputs,
  examplePayload: getDeviceConfigurationsExamplePayload,
});
