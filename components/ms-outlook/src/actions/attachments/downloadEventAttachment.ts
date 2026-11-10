import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { downloadEventAttachmentExamplePayload } from "../../examplePayloads";
import { downloadEventAttachmentInputs } from "../../inputs";
import { downloadAttachment } from "../../util/attachments";

export const downloadEventAttachment = action({
  display: {
    label: "Download Event Attachment",
    description: "Downloads the file contents of an attachment on a calendar event.",
  },
  inputs: downloadEventAttachmentInputs,
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    return downloadAttachment(
      client,
      params.connection,
      `/me/events/${params.eventId}`,
      params.attachmentId,
    );
  },
  examplePayload: downloadEventAttachmentExamplePayload,
});
