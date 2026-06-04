import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { updateAssetInputs as inputs } from "../../inputs/assets";

export const updateAsset = action({
  display: {
    label: "Update Asset",
    description: "Updates an existing asset.",
  },
  perform: async (
    context,
    {
      connection,
      assetDisplayId,
      name,
      assetTypeId,
      assetTag,
      impact,
      usageType,
      description,
      locationId,
      agentId,
      departmentId,
      groupId,
      assetsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const payload = {
      name,
      asset_type_id: assetTypeId,
      asset_tag: assetTag,
      impact,
      usage_type: usageType,
      description,
      location_id: locationId,
      agent_id: agentId,
      department_id: departmentId,
      group_id: groupId,
      ...assetsAdditionalFields,
    };

    const { data } = await client.put(`/assets/${assetDisplayId}`, payload);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
