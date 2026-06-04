import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "adobe-commerce-magento",
  documentationUrl: "https://prismatic.io/docs/components/adobe-commerce-magento/",
  public: true,
  display: {
    label: "Adobe Commerce Magento",
    description:
      "Adobe Commerce (Magento) is an open-source e-commerce platform. Use the Adobe Commerce component to manage your Products, Orders, Customers, and Transactions.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  dataSources,
  connections,
});
