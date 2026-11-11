import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
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
      "Manage ShipBob orders, shipments, products, inventory, warehouse receiving orders, and webhooks, and react to order events with webhook and polling triggers.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
  dataSources,
});
