import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "asana",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/asana/",
  display: {
    category: "Application Connectors",
    label: "Asana",
    description: "Manage users, projects, and teams in an Asana workspace.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  dataSources,
  hooks: { error: handleErrors },
  connections,
});
