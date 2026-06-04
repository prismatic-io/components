import { action } from "@prismatic-io/spectral";
import { connectionInput, emails } from "../inputs";
import { createHttpClient } from "../client";
import { sendBatchEmailExamplePayload } from "../examplePayloads";

export const sendBatchEmail = action({
  display: {
    label: "Send Email Batch",
    description: "Send a batch of emails using Postmark",
  },
  examplePayload: sendBatchEmailExamplePayload,
  perform: async (context, params) => {
    if (
      !Array.isArray(params.emails) ||
      params.emails.some((email) => typeof email !== "object")
    ) {
      throw new Error(
        "Invalid emails input. Please provide a JSON array of email objects.",
      );
    }

    const emailBatchData = params.emails.map((email) => ({
      From: email.From,
      To: email.To,
      Cc: email.Cc,
      Bcc: email.Bcc,
      Subject: email.Subject,
      Tag: email.Tag,
      HtmlBody: email.HtmlBody,
      TextBody: email.TextBody,
      ReplyTo: email.ReplyTo,
      TrackOpens: email.TrackOpens,
      Headers: email.Headers,
      Metadata: email.Metadata,
      Attachments: email.Attachments,
    }));

    const httpClient = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );
    const { data } = await httpClient.post(`/email/batch`, emailBatchData);
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    emails,
  },
});
