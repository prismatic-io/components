import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "smartsheet",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/smartsheet/",
  display: {
    label: "Smartsheet",
    category: "Application Connectors",
    description:
      "Manage sheets, rows, and workspaces in the Smartsheet platform.",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  dataSources,
  connections,
});
