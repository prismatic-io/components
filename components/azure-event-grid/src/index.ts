import { component } from "@prismatic-io/spectral";
import triggers from "./triggers";
import connections from "./connections";
import actions from "./actions";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/http";

export default component({
  key: "azure-event-grid",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/azure-event-grid/",
  display: {
    label: "Azure Event Grid",
    category: "Application Connectors",
    description:
      "Publish events to Azure Event Grid, manage event subscriptions, and receive Event Grid events with a webhook trigger.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
