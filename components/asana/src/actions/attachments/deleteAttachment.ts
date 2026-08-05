import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deleteAttachmentExamplePayload } from "../../examplePayloads";
import { deleteAttachmentInputs } from "../../inputs";
export const deleteAttachment = action({
  display: {
    label: "Delete Attachment",
    description: "Delete an existing attachment.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/attachments/${params.attachmentId}`);
    return { data };
  },
  inputs: deleteAttachmentInputs,
  examplePayload: deleteAttachmentExamplePayload,
});
