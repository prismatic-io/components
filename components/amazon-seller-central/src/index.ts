import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "amazon-seller-central",
  public: true,
  documentationUrl:
    "https://prismatic.io/docs/components/amazon-seller-central/",
  display: {
    label: "Amazon Seller Central",
    description:
      "Manage product listings, orders, inventory, and fulfillment in Amazon Seller Central.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
