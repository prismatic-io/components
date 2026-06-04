import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ms-business-central",
  public: true,
  display: {
    category: "Application Connectors",
    label: "Microsoft Dynamics 365 Business Central",
    description:
      "Manage Sales Orders, Customers, Invoices, Vendors, and Shipments in Microsoft Dynamics 365 Business Central.",
    iconPath: "icon.png",
  },
  documentationUrl: "https://prismatic.io/docs/components/ms-business-central/",
  actions,
  triggers,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
});
