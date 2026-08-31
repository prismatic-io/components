import { input, util } from "@prismatic-io/spectral";
import { cleanStringListInput } from "../util";
import { connectionInput } from "./common";
import {
  disableWebhookValidation,
  webhookEvents,
  webhookSecret,
} from "./webhooks";
export const pollEventTypes = input({
  label: "Event Types",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Stripe event types to poll for (e.g., `customer.created`, `invoice.paid`). Leave empty to include all event types. See [Stripe event types](https://docs.stripe.com/api/events/types).",
  example: "customer.created",
  placeholder: "Enter event type",
  clean: cleanStringListInput,
});
export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, events with type ending in `.created` are emitted in the `created` bucket of the payload.",
  clean: util.types.toBool,
});
export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, all other change events (e.g., `.updated`, `.deleted`, `.succeeded`) are emitted in the `updated` bucket of the payload.",
  clean: util.types.toBool,
});
export const instanceDeployWebhookInputs = {
  webhookEvents,
  connection: connectionInput,
  disableWebhookValidation,
  webhookSecret: {
    ...webhookSecret,
    comments:
      "The signing secret used to verify incoming signatures. Leave empty to use the secret of the endpoint created when the instance was deployed. Supply it only when the deployment reused a pre-existing endpoint, since Stripe returns a signing secret only when an endpoint is created. The secret is available on the endpoint's page in the Stripe dashboard.",
  },
};
export const pollChangesInputs = {
  connection: connectionInput,
  pollEventTypes,
  showNewRecords,
  showUpdatedRecords,
};
