import { WEBHOOK_EVENTS } from "../constants";

export const humanizeEventLabel = (event: string): string =>
  event
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");

export const webhookEventOptions = WEBHOOK_EVENTS.map((event) => ({
  label: humanizeEventLabel(event),
  value: event,
}));
