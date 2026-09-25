import { connectionInput } from "./common";
import {
  allowDuplicates,
  webhookId,
  webhookTriggerConditions,
  webhookTriggerMessageBody,
  webhookTriggerTitle,
} from "./webhooks";
export const createWebhookTriggerInputs = {
  connection: connectionInput,
  title: webhookTriggerTitle,
  webhookId: {
    ...webhookId,
    comments: "The unique identifier for the webhook this trigger fires.",
    example: "01GK7R2DBS16XB76SPDEXAMPLE",
  },
  messageBody: webhookTriggerMessageBody,
  conditions: webhookTriggerConditions,
  allowDuplicates: {
    ...allowDuplicates,
    comments: "Allow a duplicate trigger with the same title to be created?",
  },
};
export const listTriggersInputs = { connection: connectionInput };
