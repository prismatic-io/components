import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";
import type { CreateWebhookBody } from "../../types";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Create a new webhook for a workspace, space, folder, list, or task.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  examplePayload: createWebhookExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      clickUpConnection,
      teamId,
      endpoint,
      spaceId,
      events,
      folderId,
      listId,
      taskId,
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
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
  examplePerform: async () => createWebhookExamplePayload,
  inputs: createWebhookInputs,
});
