import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "yoti-sign",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/yoti-sign/",
  display: {
    label: "Yoti Sign",
    description:
      "Yoti Sign is a digital identity and e-signature solution that allows users to verify their identity and sign documents electronically and securely.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
