import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { addGuestToTaskExamplePayload } from "../../examplePayloads";
import { addGuestToTaskInputs } from "../../inputs";
import { addGuestToTaskOutputSchema } from "../../outputSchemas";
import type {
  AddGuestToTaskBody,
  AddGuestToTaskQueryParams,
} from "../../types";
export const addGuestToTask = action({
  display: {
    label: "Add Guest to Task",
    description: "Share a task with a guest.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addGuestToTaskOutputSchema,
  }),
  examplePayload: addGuestToTaskExamplePayload,
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
      permissionLevel,
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const body: AddGuestToTaskBody = {
      permission_level: permissionLevel,
    };
    const params: AddGuestToTaskQueryParams = {
      include_shared: includeShared,
      custom_task_ids: customTaskIds,
      team_id: teamId,
    };
    const { data } = await client.post(
      `/task/${taskId}/guest/${guestId}`,
      body,
      { params },
    );
    return {
      data,
    };
  },
  examplePerform: async () => addGuestToTaskExamplePayload,
  inputs: addGuestToTaskInputs,
});
