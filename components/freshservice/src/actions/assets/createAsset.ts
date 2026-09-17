import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { createAssetInputs as inputs } from "../../inputs";
import { assetOutputSchema } from "../../outputSchemas";
export const createAsset = action({
  display: {
    label: "Create Asset (Deprecated)",
    description:
      "Creates a new asset in Freshservice. Applies to Freshservice accounts created before the March 31, 2026 IT Asset Management release.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      name,
      assetTypeId,
      additionalFields,
      locationId,
      agentId,
      departmentId,
      groupId,
      workspaceId,
      assetsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = {
      name,
      asset_type_id: assetTypeId,
      asset_tag: additionalFields.assetTag,
      impact: additionalFields.impact,
      usage_type: additionalFields.usageType,
      description: additionalFields.description,
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assetOutputSchema,
  }),
  inputs,
  examplePayload,
});
