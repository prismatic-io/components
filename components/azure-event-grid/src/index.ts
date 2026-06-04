import { component } from "@prismatic-io/spectral";
import triggers from "./triggers";
import connections from "./connections";
import actions from "./actions";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "azure-event-grid",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/azure-event-grid/",
  display: {
    label: "Azure Event Grid",
    category: "Application Connectors",
    description:
      "Azure Event Grid is an event routing service that can be used to build event driven applications by distributing events from various sources to subscribers.",
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
