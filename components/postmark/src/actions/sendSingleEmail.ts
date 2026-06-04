import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  fromAddress,
  toAddress,
  ccAddress,
  bccAddress,
  subject,
  tag,
  htmlBody,
  textBody,
  replyTo,
  trackOpens,
  headers,
  metadata,
  attachments,
} from "../inputs";
import { createHttpClient } from "../client";
import { sendSingleEmailExamplePayload } from "../examplePayloads";

export const sendSingleEmail = action({
  display: {
    label: "Send Email",
    description: "Send an email using Postmark",
  },
  examplePayload: sendSingleEmailExamplePayload,
  perform: async (context, params) => {
    const emailData = {
      From: params.fromAddress,
      To: params.toAddress,
      Cc: params.ccAddress,
      Bcc: params.bccAddress,
      Subject: params.subject,
      Tag: params.tag,
      HtmlBody: params.htmlBody,
      TextBody: params.textBody,
      ReplyTo: params.replyTo,
      TrackOpens: params.trackOpens,
      Headers: params.headers,
      Metadata: params.metadata,
      Attachments: params.attachments,
    };

    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/email`, emailData);
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    fromAddress,
    toAddress,
    ccAddress,
    bccAddress,
    subject,
    tag,
    htmlBody,
    textBody,
    replyTo,
    trackOpens,
    headers,
    metadata,
    attachments,
  },
});
