import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/http";
import dataSources from "./dataSources";

export default component({
  key: "salesforce",
  documentationUrl: "https://prismatic.io/docs/components/salesforce/",
  public: true,
  display: {
    label: "Salesforce",
    description:
      "Query and manage Salesforce CRM records, bulk jobs, metadata, users, and flows, and react to record changes with outbound message and polling triggers.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  dataSources,
  hooks: { error: handleErrors },
  connections,
});
