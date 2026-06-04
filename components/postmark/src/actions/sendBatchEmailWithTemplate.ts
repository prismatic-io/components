import { action } from "@prismatic-io/spectral";
import { connectionInput, messagesInput } from "../inputs";
import { createHttpClient } from "../client";
import { sendBatchEmailWithTemplateExamplePayload } from "../examplePayloads";

export const sendBatchEmailWithTemplate = action({
  display: {
    label: "Send Email Batch With Template",
    description: "Send a batch of emails using a Postmark template",
  },
  examplePayload: sendBatchEmailWithTemplateExamplePayload,
  perform: async (context, params) => {
    
    if (!Array.isArray(params.Messages)) {
      throw new Error(
        `Invalid messages input. Please provide a JSON array of message objects.`,
      );
    }

    const Messages = params.Messages.map((email) => ({
      From: email.From,
      To: email.To,
      Cc: email.Cc,
      Bcc: email.Bcc,
      TemplateId: email.TemplateId,
      TemplateAlias: email.TemplateAlias,
      TemplateModel: email.TemplateModel,
      Tag: email.Tag,
      ReplyTo: email.ReplyTo,
      TrackOpens: email.TrackOpens,
      Headers: email.Headers,
      Metadata: email.Metadata,
      Attachments: email.Attachments,
    }));

    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/email/batchWithTemplates`, {
      Messages: Messages,
    });
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    Messages: messagesInput,
  },
});
