import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDevicesExamplePayload } from "../../examplePayloads/devices";
import { listDevicesInputs } from "../../inputs/devices";

export const listDevices = action({
  display: {
    label: "List Devices",
    description: "Returns a list of devices.",
  },
  perform: async (context, { connection, queryParams }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/devices`, {
      params: queryParams,
    });

    return {
      data,
    };
  },
  inputs: listDevicesInputs,
  examplePayload: listDevicesExamplePayload,
});
