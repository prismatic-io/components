import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "pdq",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/pdq/",
  display: {
    label: "PDQ",
    description: "Manage deployments, devices, groups, and packages in PDQ.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
});
