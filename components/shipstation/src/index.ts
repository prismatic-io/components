import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "shipstation",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/shipstation/",
  display: {
    category: "Application Connectors",
    label: "ShipStation",
    description: "Manage orders, shipments, and carriers in ShipStation.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
