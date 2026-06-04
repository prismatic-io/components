import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import triggerActions from "./actions/triggers";
import webhookActions from "./actions/webhooks";
import connections from "./connections";
import triggers from "./triggers";
import dataSources from "./dataSources";

export default component({
  key: "zendesk",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/zendesk/",
  display: {
    label: "Zendesk",
    category: "Application Connectors",
    description: "Manage tickets and users in Zendesk.",
    iconPath: "icon.png",
  },
  actions: {
    ...actions,
    ...triggerActions,
    ...webhookActions,
  },
  connections,
  triggers,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
