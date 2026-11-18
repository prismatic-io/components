import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listDeviceConfigurationsExamplePayload } from "../../examplePayloads";
import { listDeviceConfigurationsInputs } from "../../inputs";
import { listDeviceConfigurationsOutputSchema } from "../../outputSchemas";

export const listDeviceConfigurations = action({
  display: {
    label: "List Device Configurations",
    description: "List all device configurations.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDeviceConfigurationsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(ENDPOINTS.DEVICE_CONFIGURATIONS);

    return {
      data,
    };
  },
  examplePerform: async () => listDeviceConfigurationsExamplePayload,
  inputs: listDeviceConfigurationsInputs,
  examplePayload: listDeviceConfigurationsExamplePayload,
});
