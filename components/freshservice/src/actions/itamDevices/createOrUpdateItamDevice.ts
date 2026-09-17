import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createOrUpdateItamDeviceExamplePayload as examplePayload } from "../../examplePayloads";
import { createOrUpdateItamDeviceInputs as inputs } from "../../inputs";
import { itamDeviceWriteOutputSchema } from "../../outputSchemas";
import { itamPath, normalizeItamWrite } from "../../util";
export const createOrUpdateItamDevice = action({
  display: {
    label: "Create or Update Device (ITAM)",
    description:
      "Creates a device, or updates the existing device that matches the supplied identifier.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      name,
      deviceId,
      serialNo,
      uuid,
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
    if (!name && !deviceId && !serialNo && !uuid) {
      throw new Error(
        "Supply Name to create a device, or one of Device ID, Serial Number or UUID to update an existing one.",
      );
    }
    const payload = {
      name,
      device_id: deviceId,
      serial_no: serialNo,
      uuid,
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
    const { data } = await client.post(
      itamPath("devices", { op: "create" }),
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
