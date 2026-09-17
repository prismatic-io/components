import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createOrUpdateItamAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { createOrUpdateItamAssetInputs as inputs } from "../../inputs";
import { itamAssetWriteOutputSchema } from "../../outputSchemas";
import { itamPath, normalizeItamWrite } from "../../util";
export const createOrUpdateItamAsset = action({
  display: {
    label: "Create or Update Asset (ITAM)",
    description:
      "Creates an asset, or updates the existing asset that matches the supplied name.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      type,
      name,
      serialNo,
      assetNo,
      serviceLevel,
      inService,
      deviceName,
      backConnectionType,
      vendor,
      objectCategory,
      tags,
      notes,
      rackPlacement,
      itamAssetsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    if (
      (rackPlacement.rack || rackPlacement.rackId) &&
      (!rackPlacement.startAt || !rackPlacement.size)
    ) {
      throw new Error(
        "Start At and Size are both required when placing an asset in a rack.",
      );
    }
    const payload = {
      type,
      name,
      serial_no: serialNo,
      asset_no: assetNo,
      service_level: serviceLevel,
      in_service: inService,
      device_name: deviceName,
      back_connection_type: backConnectionType,
      vendor,
      object_category: objectCategory,
      tags,
      notes,
      rack: rackPlacement.rack,
      rack_id: rackPlacement.rackId,
      start_at: rackPlacement.startAt,
      size: rackPlacement.size,
      orientation: rackPlacement.orientation,
      where: rackPlacement.where,
      x_pos: rackPlacement.xPos,
      depth: rackPlacement.depth,
      ...itamAssetsAdditionalFields,
    };
    const { data } = await client.post(
      itamPath("assets", { op: "create" }),
      payload,
    );
    return { data: normalizeItamWrite(data) };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itamAssetWriteOutputSchema,
  }),
  inputs,
  examplePayload,
});
