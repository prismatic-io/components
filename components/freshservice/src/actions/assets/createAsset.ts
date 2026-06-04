import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { createAssetInputs as inputs } from "../../inputs/assets";

export const createAsset = action({
  display: {
    label: "Create Asset",
    description: "Creates a new asset in Freshservice.",
  },
  perform: async (
    context,
    {
      connection,
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
      workspaceId,
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
      workspace_id: workspaceId,
      ...assetsAdditionalFields,
    };

    const { data } = await client.post(`/assets`, payload);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
