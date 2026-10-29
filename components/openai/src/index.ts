import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "openai",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/openai/",
  display: {
    label: "OpenAI",
    description: "Interact with OpenAI's models and build AI Agents",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  dataSources,
  triggers,
});
