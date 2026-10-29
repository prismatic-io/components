import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ukg-pro",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ukg-pro/",
  display: {
    label: "UKG Pro",
    description: "Manage employees, payroll, and talent onboarding in UKG Pro.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  triggers,
  hooks: {
    error: handleErrors,
  },
});
