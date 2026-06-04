export * from "./contacts";
export * from "./customFields";
export * from "./lists";
import type { PersonalizationData } from "@sendgrid/helpers/classes/personalization";
import { action, util } from "@prismatic-io/spectral";
import { createMailClient } from "../client";
import {
  to,
  cc,
  bcc,
  fromEmail,
  fromName,
  replyToEmail,
  replyToName,
  subject,
  text,
  html,
  connectionInput,
  personalizations,
  disposition,
  fileName,
  fileType,
  content,
  contentId,
  multipleAttachments,
  subscriptionTracking,
  templateId,
  dynamicTemplateData,
} from "../inputs";
import { createPayload } from "../payload";
import type {
  MailData,
  TrackingSettings,
} from "@sendgrid/helpers/classes/mail";

export const sendEmail = action({
  display: {
    label: "Send Email",
    description: "Send a single email to one or more recipients",
  },
  perform: async (
    _context,
    {
      to,
      cc,
      bcc,
      subject,
      text,
      html,
      sendGridConnection,
      personalizations,
      fromEmail,
      fromName,
      replyToEmail,
      replyToName,
      content,
      disposition,
      fileName,
      fileType,
      contentId,
      multipleAttachments,
      subscriptionTracking,
    },
  ) => {
    if (fromName && !fromEmail) {
      throw new Error(
        "If you want to include the 'Reply To' property, you must supply a 'Reply To' email.",
      );
    }
    const fileData = content.data.toString("base64");

    if ((fileData && !fileName) || (!fileData && fileName)) {
      throw new Error(
        "Missing required field. Please provide a File Name and Attachment Content.",
      );
    }

    const trackingSettings: TrackingSettings = {};
    trackingSettings.subscriptionTracking = {
      enable: subscriptionTracking,
    };

    const sendGrid = createMailClient(sendGridConnection);

    const attachments = [];

    if (fileData)
      attachments.push({
        content: fileData,
        disposition,
        filename: fileName,
        type: fileType,
        content_id: contentId,
      });

    if (multipleAttachments) attachments.push(...multipleAttachments);

    const payload = createPayload({
      to,
      cc,
      bcc,
      from: {
        email: fromEmail,
        name: fromName,
      },
      subject,
      text,
      html,
      replyTo:
        replyToEmail || replyToName
          ? {
              email: replyToEmail,
              name: replyToName,
            }
          : undefined,
      personalizations: personalizations as unknown as PersonalizationData[],
      attachments: attachments.length ? attachments : undefined,
      trackingSettings,
    });
    try {
      
      const result = await sendGrid.send(payload);
      return {
        data: result,
      };
    } catch (error) {
      throw new Error(util.types.toString(error));
    }
  },
  inputs: {
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
  },

  examplePayload: {
    data: [{ body: { message: "Example" }, statusCode: 200, headers: {} }, {}],
  },
});

export const sendMultipleEmails = action({
  display: {
    label: "Send Multiple Emails",
    description: "Send a separate email to each recipient",
  },
  perform: async (
    _context,
    {
      to,
      cc,
      bcc,
      subject,
      text,
      html,
      sendGridConnection,
      personalizations,
      fromEmail,
      fromName,
      replyToEmail,
      replyToName,
      content,
      disposition,
      fileName,
      fileType,
      contentId,
      multipleAttachments,
    },
  ) => {
    if (fromName && !fromEmail) {
      throw new Error(
        "If you want to include the 'Reply To' property, you must supply a 'Reply To' email.",
      );
    }
    const fileData = content.data.toString("base64");

    if ((fileData && !fileName) || (!fileData && fileName)) {
      throw new Error(
        "Missing required field. Please provide a File Name and Attachment Content.",
      );
    }

    const sendGrid = createMailClient(sendGridConnection);

    const attachments = [];

    if (fileData)
      attachments.push({
        content: fileData,
        disposition,
        filename: fileName,
        type: fileType,
        content_id: contentId,
      });

    if (multipleAttachments) attachments.push(...multipleAttachments);

    const payload = createPayload({
      to,
      cc,
      bcc,
      from: {
        email: fromEmail,
        name: fromName,
      },
      subject,
      text,
      html,
      replyTo:
        replyToEmail || replyToName
          ? {
              email: replyToEmail,
              name: replyToName,
            }
          : undefined,
      personalizations: personalizations as unknown as PersonalizationData[],
      attachments: attachments.length ? attachments : undefined,
    });
    try {
      const result = await sendGrid.sendMultiple(payload);
      return {
        data: result,
      };
    } catch (error) {
      throw new Error(util.types.toString(error));
    }
  },
  inputs: {
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
  },

  examplePayload: {
    data: [{ body: { message: "Example" }, statusCode: 200, headers: {} }, {}],
  },
});

export const sendEmailWithDynamicTemplate = action({
  display: {
    label: "Send Email with Dynamic Template",
    description:
      "Send an email using a SendGrid dynamic template with complex nested JSON data",
  },
  inputs: {
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
  },
  perform: async (
    context,
    {
      sendGridConnection,
      templateId,
      dynamicTemplateData,
      to,
      fromEmail,
      fromName,
      cc,
      bcc,
      replyToEmail,
      replyToName,
      personalizations,
    },
  ) => {
    const sendGrid = createMailClient(sendGridConnection);

    if ((!personalizations || personalizations.length === 0) && !to) {
      throw new Error(
        "Either 'To' recipients or 'Personalizations' array must be provided. Provide email addresses in 'To' field for simple sends, or use 'Personalizations' for advanced configurations.",
      );
    }

    if (personalizations && personalizations.length > 0 && (to || cc || bcc)) {
      context.logger.warn(
        "Personalizations array is provided, ignoring 'To', 'CC', and 'BCC' individual inputs. Recipients should be defined within the personalizations array.",
      );
    }

    let personalizationsArray = [];

    if (personalizations && personalizations.length > 0) {
      personalizationsArray = personalizations.map((p) => ({
        ...p,
        dynamicTemplateData: dynamicTemplateData,
      }));
    } else if (to) {
      const toRecipients = to.split(",").map((email: string) => ({
        email: email.trim(),
      }));

      const personalization: PersonalizationData = {
        to: toRecipients,
        dynamicTemplateData: dynamicTemplateData,
      };

      if (cc) {
        personalization.cc = cc.split(",").map((email: string) => ({
          email: email.trim(),
        }));
      }

      if (bcc) {
        personalization.bcc = bcc.split(",").map((email: string) => ({
          email: email.trim(),
        }));
      }

      personalizationsArray = [personalization];
    }

    const payloadParameters: MailData = {
      templateId,
      personalizations: personalizationsArray,
      from: {
        email: fromEmail,
        ...(fromName && { name: fromName }),
      },
    };

    if (!replyToEmail && replyToName) {
      throw new Error(
        "If you want to include the 'Reply To Name' property, you must supply a 'Reply To Email' value.",
      );
    }

    if (replyToEmail) {
      payloadParameters.replyTo = {
        email: replyToEmail,
        ...(replyToName && { name: replyToName }),
      };
    }

    const payload = createPayload(payloadParameters);

    try {
      const result = await sendGrid.send(payload);
      return {
        data: result,
      };
    } catch (error) {
      throw new Error(util.types.toString(error));
    }
  },
  examplePayload: {
    data: [
      {
        body: { message: "Email sent successfully" },
        statusCode: 202,
        headers: {},
      },
      {},
    ],
  },
});
