import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "sage-200",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/sage-200/",
  display: {
    label: "Sage 200",
    description:
      "Manage customers, contacts, delivery addresses, products, price bands, sales orders, and sales invoices in Sage 200.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: { error: handleErrors },
});
