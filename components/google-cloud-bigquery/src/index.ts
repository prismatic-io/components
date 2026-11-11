import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import googleConnections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "google-cloud-bigquery",
  public: true,
  documentationUrl:
    "https://prismatic.io/docs/components/google-cloud-bigquery/",
  display: {
    label: "Google Cloud BigQuery",
    description:
      "Manage datasets, tables, jobs, routines, and models in Google Cloud BigQuery, and retrieve query job results.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections: googleConnections,
  dataSources,
});
