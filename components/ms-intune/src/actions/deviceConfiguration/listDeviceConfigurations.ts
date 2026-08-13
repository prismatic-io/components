import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listDeviceConfigurationsExamplePayload } from "../../examplePayloads";
import { listDeviceConfigurationsInputs } from "../../inputs";
export const listDeviceConfigurations = action({
  display: {
    label: "List Device Configurations",
    description: "List all device configurations.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(ENDPOINTS.DEVICE_CONFIGURATIONS);
    return {
      data,
    };
  },
  inputs: listDeviceConfigurationsInputs,
  examplePayload: listDeviceConfigurationsExamplePayload,
});
