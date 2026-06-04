import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "zendesk-sell",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/zendesk-sell/",
  display: {
    category: "Application Connectors",
    label: "Zendesk Sell",
    description: "Manage leads, contacts, and deals in Zendesk Sell.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
