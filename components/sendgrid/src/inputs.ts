import { input, util } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
  cleanStringInput,
  cleanValueListInput,
} from "./util";

export const dynamicTemplateData = input({
  label: "Dynamic Template Data",
  type: "code",
  language: "json",
  required: true,
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

export const templateId = input({
  label: "Template ID",
  type: "string",
  required: true,
  comments: "The ID of the dynamic template to use.",
  placeholder: "Enter template ID",
  example: "1234567890",
  clean: util.types.toString,
});

export const to = input({
  label: "To",
  placeholder: "Enter recipient email address(es)",
  type: "string",
  required: true,
  comments:
    "The recipient's email address, or a comma-separated list of recipient email addresses.",
  example: "john.doe@example.com,jane.smith@example.com",
  clean: util.types.toString,
});

export const cc = input({
  label: "CC",
  placeholder: "Enter CC email address(es)",
  type: "string",
  required: false,
  comments:
    "The recipient's email address, or a comma-separated list of recipient email addresses to CC.",
  example: "john.doe@example.com,jane.smith@example.com",
  clean: cleanStringInput,
});

export const bcc = input({
  label: "BCC",
  placeholder: "Enter BCC email address(es)",
  type: "string",
  required: false,
  comments:
    "The recipient's email address, or a comma-separated list of recipient email addresses to BCC.",
  example: "john.doe@example.com,jane.smith@example.com",
  clean: cleanStringInput,
});

export const fromEmail = input({
  label: "From Email",
  placeholder: "Enter sender email address",
  type: "string",
  required: true,
  comments: "The sender's email address.",
  example: "sender@example.com",
  clean: util.types.toString,
});

export const fromName = input({
  label: "From Name",
  placeholder: "Enter sender name",
  type: "string",
  required: false,
  comments: "The sender's name.",
  example: "John Doe",
  clean: cleanStringInput,
});

export const replyToName = input({
  label: "Reply To Name",
  placeholder: "Enter reply-to name",
  type: "string",
  required: false,
  comments:
    "Name to reply to. This field is only required when you provide a value for Reply To Email.",
  example: "John Doe",
  clean: cleanStringInput,
});

export const replyToEmail = input({
  label: "Reply To Email",
  placeholder: "Enter reply-to email address",
  type: "string",
  required: false,
  comments: "Email To Reply To.",
  example: "support@example.com",
  clean: cleanStringInput,
});

export const subject = input({
  label: "Subject",
  placeholder: "Enter email subject",
  type: "string",
  required: true,
  comments: "The email subject line.",
  example: "Hello from Acme!",
  clean: util.types.toString,
});

export const text = input({
  label: "Text",
  placeholder: "Enter email text content",
  type: "text",
  required: true,
  comments: "The text body of the email.",
  example: "Here's the body of a notification.",
  clean: util.types.toString,
});

export const html = input({
  label: "HTML",
  placeholder: "Enter HTML email content",
  type: "text",
  required: false,
  comments: "The optional HTML body of the email.",
  example: "Hello from <b>Acme!</b>",
  clean: cleanStringInput,
});

export const personalizations = input({
  label: "Personalizations",
  type: "code",
  required: false,
  language: "json",
  comments:
    "You can use this field to overwrite multiple properties of the email. For examples of which properties to use, checkout the SendGrid docs: https://docs.sendgrid.com/for-developers/sending-email/personalizations",
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

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The SendGrid connection to use.",
});

export const content = input({
  label: "Attachment Content",
  placeholder: "Select file data from previous step",
  type: "data",
  required: false,
  comments:
    "Provide attachment data to send with the email. The 'File Name' field is required when using this input and should reference the data output from a previous action.",

  clean: util.types.toData,
});

export const fileName = input({
  label: "File Name",
  placeholder: "Enter file name with extension",
  type: "string",
  required: false,
  comments:
    "Provide a name for the file to attach. The 'Attachment Content' field is required when using this input.",
  example: "reports.csv",
  clean: cleanStringInput,
});

export const disposition = input({
  label: "Disposition",
  placeholder: "Select attachment display mode",
  type: "string",
  required: false,
  comments: "Specifies how you would like the attachment to be displayed.",
  model: [
    { label: "Inline", value: "inline" },
    { label: "Attachment", value: "attachment" },
  ],
  example: "inline",
  clean: cleanStringInput,
});


export const fileType = input({
  label: "File Type",
  placeholder: "Enter MIME type",
  type: "string",
  required: false,
  comments: "The MIME type of the content you are attaching.",
  example: "text/plain",
  clean: cleanStringInput,
});

export const contentId = input({
  label: "Content Id",
  placeholder: "Enter content ID",
  type: "string",
  required: false,
  comments:
    "Provide the content Id of the attachment. This value is only required when you select 'inline'.",
  example: "12345",
  clean: cleanStringInput,
});

export const multipleAttachments = input({
  label: "Multiple Attachments",
  type: "code",
  required: false,
  language: "json",
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

export const subscriptionTracking = input({
  label: "Subscription Tracking",
  comments:
    "When true, inserts a subscription management link at the bottom of the text and HTML bodies of your email.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  placeholder: "Enter page size",
  example: "10",
  comments: "Number of results to return per page (max 100).",
  clean: cleanStringInput,
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  placeholder: "Enter page token",
  comments: "Token for fetching the next or previous page of results.",
  clean: cleanStringInput,
});

export const listName = input({
  label: "List Name",
  type: "string",
  required: true,
  placeholder: "Enter list name",
  example: "My New Contact List",
  comments: "The name of the list to create.",
});

export const listId = input({
  label: "List ID",
  type: "string",
  required: true,
  placeholder: "Enter list ID",
  example: "ca3f4b4f-13a5-4321-9876-a1b2c3d4e5f6",
  comments: "The ID of the list to retrieve.",
  dataSource: "sendGridListsDataSource",
});

export const includeSampleContacts = input({
  label: "Include Sample Contacts",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, includes a sample of contacts in the response.",
});

export const contactListIds = input({
  label: "List IDs",
  type: "string", 
  required: false,
  placeholder: "Enter comma-separated list IDs",
  example:
    "ca3f4b4f-13a5-4321-9876-a1b2c3d4e5f6,d7e8f9a0-b1c2-d3e4-f5a6-b7c8d9e0f1a2",
  comments:
    "Comma-separated IDs of the lists to add the contact to. These lists must already exist.",
  dataSource: "sendGridListsDataSource",
});

export const contactsInput = input({
  label: "Contacts",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        email: "ryan.testing@example.com",
        custom_fields: { w2: "George" },
      },
      {
        email: "cassie.testing@example.com",
        first_name: "Cassie",
        last_name: "Testing",
        custom_fields: { w1: "Human" },
      },
    ],
    null,
    2,
  ),
  comments:
    "An array of contact objects to add or update. See SendGrid docs for contact object structure.",
});

export const emailsInput = input({
  label: "Emails",
  type: "string", 
  required: true,
  placeholder: "Enter comma-separated email addresses",
  example: "john.doe@example.com,jane.smith@example.com",
  comments: "Comma-separated email addresses to search for.",
});

export const fieldMappingsInput = input({
  label: "Field Mappings",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify([null, "w1", "_rf1"], null, 2),
  comments:
    "An array of field definition IDs to map the uploaded CSV columns. Use null to skip a column. Get IDs from 'Get All Field Definitions' action.",
});

export const jobId = input({
  label: "Job ID",
  type: "string",
  required: true,
  placeholder: "Enter job ID",
  example: "f8a7b6c5-d4e3-f2a1-b0c9-d8e7f6a5b4c3",
  comments:
    "The job ID returned from Import Contacts, Add/Update Contact, or Delete Contacts operations.",
});

export const isCompressedInput = input({
  label: "Is Compressed",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, indicates that the CSV file will be gzip-compressed.",
});


export const webhookUrl = input({
  label: "Webhook URL",
  placeholder: "Enter a webhook URL",
  example: "https://example.com/webhook",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The URL where SendGrid will send event data.",
});

export const webhookFriendlyName = input({
  label: "Friendly Name",
  placeholder: "Enter a friendly name",
  example: "My Event Webhook",
  type: "string",
  required: false,
  clean: cleanStringInput,
  comments: "A friendly name to help differentiate between multiple webhooks.",
});

export const webhookEnabled = input({
  label: "Enabled",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, enables the Event Webhook.",
  clean: util.types.toBool,
});

export const webhookId = input({
  label: "Webhook ID",
  placeholder: "Enter a webhook ID",
  example: "77d4a5da-7015-11ed-a1eb-0242ac120002",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The ID of the webhook.",
  dataSource: "selectWebhook",
});

export const signatureVerificationEnabled = input({
  label: "Enable Signature Verification",
  type: "boolean",
  required: true,
  default: "true",
  comments: "When true, enables signature verification for webhook requests.",
  clean: util.types.toBool,
});

export const testWebhookUrl = input({
  label: "Test URL",
  placeholder: "Enter a test URL",
  example: "https://example.com/test-webhook",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The URL where the test event will be sent.",
});

const events = input({
  label: "Events",
  collection: "valuelist",
  type: "string",
  required: true,
  model: [
    { label: "Delivered", value: "delivered" },
    { label: "Bounce", value: "bounce" },
    { label: "Deferred", value: "deferred" },
    { label: "Processed", value: "processed" },
    { label: "Dropped", value: "dropped" },
    { label: "Open", value: "open" },
    { label: "Click", value: "click" },
    { label: "Spam Report", value: "spamReport" },
    { label: "Unsubscribe", value: "unsubscribe" },
    { label: "Group Unsubscribe", value: "groupUnsubscribe" },
    { label: "Group Resubscribe", value: "groupResubscribe" },
  ],
  comments: "The events to track.",
  example: "delivered",
  default: ["delivered"],
  clean: cleanValueListInput,
});


export const createWebhookInputs = {
  sendGridConnection: connectionInput,
  url: webhookUrl,
  friendlyName: webhookFriendlyName,
  enabled: webhookEnabled,
  events,
};

export const updateWebhookInputs = {
  sendGridConnection: connectionInput,
  webhookId,
  url: webhookUrl,
  friendlyName: webhookFriendlyName,
  enabled: webhookEnabled,
  events,
};

export const getWebhookInputs = {
  sendGridConnection: connectionInput,
  webhookId,
};

export const listWebhooksInputs = {
  sendGridConnection: connectionInput,
};

export const deleteWebhookInputs = {
  sendGridConnection: connectionInput,
  webhookId,
};

export const testWebhookInputs = {
  sendGridConnection: connectionInput,
  url: testWebhookUrl,
};

export const toggleSignatureVerificationInputs = {
  sendGridConnection: connectionInput,
  webhookId,
  enabled: signatureVerificationEnabled,
};

export const eventWebhookInputs = {
  sendGridConnection: connectionInput,
  friendlyName: webhookFriendlyName,
  events,
};

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, fetches all pages of results using pagination.",
  clean: util.types.toBool,
});
