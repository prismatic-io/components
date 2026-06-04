import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "google-analytics-ga4",
  documentationUrl: "https://prismatic.io/docs/components/google-analytics-ga4/",
  public: true,
  display: {
    label: "Google Analytics - GA4",
    category: "Application Connectors",
    description: "Manage Google Analytics GA4 accounts and data",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: { error: handleErrors },
});
