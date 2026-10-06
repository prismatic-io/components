import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClickUpClient } from "../../client";
import { createTaskAttachmentExamplePayload } from "../../examplePayloads";
import { createTaskAttachmentInputs } from "../../inputs";
import { createTaskAttachmentOutputSchema } from "../../outputSchemas";
import type { CreateTaskAttachmentQueryParams } from "../../types";
export const createTaskAttachment = action({
  display: {
    label: "Create Task Attachment",
    description: "Upload a file to a task as an attachment.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTaskAttachmentOutputSchema,
  }),
  examplePayload: createTaskAttachmentExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, taskId, customTaskIds, teamId, file, fileName },
  ) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const formData = new FormData();
    formData.append("attachment", file.data, { filename: fileName });
    const params: CreateTaskAttachmentQueryParams = {
      custom_task_ids: customTaskIds,
    };
    if (teamId?.length) params.team_id = teamId;
    const { data } = await client.post(
      `/task/${taskId}/attachment`,
      formData.getBuffer(),
      {
        params,
        headers: formData.getHeaders(),
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => createTaskAttachmentExamplePayload,
  inputs: createTaskAttachmentInputs,
});
