import { action } from "@prismatic-io/spectral";
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
      attachments: parsed.attachments.map(
        (attachment: { contentType: string; content: unknown }) => ({
          contentType: attachment.contentType,
          data: attachment.content,
        }),
      ),
      text: parsed.text,
      html: parsed.html,
    };

    return { data: { message, rawMessage: data } };
  },
  examplePayload: getMessageByIdExamplePayload,
});
