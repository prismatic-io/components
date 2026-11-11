import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "sap-successfactors",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/sap-successfactors/",
  display: {
    label: "SAP SuccessFactors",
    description:
      "Manage SAP SuccessFactors candidates, job requisitions, job applications, onboarding candidate info, and other OData entity records.",
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
