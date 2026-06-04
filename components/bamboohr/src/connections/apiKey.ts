import { connection } from "@prismatic-io/spectral";

export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key.",
  },
  comments: "Authenticate with BambooHR using an API key",
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The BambooHR API key used to authenticate requests. Generate this in the BambooHR account settings.",
    },
    companyDomain: {
      label: "Company Domain",
      placeholder: "Enter company domain",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The MYCOMPANY portion of the https://MYCOMPANY.bamboohr.com instance URL.",
    },
  },
});
