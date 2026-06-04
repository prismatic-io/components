import { component } from "@prismatic-io/spectral";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import triggers from "./triggers";
import dataSources from "./actions/datasources";

export default component({
  key: "ms-sharepoint",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-sharepoint/",
  display: {
    category: "Application Connectors",
    label: "Microsoft SharePoint",
    description: "Manage sites, drives, files, and lists in Microsoft SharePoint.",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
  dataSources,
});
