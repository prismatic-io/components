import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeGuestFromTaskExamplePayload } from "../../examplePayloads";
import { removeGuestFromTaskInputs } from "../../inputs";
import { removeGuestFromTaskOutputSchema } from "../../outputSchemas";
import type { AddGuestToTaskQueryParams } from "../../types";
export const removeGuestFromTask = action({
  display: {
    label: "Remove Guest from Task",
    description: "Revoke a guest's access to a task.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeGuestFromTaskOutputSchema,
  }),
  examplePayload: removeGuestFromTaskExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      clickUpConnection,
      taskId,
      guestId,
      includeShared,
      customTaskIds,
      teamId,
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const params: AddGuestToTaskQueryParams = {
      include_shared: includeShared,
      custom_task_ids: customTaskIds,
      team_id: teamId,
    };
    const { data } = await client.delete(`/task/${taskId}/guest/${guestId}`, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async () => removeGuestFromTaskExamplePayload,
  inputs: removeGuestFromTaskInputs,
});
