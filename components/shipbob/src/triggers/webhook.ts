import { trigger } from "@prismatic-io/spectral";
import { webhookPerformFunction } from "../util";

export const webhook = trigger({
  display: {
    label: " Webhook ",
    description:
      "Receive and validate webhook requests from ShipBob for webhooks you configure.",
  },
  perform: webhookPerformFunction,
  inputs: {},
  synchronousResponseSupport: "valid",
  scheduleSupport: "valid",
});
