import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "paylocity",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/paylocity/",
  display: {
    label: "Paylocity",
    description:
      "Paylocity provides a comprehensive product suite and delivers a unified platform for the areas of benefits, core HR, payroll, talent, and workforce management. Use the Paylocity component to connect your workforce management, payroll, and other HR tasks with a variety of applications.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
