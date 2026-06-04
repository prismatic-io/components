import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "shipbob",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/shipbob/",
  display: {
    label: "ShipBob",
    description:
      "Shipbob offers an end to end fulfillment services for Ecommerce vendors.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
  dataSources,
});
