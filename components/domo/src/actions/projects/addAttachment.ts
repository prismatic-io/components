import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { addAttachmentInputs } from "../../inputs";
import { addAttachmentExamplePayload } from "../../examplePayloads";

export const addAttachment = action({
  display: {
    label: "Add Attachment",
    description: "Adds a multipart form file to a task item as an attachment.",
  },
  examplePayload: addAttachmentExamplePayload,
  perform: async (context, { connection, projectId, listId, taskId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/projects/${projectId}/lists/${listId}/tasks/${taskId}/attachments`,
      undefined,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { data };
  },
  inputs: addAttachmentInputs,
});

export default { addAttachment };
