import { component } from "@prismatic-io/spectral";
import actions from "./actions/index";
import triggers from "./triggers";
import dataSources from "./dataSources";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "adobe-acrobat-sign",
  documentationUrl: "https://prismatic.io/docs/components/adobe-acrobat-sign/",
  public: true,
  display: {
    category: "Application Connectors",
    label: "Adobe Acrobat Sign",
    description:
      "Adobe Acrobat Sign is an e-signature management solution. " +
      "Use the Adobe Acrobat Sign component to send, sign, track, " +
      "and manage the signature process.",
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
