import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
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
      "Generate chat completions and images, and list available models, with the xAI Grok API.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  hooks: { error: handleErrors },
  dataSources,
  connections,
});
