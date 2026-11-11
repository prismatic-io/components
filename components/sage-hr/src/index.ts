import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import { apiKey } from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "sage-hr",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/sage-hr/",
  display: {
    label: "Sage HR",
    description:
      "Manage Sage HR employees, documents, projects, teams, positions, and time off requests, and react to new records with a polling trigger.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections: [apiKey],
  dataSources,
  hooks: { error: handleErrors },
});
