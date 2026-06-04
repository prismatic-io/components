import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { getDeviceConfigurationExamplePayload } from "../../../examplePayloads";
import { deviceConfigurationId } from "../../../inputs/devices/configuration/general";

export const getDeviceConfigurations = action({
  display: {
    label: "Get Device Configuration",
    description: "Get the device configurations.",
  },
  perform: async (context, { connection, deviceConfigurationId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/deviceManagement/deviceConfigurations/${deviceConfigurationId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    deviceConfigurationId,
  },
  examplePayload: getDeviceConfigurationExamplePayload,
});
