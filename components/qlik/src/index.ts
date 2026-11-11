import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "qlik",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/qlik/",
  display: {
    label: "Qlik",
    description:
      "Manage Qlik Cloud apps, spaces, data sets, data assets, data files, data stores, and reports, and react to new and updated records with a polling trigger.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
