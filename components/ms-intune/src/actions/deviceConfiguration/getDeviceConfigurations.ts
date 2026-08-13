import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getDeviceConfigurationExamplePayload } from "../../examplePayloads";
import { getDeviceConfigurationsInputs } from "../../inputs";
export const getDeviceConfigurations = action({
  display: {
    label: "Get Device Configuration",
    description: "Get the device configurations.",
  },
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
  examplePayload: getDeviceConfigurationExamplePayload,
});
