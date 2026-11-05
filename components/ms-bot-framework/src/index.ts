import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "ms-bot-framework",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-bot-framework/",
  display: {
    label: "Microsoft Bot Framework",
    description: "Manage conversations, messages, and activities in Microsoft Bot Framework.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
});
