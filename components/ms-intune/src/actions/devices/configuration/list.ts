import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { listDeviceConfigurationsExamplePayload } from "../../../examplePayloads";

export const listDeviceConfigurations = action({
  display: {
    label: "List Device Configurations",
    description: "List all device configurations.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/deviceManagement/deviceConfigurations");

    return {
      data,
    };
  },
  inputs: {
    connection,
  },
  examplePayload: listDeviceConfigurationsExamplePayload,
});
