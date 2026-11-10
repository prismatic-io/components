import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { downloadMessageAttachmentExamplePayload } from "../../examplePayloads";
import { downloadMessageAttachmentInputs } from "../../inputs";
import { downloadAttachment } from "../../util/attachments";

export const downloadMessageAttachment = action({
  display: {
    label: "Download Message Attachment",
    description: "Downloads the file contents of an attachment on a mail message.",
  },
  inputs: downloadMessageAttachmentInputs,
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    return downloadAttachment(
      client,
      params.connection,
      `/me/messages/${params.messageId}`,
      params.attachmentId,
    );
  },
  examplePayload: downloadMessageAttachmentExamplePayload,
});
