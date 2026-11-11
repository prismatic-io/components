import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
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
      "Manage invoices, customers, items, purchase orders, sales and refund receipts, and attachments in QuickBooks Online, and query any accounting entity.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  hooks: { error: handleErrors },
  connections,
  dataSources,
});
