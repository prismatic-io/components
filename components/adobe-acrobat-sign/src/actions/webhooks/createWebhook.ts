import { action } from "@prismatic-io/spectral";
import { createWebhookInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { ProblemNotificationEmails, WebhookPayload } from "../../types";
import { reduceConditionsArrayIntoObject } from "../../util";
import { createWebhookExamplePayload } from "../../examplePayloads";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a webhook for the authenticated user.",
  },
  inputs: createWebhookInputs,
  perform: async (
    context,
    {
      webhookApplicationDisplayName,
      webhookApplicationName,
      webhookName,
      webhookUrlInfo,
      webhookResourceType,
      webhookSubscriptionEvents,
      scope,
      webhookResourceId,
      webhookProblemNotificationEmails,
      connection,
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
      state: "ACTIVE",
      webhookSubscriptionEvents,
      webhookUrlInfo: {
        url: webhookUrlInfo,
      },
      applicationDisplayName: webhookApplicationDisplayName,
      applicationName: webhookApplicationName,
      resourceType: webhookResourceType,
      resourceId: webhookResourceId,
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

    const { data } = await client.post("/webhooks", payload);

    return {
      data,
    };
  },
  examplePayload: createWebhookExamplePayload,
});
