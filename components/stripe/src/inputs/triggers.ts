import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

export const pollEventTypes = input({
  label: "Event Types",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Stripe event types to poll for (e.g., `customer.created`, `invoice.paid`). Leave empty to include all event types. See [Stripe event types](https://docs.stripe.com/api/events/types).",
  example: "customer.created",
  placeholder: "Enter event type",
  clean: (raw: unknown): string[] | undefined => {
    if (!Array.isArray(raw) || raw.length === 0) return undefined;
    return raw.map((item) => util.types.toString(item));
  },
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

export const pollChangesInputs = {
  connection: connectionInput,
  pollEventTypes,
  showNewRecords,
  showUpdatedRecords,
};
