import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { moveProblemExamplePayload as examplePayload } from "../../examplePayloads";
import { moveProblemInputs as inputs } from "../../inputs/problems";

export const moveProblem = action({
  display: {
    label: "Move Problem",
    description: "Moves a problem to a different workspace.",
  },
  perform: async (
    context,
    { connection, problemId, workspaceId, groupId, ownerId },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const payload = {
      workspace_id: workspaceId,
      group_id: groupId,
      owner_id: ownerId,
    };

    const { data } = await client.put(
      `/problems/${problemId}/move_workspace`,
      payload,
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
