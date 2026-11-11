import { component } from "@prismatic-io/spectral";
import actions from "./actions/index";
import triggers from "./triggers";
import dataSources from "./dataSources";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/http";

export default component({
  key: "adobe-acrobat-sign",
  documentationUrl: "https://prismatic.io/docs/components/adobe-acrobat-sign/",
  public: true,
  display: {
    category: "Application Connectors",
    label: "Adobe Acrobat Sign",
    description:
      "Manage Adobe Acrobat Sign agreements, transient documents, users, groups, and webhooks, and react to new and updated agreements.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
});
