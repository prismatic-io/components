import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "google-cloud-pub-sub",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/google-cloud-pub-sub/",
  display: {
    label: "Google Cloud Pub/Sub",
    description: "Manage topics, subscriptions, and messages in Google Cloud Pub/Sub.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
