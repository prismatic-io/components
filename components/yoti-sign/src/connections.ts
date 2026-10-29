import { connection } from "@prismatic-io/spectral";
import { environment } from "./inputs";

export const yotiSignConnection = connection({
  key: "apiKey",
  display: {
    label: "API Key Connection",
    description: "The connection to the Yoti API",
  },
  inputs: {
    baseUrl: environment,
    apiKey: {
      label: "API Key",
      placeholder: "",
      type: "password",
      required: true,
      comments: "The Yoti API Key",
    },
  },
});

export default [yotiSignConnection];
