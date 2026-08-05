import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";
export default component({
  key: "servicetitan",
  documentationUrl: "https://prismatic.io/docs/components/servicetitan/",
  public: true,
  display: {
    label: "ServiceTitan",
    description:
      "Manage jobs, customers, invoices, and technicians in ServiceTitan.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
