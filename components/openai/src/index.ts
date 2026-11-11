import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
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
    description:
      "Create chat completions, responses, and images with OpenAI models, manage files, and build agents with tools, MCP servers, and human approvals.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  dataSources,
  triggers,
});
