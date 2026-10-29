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
      "BigQuery is Google Cloud's fully managed, petabyte-scale, and cost-effective analytics data warehouse that lets you run analytics over vast amounts of data in near real time.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections: googleConnections,
  dataSources,
});
