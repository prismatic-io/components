import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeGuestFromTaskExamplePayload } from "../../examplePayloads";
import { connectionInput, getCustomTaskIds, getGuestId, getIncludeShared, getTaskId, getTeamId } from "../../inputs";
import type { AddGuestToTaskQueryParams } from "./types/AddGuestToTaskQueryParams";

const teamId = getTeamId(false, "Only used when the custom_task_ids parameter is set to true");
const taskId = getTaskId(true, "Task ID");
const guestId = getGuestId(true, "Guest ID");
const includeShared = getIncludeShared(
  false,
  "Exclude details of items shared with the guest by setting this parameter to false",
  true
);
const customTaskIds = getCustomTaskIds(
  false,
  "If you want to reference a task by its Custom Task ID, this value must be true.",
  true
);

export const removeGuestFromTask = action({
  display: {
    label: "Remove Guest from Task",
    description: "Revoke a guest's access to a task.",
  },
  examplePayload: removeGuestFromTaskExamplePayload,
  perform: async (context, { clickUpConnection, taskId, guestId, includeShared, customTaskIds, teamId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

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
  inputs: {
    clickUpConnection: connectionInput,
    taskId,
    guestId,
    includeShared,
    customTaskIds,
    teamId,
  },
});
