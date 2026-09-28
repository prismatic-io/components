import { trigger } from "@prismatic-io/spectral";
import { myTriggerInputs } from "../inputs";
export const myTrigger = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive webhook requests from Adobe Commerce for webhooks you configure.",
  },
  perform: async (context, payload, params) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: myTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
