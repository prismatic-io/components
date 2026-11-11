import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
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
    description:
      "Run Google Analytics 4 (GA4) Data API reports, list accounts and properties, and send Measurement Protocol events.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: { error: handleErrors },
});
