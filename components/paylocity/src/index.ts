import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
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
      "Manage Paylocity employees, earnings, pay entries, pay statements, sensitive data, and employee documents, and react to new employees with a polling trigger.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
