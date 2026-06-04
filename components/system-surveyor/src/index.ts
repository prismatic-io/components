import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ssv",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ssv/",
  display: {
    label: "System Surveyor",
    description: "Design and manage physical spaces in System Surveyor.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
