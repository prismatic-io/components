import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import dataSources from "./dataSources";
import connections from "./connections";
import triggers from "./triggers";

export default component({
  key: "sage-intacct",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/sage-intacct/",
  display: {
    label: "Sage Intacct",
    category: "Application Connectors",
    description:
      "Manage financial data including invoices, payments, vendors, and customers in Sage Intacct.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
});
