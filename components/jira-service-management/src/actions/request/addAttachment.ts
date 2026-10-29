import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addAttachmentExamplePayload } from "../../examplePayloads";
import { addAttachmentInputs } from "../../inputs";

export const addAttachment = action({
  display: {
    label: "Add Attachment",
    description:
      "Attaches a previously uploaded temporary file to a service request.",
  },
  inputs: addAttachmentInputs,
  perform: async (
    context,
    { connection, issueIdOrKey, attachmentTemporaryFileId },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/request/${issueIdOrKey}/attachment`, {
      temporaryAttachmentIds: [attachmentTemporaryFileId],
      public: true,
      additionalComment: { body: "" },
    });
    return { data };
  },
  examplePayload: addAttachmentExamplePayload,
});
