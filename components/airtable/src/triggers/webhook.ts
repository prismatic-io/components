import { trigger } from "@prismatic-io/spectral";
import { webhookInputs } from "../inputs";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Airtable for manually configured webhook subscriptions.",
  },
  perform: async (context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  
});
