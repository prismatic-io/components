import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClickUpClient } from "../../client";
import { createTaskAttachmentExamplePayload } from "../../examplePayloads";
import { connectionInput, getCustomTaskIds, getFile, getFileName, getTaskId, getTeamId } from "../../inputs";
import type { CreateTaskAttachmentQueryParams } from "./types/CreateTaskAttachmentQueryParams";

const taskId = getTaskId(true, "Task ID");
const customTaskIds = getCustomTaskIds(false);
const teamId = getTeamId(false, "Only used when the custom_task_ids parameter is set to true.");
const file = getFile(true);
const fileName = getFileName(true);

export const createTaskAttachment = action({
  display: {
    label: "Create Task Attachment",
    description: "Upload a file to a task as an attachment.",
  },
  examplePayload: createTaskAttachmentExamplePayload,
  perform: async (context, { connection, taskId, customTaskIds, teamId, file, fileName }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const formData = new FormData();
    formData.append("attachment", file.data, { filename: fileName });
    const params: CreateTaskAttachmentQueryParams = {
      custom_task_ids: customTaskIds,
    };
    if (teamId.length) params.team_id = teamId;
    const { data } = await client.post(`/task/${taskId}/attachment`, formData.getBuffer(), {
      params,
      headers: formData.getHeaders(),
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    taskId,
    customTaskIds,
    teamId,
    file,
    fileName,
  },
});
