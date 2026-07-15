import { action, util } from "@prismatic-io/spectral";
import type { MailData } from "@sendgrid/helpers/classes/mail";
import type { PersonalizationData } from "@sendgrid/helpers/classes/personalization";
import { createMailClient } from "../../client";
import { sendEmailWithDynamicTemplateExamplePayload } from "../../examplePayloads";
import { sendEmailWithDynamicTemplateInputs } from "../../inputs";
import { createPayload } from "../../util";
export const sendEmailWithDynamicTemplate = action({
  display: {
    label: "Send Email with Dynamic Template",
    description:
      "Sends an email using a SendGrid dynamic template with complex nested JSON data.",
  },
  inputs: sendEmailWithDynamicTemplateInputs,
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
  examplePayload: sendEmailWithDynamicTemplateExamplePayload,
});
