import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "Expensify",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/Expensify/",
  display: {
    label: "Expensify",
    description:
      "Manage Expensify reports, expenses, policies, expense rules, and employees, and export report data.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
