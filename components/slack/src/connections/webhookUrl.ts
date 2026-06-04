import { connection } from "@prismatic-io/spectral";

export const webhookUrlConnection = connection({
  key: "webhookUrl",
  display: {
    label: "Webhook URL",
    description: "Authenticate requests to Slack using a Webhook URL.",
  },
  comments: "Slack Webhook URL hosting",
  inputs: {
    webhookUrl: {
      label: "Webhook URL",
      placeholder: "Slack Webhook URL",
      type: "string",
      required: true,
      comments:
        "The Slack webhook URL. Instructions for generating a Slack webhook are available on the Slack component docs page.",
      example: "https://hooks.slack.com/services/TXXXX/BXXXXX/XXXXXXX",
    },
  },
});
