import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDeviceInputs } from "../../inputs/devices";
import { createDeviceExamplePayload } from "../../examplePayloads/devices";

export const createDevice = action({
  display: {
    label: "Create Device",
    description: "Creates a new device.",
  },
  perform: async (
    context,
    {
      connection,
      alias,
      description,
      groupid,
      password,
      remotecontrol_id,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      alias,
      description,
      groupid,
      password,
      remotecontrol_id,
    };

    const { data } = await client.post(`/devices`, body);

    return {
      data,
    };
  },
  inputs: createDeviceInputs,
  examplePayload: createDeviceExamplePayload,
});
