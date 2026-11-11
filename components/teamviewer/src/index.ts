import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "teamviewer",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/teamviewer/",
  display: {
    label: "TeamViewer",
    description:
      "Manage TeamViewer devices, managed devices, groups, contacts, users, and remote support sessions, and react to new records with a polling trigger.",
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
