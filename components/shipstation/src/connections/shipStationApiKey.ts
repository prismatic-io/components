import { connection } from "@prismatic-io/spectral";

export const shipStationConnection = connection({
  key: "shipStationApiKey",
  display: {
    label: "API Key",
    description: "Authenticate using an API key and secret.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API key",
      type: "password",
      required: true,
      shown: true,
      comments: "The API key from the ShipStation account settings.",
    },
    apiSecret: {
      label: "API Secret",
      placeholder: "Enter API secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The API secret from the ShipStation account settings.",
    },
  },
});
