import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "google-ads",
  documentationUrl: "https://prismatic.io/docs/components/google-ads/",
  public: true,
  display: {
    label: "Google Ads",
    description:
      "Manage campaigns, conversions, customers, and local services in Google Ads.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  connections,
  dataSources,
  actions,
  triggers,
});
