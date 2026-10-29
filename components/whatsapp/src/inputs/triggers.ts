import { input, util } from "@prismatic-io/spectral";

const verifyToken = input({
  label: "Verify Token",
  comments: "The token that WhatsApp will use to verify the webhook.",
  type: "string",
  required: true,
  example: "meatyhamhock",
  placeholder: "Enter a verify token",
  clean: util.types.toString,
});

const appSecret = input({
  label: "App Secret",
  comments: "The secret that WhatsApp will use to sign the webhook payloads.",
  type: "password",
  required: true,
  example: "6a321a12a123456789abc54321f12a12",
  placeholder: "Enter an app secret",
  clean: util.types.toString,
});

export const webhookInputs = { verifyToken, appSecret };
