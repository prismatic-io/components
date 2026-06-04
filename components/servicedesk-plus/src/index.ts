import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "servicedesk-plus",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/servicedesk-plus/",
  display: {
    label: "ServiceDesk Plus",
    description:
      "ServiceDesk Plus is a comprehensive service desk software that offers a suite of IT Service management, IT asset management, CBDM, and more.",
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
