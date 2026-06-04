import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
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
      "SAP SuccessFactors is a human resources platform that provides cloud-based solutions to manage various HR functions such as business alignment, people performance, recruitment, and learning activities.",
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
