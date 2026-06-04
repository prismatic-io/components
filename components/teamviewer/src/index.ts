import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
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
    description: "Connect to TeamViewer to automate your remote support tasks.",
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
