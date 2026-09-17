import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getItamDeviceExamplePayload as examplePayload } from "../../examplePayloads";
import { getItamDeviceInputs as inputs } from "../../inputs";
import { itamDeviceOutputSchema } from "../../outputSchemas";
import { itamPath } from "../../util";
export const getItamDevice = action({
  display: {
    label: "Get Device (ITAM)",
    description: "Retrieves details of a device by its unique identifier.",
  },
  performSafety: "safe",
  perform: async (context, { connection, deviceId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(
      itamPath("devices", { op: "read", id: deviceId }),
    );
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itamDeviceOutputSchema,
  }),
  inputs,
  examplePayload,
});
