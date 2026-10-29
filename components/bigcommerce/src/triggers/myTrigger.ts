import { trigger } from "@prismatic-io/spectral";
import { myTriggerExamplePayload } from "../examplePayloads";

export const myTrigger = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from BigCommerce for manually configured webhook subscriptions.",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: {},
  examplePayload: myTriggerExamplePayload,
  synchronousResponseSupport: "valid",
  scheduleSupport: "valid",
});
