import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "adobe-commerce-magento",
  documentationUrl:
    "https://prismatic.io/docs/components/adobe-commerce-magento/",
  public: true,
  display: {
    label: "Adobe Commerce Magento",
    description:
      "Manage products, orders, customers, and transactions in an Adobe Commerce (Magento) store.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: { error: handleErrors },
});
