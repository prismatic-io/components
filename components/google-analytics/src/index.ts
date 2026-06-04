import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "google-analytics",
  documentationUrl: "https://prismatic.io/docs/components/google-analytics/",
  public: true,
  display: {
    label: "Google Analytics - UA",
    category: "Application Connectors",
    description: "Manage Google Analytics",
    iconPath: "icon.png",
  },
  dataSources,
  actions,
  connections,
});
