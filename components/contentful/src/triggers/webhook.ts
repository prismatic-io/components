import { trigger } from "@prismatic-io/spectral";
import { connection } from "../inputs";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Contentful for webhooks you configure.",
  },
  perform: async (_context, payload) => {
    
    return { payload };
  },
  inputs: {
    connection,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
