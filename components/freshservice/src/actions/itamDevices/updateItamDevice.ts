import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateItamDeviceExamplePayload as examplePayload } from "../../examplePayloads";
import { updateItamDeviceInputs as inputs } from "../../inputs";
import { itamDeviceWriteOutputSchema } from "../../outputSchemas";
import { itamPath, normalizeItamWrite } from "../../util";
export const updateItamDevice = action({
  display: {
    label: "Update Device (ITAM)",
    description: "Updates an existing device by its unique identifier.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      deviceId,
      name,
      assetNo,
      type,
      physicalSubtypeId,
      inService,
      networkDevice,
      virtualHost,
      datacenter,
      customers,
      itamDevicesAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = {
      name,
      asset_no: assetNo,
      type,
      physicalsubtype_id: physicalSubtypeId,
      in_service: inService,
      network_device: networkDevice,
      virtual_host: virtualHost,
      datacenter,
      customers,
      ...itamDevicesAdditionalFields,
    };
    const { data } = await client.put(
      itamPath("devices", { op: "update", id: deviceId }),
      payload,
    );
    return { data: normalizeItamWrite(data) };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itamDeviceWriteOutputSchema,
  }),
  inputs,
  examplePayload,
});
