import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { deleteAttachmentV3ExamplePayload } from "../../../examplePayloads/v3/attachments";
import { deleteAttachmentV3Inputs } from "../../../inputs/v3/attachments";

export const deleteAttachmentV3 = action({
  display: {
    label: "Delete Attachment",
    description: "Permanently deletes an attachment from its application.",
  },
  inputs: deleteAttachmentV3Inputs,
  perform: async (context, { connection, attachmentId }) => {
    const client = createV3Client(connection, context.debug.enabled);
    await client.delete(`/attachments/${attachmentId}`);
    return { data: { success: true } };
  },
  examplePayload: deleteAttachmentV3ExamplePayload,
});
