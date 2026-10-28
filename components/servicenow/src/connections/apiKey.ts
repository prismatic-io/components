import { connection } from "@prismatic-io/spectral";
export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description:
      "Authenticate using an API key sent in the x-sn-apikey header.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "API Key",
      type: "password",
      example:
        "now_ABCd12efG3hi456jKLmN7opQRs8tuVWxy9zAbCdEfGhIjKlMnOpQrStUvWxYz",
      required: true,
      shown: true,
      comments: "The API key generated from a ServiceNow REST API Key record",
    },
  },
});
