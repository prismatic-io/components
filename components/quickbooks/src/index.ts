import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "quickbooks",
  documentationUrl: "https://prismatic.io/docs/components/quickbooks/",
  public: true,
  display: {
    label: "QuickBooks",
    description:
      "Create and manage customers and invoices within Intuit QuickBooks",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  hooks: { error: handleErrors },
  connections,
  dataSources,
});
