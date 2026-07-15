import { input, util } from "@prismatic-io/spectral";
import { cleanArrayCodeInput, cleanDataInput, cleanStringInput } from "../util";
import { connectionInput } from "./shared";
const dynamicTemplateData = input({
  label: "Dynamic Template Data",
  type: "code",
  language: "json",
  required: true,
  placeholder: "Enter dynamic template data as JSON",
  comments:
    "The data to be used for the dynamic template. Supports complex nested JSON structures including arrays and objects for order confirmations, customer data, and more.",
  example: JSON.stringify(
    {
      store: {
        name: "Acme Store",
        code: "ACME01",
        url: "https://store.example.com",
        supportEmail: "support@acmestore.com",
      },
      customer: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "+1-555-123-4567",
        customerId: "CUST-12345",
      },
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});
const templateId = input({
  label: "Template ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the dynamic template. Found in the SendGrid dashboard under Email API > Dynamic Templates.",
  placeholder: "Enter template ID",
  example: "1234567890",
  clean: util.types.toString,
});
const to = input({
  label: "To",
  placeholder: "Enter recipient email address(es)",
  type: "string",
  required: true,
  comments:
    "The recipient's email address, or a comma-separated list of recipient email addresses.",
  example: "john.doe@example.com,jane.smith@example.com",
  clean: util.types.toString,
});
const cc = input({
  label: "CC",
  placeholder: "Enter CC email address(es)",
  type: "string",
  required: false,
  comments:
    "The recipient's email address, or a comma-separated list of recipient email addresses to CC.",
  example: "john.doe@example.com,jane.smith@example.com",
  clean: cleanStringInput,
});
const bcc = input({
  label: "BCC",
  placeholder: "Enter BCC email address(es)",
  type: "string",
  required: false,
  comments:
    "The recipient's email address, or a comma-separated list of recipient email addresses to BCC.",
  example: "john.doe@example.com,jane.smith@example.com",
  clean: cleanStringInput,
});
const fromEmail = input({
  label: "From Email",
  placeholder: "Enter sender email address",
  type: "string",
  required: true,
  comments:
    "The verified sender email address that appears in the 'From' field. Must be a verified sender in SendGrid.",
  example: "sender@example.com",
  clean: util.types.toString,
});
const fromName = input({
  label: "From Name",
  placeholder: "Enter sender name",
  type: "string",
  required: false,
  comments:
    "The display name that appears alongside the sender email address in the recipient's inbox.",
  example: "John Doe",
  clean: cleanStringInput,
});
const replyToName = input({
  label: "Reply To Name",
  placeholder: "Enter reply-to name",
  type: "string",
  required: false,
  comments:
    "Name to reply to. This field is only required when you provide a value for Reply To Email.",
  example: "John Doe",
  clean: cleanStringInput,
});
const replyToEmail = input({
  label: "Reply To Email",
  placeholder: "Enter reply-to email address",
  type: "string",
  required: false,
  comments:
    "The email address recipients see when they reply. Only used when different from the sender address.",
  example: "support@example.com",
  clean: cleanStringInput,
});
const subject = input({
  label: "Subject",
  placeholder: "Enter email subject",
  type: "string",
  required: true,
  comments:
    "The subject line displayed in the recipient's inbox. Supports UTF-8 encoding.",
  example: "Hello from Acme!",
  clean: util.types.toString,
});
const text = input({
  label: "Text",
  placeholder: "Enter email text content",
  type: "text",
  required: true,
  comments:
    "The plain-text content of the email, used as a fallback when HTML is not supported by the recipient's email client.",
  example: "Here's the body of a notification.",
  clean: util.types.toString,
});
const html = input({
  label: "HTML",
  placeholder: "Enter HTML email content",
  type: "text",
  required: false,
  comments:
    "The HTML-formatted content of the email. When provided, takes priority over the plain-text body in clients that support HTML rendering.",
  example: "Hello from <b>Acme!</b>",
  clean: cleanStringInput,
});
const personalizations = input({
  label: "Personalizations",
  type: "code",
  required: false,
  language: "json",
  placeholder: "Enter personalizations as JSON",
  comments:
    "Allows overwriting multiple properties of the email such as recipients, subject, and send time per recipient. See [SendGrid personalizations docs](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/personalizations) for examples.",
  example: `[
  {
    "to": [
      {
        "email": "john@example.com"
      }
    ],
    "send_at": 1600188812
  },
  {
    "to": [
      {
        "email": "jane@example.com"
      }
    ],
    "send_at": 1600275471
  }
]`,
  default: "[]",
  clean: (code: unknown) => cleanArrayCodeInput(code, "Personalizations"),
});
const content = input({
  label: "Attachment Content",
  placeholder: "Select file data from previous step",
  type: "data",
  required: false,
  comments:
    "Provide attachment data to send with the email. The 'File Name' field is required when using this input and should reference the data output from a previous action.",
  clean: cleanDataInput,
});
const fileName = input({
  label: "File Name",
  placeholder: "Enter file name with extension",
  type: "string",
  required: false,
  comments:
    "Provide a name for the file to attach. The 'Attachment Content' field is required when using this input.",
  example: "reports.csv",
  clean: cleanStringInput,
});
const disposition = input({
  label: "Disposition",
  placeholder: "Select attachment display mode",
  type: "string",
  required: false,
  comments:
    "Specifies how the attachment is displayed. Use 'inline' for embedded content or 'attachment' for a downloadable file.",
  model: [
    { label: "Inline", value: "inline" },
    { label: "Attachment", value: "attachment" },
  ],
  example: "inline",
  clean: cleanStringInput,
});
const fileType = input({
  label: "File Type",
  placeholder: "Enter MIME type",
  type: "string",
  required: false,
  comments: "The MIME type of the content you are attaching.",
  example: "text/plain",
  clean: cleanStringInput,
});
const contentId = input({
  label: "Content ID",
  placeholder: "Enter content ID",
  type: "string",
  required: false,
  comments:
    "Provide the content Id of the attachment. This value is only required when you select 'inline'.",
  example: "12345",
  clean: cleanStringInput,
});
const multipleAttachments = input({
  label: "Multiple Attachments",
  type: "code",
  required: false,
  language: "json",
  placeholder: "Enter attachment array as JSON",
  example: JSON.stringify({
    content: "<base64 encoded content>",
    disposition: "inline",
    filename: "reports.csv",
    type: "text/csv",
    content_id: "12345",
  }),
  comments:
    "Provide an array of attachments to send with the email. See [SendGrid API documentation](https://www.twilio.com/docs/sendgrid/api-reference/mail-send/mail-send#request-body) for more information.",
  clean: (code: unknown) => cleanArrayCodeInput(code, "Multiple Attachments"),
});
const subscriptionTracking = input({
  label: "Subscription Tracking",
  comments:
    "When true, inserts a subscription management link at the bottom of the text and HTML bodies of your email.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
export const sendEmailInputs = {
  sendGridConnection: connectionInput,
  to,
  fromEmail,
  subject,
  text,
  cc,
  bcc,
  fromName,
  replyToEmail,
  replyToName,
  html,
  personalizations,
  content,
  disposition,
  fileName,
  fileType,
  contentId,
  multipleAttachments,
  subscriptionTracking,
};
export const sendMultipleEmailsInputs = {
  sendGridConnection: connectionInput,
  to,
  fromEmail,
  subject,
  text,
  cc,
  bcc,
  fromName,
  replyToEmail,
  replyToName,
  html,
  personalizations,
  content,
  disposition,
  fileName,
  fileType,
  contentId,
  multipleAttachments,
};
export const sendEmailWithDynamicTemplateInputs = {
  sendGridConnection: connectionInput,
  templateId,
  dynamicTemplateData,
  fromEmail,
  to: {
    ...to,
    required: false,
    comments: `${to.comments} Required if 'Personalizations' is not provided. Will be ignored if 'Personalizations' is provided.`,
  },
  fromName,
  cc: {
    ...cc,
    comments: `${cc.comments} Will be ignored if 'Personalizations' is provided.`,
  },
  bcc: {
    ...bcc,
    comments: `${bcc.comments} Will be ignored if 'Personalizations' is provided.`,
  },
  replyToEmail,
  replyToName,
  personalizations: {
    ...personalizations,
    comments:
      "Advanced: Provide a personalizations array to send different variations to different recipients. When provided, this will override 'To', 'CC', and 'BCC' inputs. Each personalization will automatically include the dynamic template data.",
  },
};
