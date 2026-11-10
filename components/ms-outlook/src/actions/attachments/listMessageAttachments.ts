import { action, outputSchema } from "@prismatic-io/spectral";
import { listMessageAttachmentsOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { listMessageAttachmentsExamplePayload } from "../../examplePayloads";
import { listMessageAttachmentsInputs } from "../../inputs";
import { listAttachments } from "../../util/attachments";

export const listMessageAttachments = action({
  display: {
    label: "List Message Attachments",
    description: "Lists the attachments on a mail message, without their file contents.",
  },
  inputs: listMessageAttachmentsInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const data = await listAttachments(
      client,
      params.connection,
      `/me/messages/${params.messageId}`,
    );
    return { data };
  },
  examplePerform: async () => listMessageAttachmentsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMessageAttachmentsOutputSchema,
  }),
  examplePayload: listMessageAttachmentsExamplePayload,
});
