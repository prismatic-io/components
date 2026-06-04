import { input, util } from "@prismatic-io/spectral";

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  comments: "The email address of the user.",
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Postmark connection to use.",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results. Count and Offset inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});

export const count = input({
  label: "Count",
  placeholder: "Enter number of servers to return",
  type: "string",
  required: true,
  example: "50",
  comments: "Number of servers to return per request. Maximum 500.",
});

export const offset = input({
  label: "Offset",
  placeholder: "Enter number of servers to skip",
  type: "string",
  required: true,
  example: "0",
  comments: "Number of servers to skip for pagination.",
});

export const serverId = input({
  label: "Server ID",
  placeholder: "Enter server ID",
  type: "string",
  required: true,
  example: "1234567",
  comments: "The unique numeric identifier of the server.",
  dataSource: "selectServer",
});

export const serverConfig = input({
  label: "Server Config",
  placeholder: "Enter server configuration",
  type: "jsonForm",
  required: true,
  comments: "Configuration object to apply to the server.",
});

export const serverName = input({
  label: "Server Name",
  placeholder: "Enter server name",
  type: "string",
  required: false,
  example: "Production01",
  comments:
    "Filter by a specific server name. <strong>Note:</strong> This is a partial match search - 'MyServer' will match 'MyServer', 'MyServer Production', and 'MyServer Test'.",
});

export const serverColor = input({
  label: "Server Color",
  placeholder: "Enter server color",
  type: "string",
  required: false,
  example: "blue",
  comments: "Color label for the server in the Postmark interface.",
});

export const enableSmtpApiErrorHooks = input({
  label: "Enable SMTP API Error Hooks",
  type: "boolean",
  required: false,
  comments: "When true, SMTP API errors will be included with bounce webhooks.",
});

export const smtpApiActivated = input({
  label: "SMTP API Activated",
  type: "boolean",
  required: false,
  comments: "When true, SMTP is enabled on this server.",
});

export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  example: "https://your-webhook-endpoint.com/postmark",
  placeholder: "Enter webhook URL",
  comments: "The URL where webhook events will be sent.",
});

export const triggers = input({
  label: "Triggers",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      Open: {
        Enabled: true,
        PostFirstOpenOnly: false,
      },
      Click: {
        Enabled: true,
      },
      Delivery: {
        Enabled: true,
      },
      Bounce: {
        Enabled: false,
        IncludeContent: false,
      },
      SpamComplaint: {
        Enabled: false,
        IncludeContent: false,
      },
      SubscriptionChange: {
        Enabled: false,
      },
    },
    null,
    2,
  ),
  comments:
    "A JSON object specifying the triggers for the webhook. Use the default structure as a guideline.",
  clean: (triggersInput) => {
    return util.types.isJSON(util.types.toString(triggersInput))
      ? JSON.parse(util.types.toString(triggersInput))
      : triggersInput;
  },
});

export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique numeric identifier of the webhook.",
  example: "1234567",
  placeholder: "Enter webhook ID",
  dataSource: "selectWebhook",
});

export const showOnlyInstanceWebhooks = input({
  label: "Show Only Instance Webhooks",
  type: "boolean",
  required: true,
  default: "true",
  comments: "When true, show only webhooks that point to this instance.",
});

export const fromAddress = input({
  label: "From Address",
  type: "string",
  required: true,
  example: "sender@example.com",
  placeholder: "Enter sender email address",
  comments:
    "The sender email address. Must be a verified sender signature in Postmark.",
});

export const toAddress = input({
  label: "To Address",
  type: "string",
  required: true,
  example: "receiver@example.com",
  placeholder: "Enter recipient email address(es)",
  comments:
    "The recipient email address(es). Multiple addresses can be comma-separated. Maximum of 50 recipients per message.",
});

export const ccAddress = input({
  label: "Cc",
  type: "string",
  required: false,
  example: "copied@example.com",
  placeholder: "Enter CC email address(es)",
  comments:
    "Carbon copy recipient email address(es). Multiple addresses can be comma-separated. Maximum of 50 recipients per message.",
});

export const bccAddress = input({
  label: "Bcc",
  type: "string",
  required: false,
  example: "blind-copied@example.com",
  placeholder: "Enter BCC email address(es)",
  comments:
    "Blind carbon copy recipient email address(es). Multiple addresses can be comma-separated. Maximum of 50 recipients per message.",
});

export const subject = input({
  label: "Subject",
  type: "string",
  required: false,
  example: "Welcome to Our Service",
  placeholder: "Enter email subject",
  comments: "The subject line of the email message.",
});

export const tag = input({
  label: "Tag",
  type: "string",
  required: false,
  example: "welcome-email",
  placeholder: "Enter email tag",
  comments:
    "A tag to categorize the email for tracking and filtering purposes.",
});

export const htmlBody = input({
  label: "Html Body",
  type: "code",
  required: false,
  language: "html",
  example:
    "<html><body><h1>Welcome!</h1><p>Thanks for joining us.</p></body></html>",
  comments: "The HTML content of the email message.",
});

export const textBody = input({
  label: "Text Body",
  type: "text",
  required: false,
  default: "",
  example: "Welcome! Thanks for joining us.",
  placeholder: "Enter email body text",
  comments: "The plain text content of the email message.",
});

export const replyTo = input({
  label: "Reply To",
  type: "string",
  required: false,
  example: "reply@example.com",
  placeholder: "Enter reply-to email address",
  comments:
    "Reply-to email address override. Defaults to the Reply To address set in the sender signature.",
});

