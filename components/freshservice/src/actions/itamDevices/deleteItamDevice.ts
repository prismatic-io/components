import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteItamDeviceExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteItamDeviceInputs as inputs } from "../../inputs";
import { successOutputSchema } from "../../outputSchemas";
import { itamPath } from "../../util";
export const deleteItamDevice = action({
  display: {
    label: "Delete Device (ITAM)",
    description: "Deletes a device by its unique identifier.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, deviceId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    await client.delete(itamPath("devices", { op: "delete", id: deviceId }));
    return SUCCESS_RESPONSE;
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: successOutputSchema,
  }),
  inputs,
  examplePayload,
});
