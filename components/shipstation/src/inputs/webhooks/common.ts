import { input, util } from "@prismatic-io/spectral";
import { WEBHOOK_EVENTS } from "../../constants";
import { cleanStringInput } from "../../util";

export const targetUrlInput = input({
  label: "Target URL",
  type: "string",
  required: true,
  comments: "The URL where webhook events will be sent.",
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});

export const eventInput = input({
  label: "Event",
  type: "string",
  required: true,
  comments: "The webhook event type to subscribe to.",
  model: WEBHOOK_EVENTS,
  clean: util.types.toString,
});

export const storeIdWebhookInput = input({
  label: "Store ID",
  type: "string",
  required: false,
  comments:
    "The store ID to filter webhook triggers. When provided, webhooks will only trigger for this store.",
  placeholder: "Enter store ID",
  dataSource: "selectStores",
  clean: cleanStringInput,
});

export const friendlyNameInput = input({
  label: "Friendly Name",
  type: "string",
  required: false,
  comments: "A descriptive label to identify the webhook in the dashboard.",
  placeholder: "Enter friendly name",
  clean: cleanStringInput,
});

export const webhookIdInput = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the webhook.",
  placeholder: "Enter webhook ID",
  dataSource: "selectWebhooks",
  clean: util.types.toString,
});

export const webhookEventInput = input({
  label: "Webhook Event",
  type: "string",
  required: true,
  comments: "The event type to subscribe to for webhook notifications.",
  model: WEBHOOK_EVENTS,
  clean: util.types.toString,
});
