import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAttachmentInputs } from "../../inputs";
export const deleteAttachment = action({
  display: {
    label: "Delete Attachment",
    description: "Deletes a specific attachment.",
  },
  inputs: deleteAttachmentInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, attachmentId, purgeAttachment },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const params = {
      purge: purgeAttachment,
    };
    const { data } = await client.delete(`/attachments/${attachmentId}`, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async () => null,
  examplePayload: {
    data: null,
  },
});
