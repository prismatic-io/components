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
      "Adobe I/O Events notifies you when changes occur. Use the Adobe I/O Events component to easily integrate events into your applications using Webhooks.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  triggers,
});
