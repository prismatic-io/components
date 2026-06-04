import { input, util } from "@prismatic-io/spectral";

export const postUrl = input({
  label: "Post URL",
  type: "string",
  example: "https://example.com/webhook",
  placeholder: "Enter webhook URL",
  required: true,
  comments:
    "The URL where the newly created webhook will post to. Used to configure the Shopify trigger.",
  clean: util.types.toString,
});

export const webhookFormat = input({
  label: "Webhook Format",
  type: "string",
  required: true,
  model: [
    { label: "JSON", value: "json" },
    { label: "XML", value: "xml" },
  ],
  default: "json",
  placeholder: "Select webhook format",
  comments: "The format for the webhook response.",
  clean: util.types.toString,
});

export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  example: "450789469",
  placeholder: "Enter webhook ID",
  comments: "The ID of an existing webhook.",
  clean: util.types.toNumber,
});
