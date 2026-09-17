import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateItamAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { updateItamAssetInputs as inputs } from "../../inputs";
import { itamAssetWriteOutputSchema } from "../../outputSchemas";
import { itamPath, normalizeItamWrite } from "../../util";
export const updateItamAsset = action({
  display: {
    label: "Update Asset (ITAM)",
    description: "Updates an existing asset by its unique identifier.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      assetId,
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
    const { data } = await client.put(
      itamPath("assets", { op: "update", id: assetId }),
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
