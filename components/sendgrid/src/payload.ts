import type { MailDataRequired } from "@sendgrid/mail";
import type { MailData } from "@sendgrid/helpers/classes/mail";
import type { EmailJSON } from "@sendgrid/helpers/classes/email-address";

export const createPayload = ({
  to,
  cc,
  bcc,
  from,
  subject,
  text,
  html,
  personalizations,
  replyTo,
  attachments,
  trackingSettings,
  templateId,
}: MailData): MailDataRequired => {
  
  const contents: { text?: string; html?: string } = {};
  if (text) contents.text = text;
  if (html) contents.html = html;

  const toPayload =
    to && typeof to === "string"
      ? to.split(",").map((recipient: string) => recipient.trim())
      : undefined;

  const ccPayload =
    cc && typeof cc === "string"
      ? cc.split(",").map((recipient: string) => recipient.trim())
      : undefined;

  const bccPayload =
    bcc && typeof bcc === "string"
      ? bcc.split(",").map((recipient: string) => recipient.trim())
      : undefined;

  const fromPayload = from as EmailJSON;
  const replyToPayload = replyTo as EmailJSON;

  const payload: MailDataRequired = {
    to: toPayload,
    cc: ccPayload,
    bcc: bccPayload,
    from: { email: fromPayload.email, name: fromPayload?.name || undefined },
    attachments: attachments,
    trackingSettings: trackingSettings || {},
    personalizations:
      personalizations?.length > 0 ? personalizations || undefined : undefined,
    replyTo: replyTo
      ? {
          email: replyToPayload.email || undefined,
          name: replyToPayload.name || undefined,
        }
      : undefined,
    subject,
    templateId: templateId || undefined,
    ...contents,
  };

  return payload;
};
