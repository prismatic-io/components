import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import dataSources from "./dataSources";
import connections from "./connections";
import triggers from "./triggers";

export default component({
  key: "sap-business-one",
  public: true,
  display: {
    label: "SAP Business One",
    description:
      "Manage business partners, orders, inventory, and financial data in SAP Business One.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  documentationUrl: "https://prismatic.io/docs/components/sap-business-one/",
  actions,
  triggers,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
});
