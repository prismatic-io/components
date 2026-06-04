import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
export default component({
  key: "google-gemini",
  documentationUrl: "https://prismatic.io/docs/components/google-gemini/",
  public: true,
  display: {
    label: "Google Gemini",
    category: "Application Connectors",
    description:
      "Interact with Google Gemini AI models to generate text, images, videos, and manage chat conversations.",
    iconPath: "icon.png",
  },
  actions,
  connections,
  hooks: {
    error: handleErrors,
  },
  dataSources,
});
