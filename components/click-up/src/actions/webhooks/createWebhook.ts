import { action, util } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  events,
  getEndpoint,
  getFolderId,
  getlistId,
  getSpaceId,
  getTaskId,
  getTeamId,
} from "../../inputs";
import type { CreateWebhookBody } from "./types/CreateWebhookBody";

const teamId = getTeamId(true, "Team ID (Workspace)");
const endpoint = getEndpoint(true, "URL of the webhook endpoint.");
const spaceId = getSpaceId(false, "Space ID");
const folderId = getFolderId(false, "Folder ID");
const listId = getlistId(false, "List ID");
const taskId = getTaskId(false, "Task ID");

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook for a workspace, space, folder, list, or task.",
  },
  examplePayload: createWebhookExamplePayload,
  perform: async (context, { clickUpConnection, teamId, endpoint, spaceId, events, folderId, listId, taskId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: CreateWebhookBody = {
      endpoint,
      events,
      ...(spaceId?.length && { space_id: util.types.toInt(spaceId) }),
      ...(folderId?.length && { folder_id: util.types.toInt(folderId) }),
      ...(listId?.length && { list_id: util.types.toInt(listId) }),
      ...(taskId?.length && { task_id: taskId }),
    };
    const { data } = await client.post(`/team/${teamId}/webhook`, body);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    endpoint,
    spaceId,
    events,
    folderId,
    listId,
    taskId,
  },
});
