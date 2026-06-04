import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { downloadAttachmentInputs } from "../../inputs";
import { downloadAttachmentExamplePayload } from "../../examplePayloads";

export const downloadAttachment = action({
  display: {
    label: "Download Attachment",
    description: "Downloads an individual attachment by ID.",
  },
  examplePayload: downloadAttachmentExamplePayload,
  perform: async (
    context,
    { connection, listId, projectId, taskId, attachmentId },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/projects/${projectId}/lists/${listId}/tasks/${taskId}/attachments/${attachmentId}`,
    );
    return { data };
  },
  inputs: downloadAttachmentInputs,
});

export default { downloadAttachment };
