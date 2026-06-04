import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { addGuestToTaskExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  getCustomTaskIds,
  getGuestId,
  getIncludeShared,
  getPermissionLevel,
  getTaskId,
  getTeamId,
} from "../../inputs";
import type { AddGuestToTaskBody } from "./types/AddGuestToTaskBody";
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

const permissionLevel = getPermissionLevel(true, "Can be read (view only), comment, edit, or create (full).");

export const addGuestToTask = action({
  display: {
    label: "Add Guest to Task",
    description: "Share a task with a guest.",
  },
  examplePayload: addGuestToTaskExamplePayload,
  perform: async (
    context,
    { clickUpConnection, taskId, guestId, includeShared, customTaskIds, teamId, permissionLevel }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: AddGuestToTaskBody = {
      permission_level: permissionLevel,
    };
    const params: AddGuestToTaskQueryParams = {
      include_shared: includeShared,
      custom_task_ids: customTaskIds,
      team_id: teamId,
    };

    const { data } = await client.post(`/task/${taskId}/guest/${guestId}`, body, { params });

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
    permissionLevel,
  },
});
