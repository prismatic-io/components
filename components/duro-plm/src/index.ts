import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "duro-plm",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/duro-plm/",
  display: {
    label: "Duro PLM",
    description: "Manage products, components, and change orders in Duro PLM.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
  dataSources,
});
