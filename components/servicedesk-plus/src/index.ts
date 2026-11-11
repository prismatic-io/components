import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "servicedesk-plus",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/servicedesk-plus/",
  display: {
    label: "ServiceDesk Plus",
    description:
      "Manage ServiceDesk Plus requests, problems, tasks, notes, assets, products, and configuration items, and react to new records with a polling trigger.",
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
