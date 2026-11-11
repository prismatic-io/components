import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "workday",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/workday/",
  display: {
    label: "Workday (Beta)",
    description:
      "Manage Workday workers, people, organizations, job changes, time off, supplier invoices, and payments, run RaaS reports and WQL queries, and react to data changes.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
