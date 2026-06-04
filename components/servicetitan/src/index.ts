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
      "ServiceTitan is a comprehensive field service management solution that helps businesses manage their operations, workforce, and customer service.",
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
