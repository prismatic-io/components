import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import dataSources from "./dataSources";

export default component({
  key: "deepseek",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/deepseek/",
  display: {
    label: "DeepSeek",
    description:
      "Generate chat completions and manage models with DeepSeek AI.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
