import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { moveAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { moveAssetInputs as inputs } from "../../inputs";
import { moveAssetOutputSchema } from "../../outputSchemas";
export const moveAsset = action({
  display: {
    label: "Move Asset (Deprecated)",
    description:
      "Moves an asset to a different workspace. Applies to Freshservice accounts created before the March 31, 2026 IT Asset Management release.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, assetDisplayId, workspaceId, groupId, agentId },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = {
      workspace_id: workspaceId,
      group_id: groupId,
      agent_id: agentId,
    };
    const { data } = await client.put(
      `/assets/${assetDisplayId}/move_workspace`,
      payload,
    );
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: moveAssetOutputSchema,
  }),
  inputs,
  examplePayload,
});
