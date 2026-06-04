import { action } from "@prismatic-io/spectral";
import type { Attachment, Message } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { sendMessageExamplePayload } from "../../examplePayloads";
import { sendMessageInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const sendMessage = action({
  display: {
    label: "Send Message",
    description: "Sends a new message.",
  },
  inputs: sendMessageInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const message: Message = {
      toRecipients: (params.to || []).map((address: string) => ({
        emailAddress: { address: address },
      })),
      ccRecipients: (params.cc || []).map((address: string) => ({
        emailAddress: { address: address },
      })),
      bccRecipients: (params.bcc || []).map((address: string) => ({
        emailAddress: { address: address },
      })),
      subject: params.subject,
      body: { contentType: params.bodyContentType, content: params.body },
      attachments: [...params.attachments, ...params.dynamicAttachments] as Attachment[],
    };

    const url = computeEndpointBasedOnConnection(params.connection, "/me/sendMail");
    await client.post(url, {
      message,
    });
    return { data: null };
  },
  examplePayload: sendMessageExamplePayload,
});
