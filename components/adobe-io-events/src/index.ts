import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "adobe-io-events",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/adobe-io-events/",
  display: {
    label: "Adobe I/O Events",
    description:
      "Manage Adobe I/O Events providers and webhook or journal registrations, and receive Adobe events with a webhook trigger.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  triggers,
});
