import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "servicenow",
  documentationUrl: "https://prismatic.io/docs/components/servicenow/",
  public: true,
  display: {
    label: "ServiceNow",
    description:
      "Manage ServiceNow table records, incidents, configuration items, users, attachments, and knowledge articles, and react to new and updated records with a polling trigger.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  triggers,
  hooks: { error: handleErrors },
});
