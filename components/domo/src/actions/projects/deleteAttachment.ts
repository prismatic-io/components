import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deleteAttachmentExamplePayload } from "../../examplePayloads";
import { deleteAttachmentInputs } from "../../inputs";

export const deleteAttachment = action({
  display: {
    label: "Delete Attachment",
    description: "Permanently deletes an attachment from a task.",
  },
  examplePayload: deleteAttachmentExamplePayload,
  perform: async (context, { connection, projectId, taskId, attachmentId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/project/${projectId}/tasks/${taskId}/attachments/${attachmentId}`,
    );
    return { data };
  },
  inputs: deleteAttachmentInputs,
});

export default { deleteAttachment };
