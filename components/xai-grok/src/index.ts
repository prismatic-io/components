import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "xai-grok",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/xai-grok/",
  display: {
    label: "xAI Grok",
    description:
      "xAI Grok is an AI-powered component that provides advanced chat and image generation capabilities.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  hooks: { error: handleErrors },
  dataSources,
  connections,
});
