import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "sap-ecc",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/sap-ecc/",
  display: {
    label: "SAP ECC",
    description: "Send SOAP requests, call BAPIs, and manage IDocs in SAP ECC.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  connections,
  actions,
  dataSources,
  triggers,
  hooks: {
    error: handleErrors,
  },
});
