import { action, outputSchema } from "@prismatic-io/spectral";
import { getMessageByIdOutputSchema } from "../../outputSchemas";
import { simpleParser } from "mailparser";
import { createClient } from "../../client";
import { getMessageByIdExamplePayload } from "../../examplePayloads";
import { getMessageByIdInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const getMessageById = action({
  display: {
    label: "Get Mail Message",
    description: "Fetches and parses a raw message by ID.",
  },
  inputs: getMessageByIdInputs,
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      `/me/messages/${params.messageId}/$value`,
    );
    const { data } = await client.get(url);

    const parsed = await simpleParser(data);

    const message = {
      headers: Object.fromEntries(parsed.headers),
      attachments: parsed.attachments.map((attachment) => ({
        filename: attachment.filename,
        contentType: attachment.contentType,
        size: attachment.size,
        contentId: attachment.contentId,
        related: attachment.related,
        data: attachment.content,
      })),
      text: parsed.text,
      html: parsed.html,
    };

    return { data: { message, rawMessage: data } };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getMessageByIdOutputSchema,
  }),
  examplePayload: getMessageByIdExamplePayload,
});