export const trackOpens = input({
  label: "Track Opens",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, activate open tracking for this email.",
});

export const headers = input({
  label: "Headers",
  type: "code",
  language: "json",
  required: false,
  example: '[{"Name": "CUSTOM-HEADER", "Value": "value"}]',
  comments: "List of custom headers to include.",
  clean: (headersInput) => {
    return util.types.isJSON(util.types.toString(headersInput))
      ? JSON.parse(util.types.toString(headersInput))
      : headersInput;
  },
});

export const metadata = input({
  label: "Metadata",
  type: "code",
  language: "json",
  required: false,
  example: '{"color":"blue","client-id":"12345"}',
  comments: "Custom metadata key/value pairs.",
  clean: (metadataInput) => {
    return util.types.isJSON(util.types.toString(metadataInput))
      ? JSON.parse(util.types.toString(metadataInput))
      : metadataInput;
  },
});

export const attachments = input({
  label: "Attachments",
  type: "code",
  language: "json",
  required: false,
  example:
    '[{"Name": "readme.txt", "Content": "dGVzdCBjb250ZW50", "ContentType": "text/plain"}]',
  comments: "List of attachments",
  clean: (attachmentsInput) => {
    return util.types.isJSON(util.types.toString(attachmentsInput))
      ? JSON.parse(util.types.toString(attachmentsInput))
      : attachmentsInput;
  },
});

export const emails = input({
  label: "Emails",
  type: "code",
  language: "json",
  default: JSON.stringify(
    [
      {
        fromAddress: "test@example.com",
        toAddress: "user@example.com",
        ccAddress: "cc@example.com",
        bccAddress: "bcc@example.com",
        subject: "Hello, world!",
        tag: "tag-example",
        htmlBody: "<p>Hello, world!</p>",
        textBody: "Hello, world!",
        replyTo: "reply@example.com",
        headers: [
          {
            Name: "CUSTOM-HEADER",
            Value: "value",
          },
        ],
        metadata: {
          color: "green",
          "client-id": "12345",
        },
        attachments: [
          {
            Name: "readme.txt",
            Content: "dGVzdCBjb250ZW50",
            ContentType: "text/plain",
          },
          {
            Name: "report.pdf",
            Content: "dGVzdCBjb250ZW50",
            ContentType: "application/octet-stream",
          },
        ],
      },
      {
        
      },
    ],
    null,
    2,
  ),
  required: true,
  comments:
    "Provide a JSON array of email objects. Each object should include the necessary email information.",
  clean: (emailsInput) => {
    return util.types.isJSON(util.types.toString(emailsInput))
      ? JSON.parse(util.types.toString(emailsInput))
      : emailsInput;
  },
});

export const templateId = input({
  label: "Template ID",
  type: "string",
  required: false,
  example: "31941508",
  placeholder: "Enter template ID",
  comments:
    "The numeric ID of the Postmark template to use for sending the email.",
});

export const templateAlias = input({
  label: "Template Alias",
  type: "string",
  required: false,
  example: "welcome-email",
  placeholder: "Enter template alias",
  comments:
    "The alias of a template to use when sending this message. Required if Template ID is not specified.",
});

export const templateModel = input({
  label: "Template Model",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify({ fizz: "buzz", test: "case" }, null, 2),
  example: '{"key1":"value1", "key2":"value2"}',
  comments: "The template data to use with the email template",
  clean: (templateModelInput) => {
    if (!util.types.isJSON(util.types.toString(templateModelInput))) {
      throw new Error("Invalid JSON provided for Template Model.");
    }
    return JSON.parse(util.types.toString(templateModelInput));
  },
});

export const inlineCss = input({
  label: "Inline Css",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, CSS style blocks in the template will be applied as inline attributes to the rendered HTML content.",
});

export const messagesInput = input({
  label: "Messages",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    {
      Messages: [
        {
          From: "sender@example.com",
          To: "receiver@example.com",
          TemplateId: 31941508,
          TemplateModel: {
            fizz: "buzz",
          },
        },
        {
          From: "sender@example.com",
          To: "receiver@example.com",
          TemplateAlias: "code-your-own",
          TemplateModel: {
            fizz: "buzz",
          },
        },
      ],
    },
    null,
    2,
  ),
  example:
    '[{"From": "sender@example.com", "To": "receiver@example.com", "TemplateId": 12345, "TemplateModel": {"fizz": "buzz"}}]',
  comments:
    "The list of templates to send. Please note that we accept up to 500 messages per API call.",
  clean: (messagesInput) => {
    const parsedInput = util.types.isJSON(util.types.toString(messagesInput))
      ? JSON.parse(util.types.toString(messagesInput))
      : messagesInput;
    return parsedInput.Messages;
  },
});

export const rawEmailEnabled = input({
  label: "Raw Email Enabled",
  type: "boolean",
  required: false,
  example: "false",
  comments:
    "When true, raw email content will be included with inbound webhook payloads under the RawEmail key.",
});

export const deliveryType = input({
  label: "Delivery Type",
  type: "string",
  required: false,
  example: "Live",
  placeholder: "Select delivery type",
  comments:
    "The type of environment for your server. Options: Live, Sandbox. Defaults to Live. <strong>Important:</strong> This cannot be changed after the server is created.",
  default: "Live",
});

export const inboundHookUrl = input({
  label: "Inbound Hook URL",
  type: "string",
  required: false,
  example: "https://hooks.example.com/inbound",
  placeholder: "Enter inbound hook URL",
  comments: "The URL to POST to whenever an inbound email event occurs.",
});
