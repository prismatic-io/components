import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "azure-openai-service",
  public: true,
  documentationUrl:
    "https://prismatic.io/docs/components/azure-openai-service/",
  display: {
    label: "Azure OpenAI Service",
    description:
      "Generate completions and images using Azure OpenAI Service or OpenAI API.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  dataSources,
});
