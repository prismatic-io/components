import { connection } from "@prismatic-io/spectral";

export const twilioApiKeyConnection = connection({
  key: "apiKeySecret",

  display: {
    label: "API Key",
    description: "Authenticate requests to Twilio using an API key and secret.",
  },
  inputs: {
    accountSid: {
      label: "Account SID",
      placeholder: "Enter Account SID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Twilio Account SID (starts with AC).",
      example: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    apiKey: {
      label: "API Key SID",
      placeholder: "Enter API Key SID",
      type: "string",
      required: true,
      shown: true,
      comments: "The API Key SID (starts with SK).",
      example: "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    apiSecret: {
      label: "API Key Secret",
      placeholder: "Enter API Key Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The API secret generated when the API key was created.",
    },
  },
});

export const twilioBasicConnection = connection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description: "Authenticate requests to Twilio using an Account SID and Auth Token.",
  },
  inputs: {
    username: {
      label: "Account SID",
      placeholder: "Enter Account SID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Twilio Account SID (starts with AC).",
      example: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    password: {
      label: "Auth Token",
      placeholder: "Enter Auth Token",
      type: "password",
      comments: "The Auth Token from the [Twilio Console](https://console.twilio.com/).",
      required: true,
      shown: true,
    },
  },
});

export default [twilioApiKeyConnection, twilioBasicConnection];
