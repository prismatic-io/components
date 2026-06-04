import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";

export default component({
  key: "adp-workforce-now",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/adp-workforce-now/",
  display: {
    label: "ADP Workforce Now",
    description:
      "Manage applicants, workers, and payroll data in ADP Workforce Now.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
