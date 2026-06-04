import { createTransport } from "nodemailer";
import { action, input, util } from "@prismatic-io/spectral";
import { cleanAttachments, cleanEmailInput, cleanString } from "./util";
import { multipleAttachments } from "./inputs";

const joinEmailAddresses = (values: unknown[]) =>
  (values || []).map((value) => util.types.toString(value)).join(", ");

const sendEmail = action({
  display: {
    label: "Send Email",
    description: "Send an email",
  },
  inputs: {
    connection: input({
      type: "connection",
      label: "Connection",
      required: true,
    }),
    to: input({
      label: "To Address",
      example: "example@example.com",
      type: "string",
      collection: "valuelist",
      required: true,
      comments:
        "The destination for this email. The recipients to place on the To: line of the message.",
      clean: (emails: unknown) => cleanEmailInput(emails, true),
    }),
    toJson: input({
      label: "Dynamic To Address",
      type: "code",
      language: "json",
      required: false,
      comments:
        "The destination for this email. The recipients to place on the To: line of the message. An array of emails is expected.",
      example: JSON.stringify(
        ["example@example.com", "example2@example.com"],
        null,
        2,
      ),
      clean: cleanEmailInput,
    }),
    from: input({
      label: "From",
      type: "string",
      example: "example@example.com",
      required: false,
      comments:
        "The email address of the sender. This is the address that will appear in the recipient's inbox as the sender of the message.",
      clean: cleanString,
    }),
    cc: input({
      label: "Cc Address",
      example: "example@example.com",
      type: "string",
      collection: "valuelist",
      required: false,
      comments:
        "The destination for this email. The recipients to place on the CC: line of the message.",
    }),
    ccJson: input({
      label: "CC Address (JSON)",
      type: "code",
      language: "json",
      required: false,
      comments:
        "The destination for this email. The recipients to place on the CC: line of the message. An array of emails is expected.",
      example: JSON.stringify(
        ["example@example.com", "example2@example.com"],
        null,
        2,
      ),
      clean: cleanEmailInput,
    }),
    bcc: input({
      label: "Bcc Address",
      example: "example@example.com",
      type: "string",
      collection: "valuelist",
      required: false,
      comments:
        "The destination for this email. The recipients to place on the BCC: line of the message.",
    }),
    bccJson: input({
      label: "BCC Address (JSON)",
      type: "code",
      language: "json",
      required: false,
      comments:
        "The destination for this email. The recipients to place on the BCC: line of the message. An array of emails is expected.",
      example: JSON.stringify(
        ["example@example.com", "example2@example.com"],
        null,
        2,
      ),
      clean: cleanEmailInput,
    }),
    replyTo: input({
      label: "Reply To",
      type: "string",
      collection: "valuelist",
      example: "example@example.com",
      required: false,
      comments:
        "The reply-to email address(es) for the message. If the recipient replies to the message, each reply-to address will receive the reply.",
    }),
    subject: input({
      label: "Subject",
      example: "My Email Subject",
      type: "string",
      required: true,
      comments:
        "The subject of the message: A short summary of the content, which will appear in the recipient's inbox.",
      clean: util.types.toString,
    }),
    text: input({
      label: "Text",
      type: "string",
      example: "Hello World!",
      required: true,
      comments:
        "The content of the message, in text format. Use this for text-based email clients, or clients on high-latency networks (such as mobile devices).",
      clean: util.types.toString,
    }),
    html: input({
      label: "Html",
      example: "<p>Hello World!</p>",
      type: "code",
      language: "html",
      required: false,
      comments:
        "The content of the message, in HTML format. Use this for email clients that can process HTML. You can include clickable links, formatted text, and much more in an HTML message.",
      clean: util.types.toString,
    }),
    attachments: input({
      label: "Attachments",
      type: "string",
      comments:
        "Specify a file name as the key (i.e. 'my-file.pdf'), and the file as the value",
      collection: "keyvaluelist",
      clean: cleanAttachments,
    }),
    multipleAttachments,
  },
  perform: async (context, params) => {
    const hasAuth =
      Boolean(params.connection.fields.username) ||
      Boolean(params.connection.fields.password);

    const allowUnauthorized = util.types.toBool(
      params.connection.fields.allowUnauthorized,
    );

    const port = util.types.toNumber(params.connection.fields.port);
    const useTls = util.types.toBool(params.connection.fields.secure);
    
    
    const isImplicitTls = port === 465;

    const client = createTransport({
      host: util.types.toString(params.connection.fields.host),
      port,
      secure: isImplicitTls,
      requireTLS: useTls && !isImplicitTls,
      ...(hasAuth
        ? {
            auth: {
              user: util.types.toString(params.connection.fields.username),
              pass: util.types.toString(params.connection.fields.password),
            },
          }
        : {}),
      ...(allowUnauthorized
        ? {
            tls: {
              rejectUnauthorized: false,
            },
          }
        : {}),
    });

    const to = [...new Set([...params.to, ...params.toJson])];
    const cc = [...new Set([...params.cc, ...params.ccJson])];
    const bcc = [...new Set([...params.bcc, ...params.bccJson])];

    const result = await client.sendMail({
      to: joinEmailAddresses(to),
      from: params.from,
      cc: joinEmailAddresses(cc),
      bcc: joinEmailAddresses(bcc),
      replyTo: joinEmailAddresses(params.replyTo),
      subject: params.subject,
      text: params.text,
      html: params.html,
      attachments: [...params.attachments, ...params.multipleAttachments],
    });

    return Promise.resolve({ data: result });
  },
});

export default { sendEmail };
