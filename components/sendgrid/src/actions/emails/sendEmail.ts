import { action, util } from "@prismatic-io/spectral";
import type { TrackingSettings } from "@sendgrid/helpers/classes/mail";
import type { PersonalizationData } from "@sendgrid/helpers/classes/personalization";
import { createMailClient } from "../../client";
import { sendEmailExamplePayload } from "../../examplePayloads";
import { sendEmailInputs } from "../../inputs";
import { createPayload } from "../../util";
export const sendEmail = action({
  display: {
    label: "Send Email",
    description: "Sends a single email to one or more recipients.",
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
    const fileData = content?.data
      ? content.data.toString("base64")
      : undefined;
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
  inputs: sendEmailInputs,
  examplePayload: sendEmailExamplePayload,
});
