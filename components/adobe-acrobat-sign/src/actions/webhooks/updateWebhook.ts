import { action } from "@prismatic-io/spectral";
import { updateWebhookInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { ProblemNotificationEmails, WebhookPayload } from "../../types";
import { reduceConditionsArrayIntoObject } from "../../util";
import { updateWebhookExamplePayload } from "../../examplePayloads";

export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Updates a webhook.",
  },
  inputs: updateWebhookInputs,
  perform: async (
    context,
    {
      webhookApplicationDisplayName,
      webhookApplicationName,
      webhookName,
      webhookUrlInfo,
      webhookSubscriptionEvents,
      webhookProblemNotificationEmails,
      connection,
      webhookId,
      scope,
      webhookAgreementEvents,
      webhookLibraryDocumentEvents,
      webhookMegaSignEvents,
      webhookWidgetEvents,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const payload: WebhookPayload = {
      name: webhookName,
      scope,
      webhookSubscriptionEvents,
      webhookUrlInfo: {
        url: webhookUrlInfo,
      },
      applicationDisplayName: webhookApplicationDisplayName,
      applicationName: webhookApplicationName,
      problemNotificationEmails:
        webhookProblemNotificationEmails as ProblemNotificationEmails[],
      webhookConditionalParams: {
        webhookAgreementEvents: reduceConditionsArrayIntoObject(
          webhookAgreementEvents,
        ),
        webhookWidgetEvents:
          reduceConditionsArrayIntoObject(webhookWidgetEvents),
        webhookMegaSignEvents: reduceConditionsArrayIntoObject(
          webhookMegaSignEvents,
        ),
        webhookLibraryDocumentEvents: reduceConditionsArrayIntoObject(
          webhookLibraryDocumentEvents,
        ),
      },
    };

    const { data } = await client.put(`/webhooks/${webhookId}`, payload);
    return {
      data,
    };
  },
  examplePayload: updateWebhookExamplePayload,
});
