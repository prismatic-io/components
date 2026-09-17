import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { updateAssetInputs as inputs } from "../../inputs";
import { assetOutputSchema } from "../../outputSchemas";
export const updateAsset = action({
  display: {
    label: "Update Asset (Deprecated)",
    description:
      "Updates an existing asset. Applies to Freshservice accounts created before the March 31, 2026 IT Asset Management release.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      assetDisplayId,
      assetTypeId,
      locationId,
      agentId,
      departmentId,
      groupId,
      additionalFields,
      assetsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = {
      name: additionalFields.name,
      asset_type_id: assetTypeId,
      asset_tag: additionalFields.assetTag,
      impact: additionalFields.impact,
      usage_type: additionalFields.usageType,
      description: additionalFields.description,
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assetOutputSchema,
  }),
  inputs,
  examplePayload,
});
