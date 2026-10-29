import { SendRawEmailCommand } from "@aws-sdk/client-ses";
import { action } from "@prismatic-io/spectral";
import { awsRegion } from "aws-utils";
import MailComposer from "nodemailer/lib/mail-composer";
import { createClient } from "../auth";
import { sendEmailExamplePayload } from "../examplePayloads";
import {
  attachments,
  bcc,
  cc,
  connectionInput,
  html,
  replyTo,
  sender,
  subject,
  text,
  to,
} from "../inputs";

export const sendEmail = action({
  display: {
    label: "Send Email",
    description: "Send an email through Amazon SES",
  },
  inputs: {
    awsRegion,
    to,
    cc,
    bcc,
    sender,
    replyTo,
    subject,
    text,
    html,
    attachments,
    awsConnection: connectionInput,
  },
  perform: async (context, params) => {
    const client = await createClient({
      awsConnection: params.awsConnection,
      awsRegion: params.awsRegion,
    });

    const { to, cc, bcc, replyTo } = params;
    const mailComposer = new MailComposer({
      to,
      cc,
      bcc,
      replyTo,
      subject: params.subject,
      text: params.text,
      html: params.html,
      attachments: params.attachments,
      textEncoding: "base64",
    });
    const message = await mailComposer.compile().build();
    const command = new SendRawEmailCommand({
      RawMessage: { Data: message },
      Source: params.sender,
      Destinations: [...params.to, ...params.cc, ...params.bcc],
    });
    const response = await client.send(command);
    return { data: response };
  },
  examplePayload: sendEmailExamplePayload,
});
