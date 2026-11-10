import { action, outputSchema } from "@prismatic-io/spectral";
import { listEventAttachmentsOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { listEventAttachmentsExamplePayload } from "../../examplePayloads";
import { listEventAttachmentsInputs } from "../../inputs";
import { listAttachments } from "../../util/attachments";

export const listEventAttachments = action({
  display: {
    label: "List Event Attachments",
    description: "Lists the attachments on a calendar event, without their file contents.",
  },
  inputs: listEventAttachmentsInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const data = await listAttachments(client, params.connection, `/me/events/${params.eventId}`);
    return { data };
  },
  examplePerform: async () => listEventAttachmentsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEventAttachmentsOutputSchema,
  }),
  examplePayload: listEventAttachmentsExamplePayload,
});
