import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { moveAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { moveAssetInputs as inputs } from "../../inputs/assets";

export const moveAsset = action({
  display: {
    label: "Move Asset",
    description: "Moves an asset to a different workspace.",
  },
  perform: async (
    context,
    { connection, assetDisplayId, workspaceId, groupId, agentId },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

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
  inputs,
  examplePayload,
});
