import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { moveProblemExamplePayload as examplePayload } from "../../examplePayloads";
import { moveProblemInputs as inputs } from "../../inputs";
import { problemOutputSchema } from "../../outputSchemas";
export const moveProblem = action({
  display: {
    label: "Move Problem",
    description: "Moves a problem to a different workspace.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, problemId, workspaceId, groupId, ownerId },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: problemOutputSchema,
  }),
  inputs,
  examplePayload,
});
