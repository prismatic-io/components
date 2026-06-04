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
  templateId,
  templateModel,
  templateAlias,
  inlineCss,
} from "../inputs";
import { createHttpClient } from "../client";
import { sendEmailWithTemplateExamplePayload } from "../examplePayloads";

export const sendEmailWithTemplate = action({
  display: {
    label: "Send Email With Template",
    description: "Send an email with a Postmark template",
  },
  examplePayload: sendEmailWithTemplateExamplePayload,
  perform: async (context, params) => {
    if (!params.templateId && !params.templateAlias) {
      throw new Error("Either templateId or templateAlias must be provided.");
    }

    if (!params.htmlBody && !params.textBody) {
      throw new Error("Either htmlBody or textBody must be provided.");
    }

    const emailData = {
      From: params.fromAddress,
      To: params.toAddress,
      TemplateId: params.templateId,
      TemplateAlias: params.templateAlias,
      TemplateModel: params.templateModel,
      InlineCss: params.inlineCss,
      Cc: params.ccAddress,
      Bcc: params.bccAddress,
      Tag: params.tag,
      ReplyTo: params.replyTo,
      Headers: params.headers,
      Metadata: params.metadata,
      Attachments: params.attachments,
    };

    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/email/withTemplate`, emailData);
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
    templateId,
    templateModel,
    templateAlias,
    inlineCss,
  },
});
