import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "anthropic",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/anthropic/",
  display: {
    label: "Anthropic",
    description: "Generate chat responses and completions using Anthropic's Claude models.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  dataSources,
});
