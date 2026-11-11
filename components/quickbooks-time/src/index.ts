import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "quickbooks-time",
  documentationUrl: "https://prismatic.io/docs/components/quickbooks-time/",
  public: true,
  display: {
    label: "QuickBooks Time",
    description:
      "Manage timesheets, users, and job codes in Intuit QuickBooks Time, and react to new records with a polling trigger.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
});
