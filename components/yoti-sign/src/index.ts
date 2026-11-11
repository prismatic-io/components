import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "yoti-sign",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/yoti-sign/",
  display: {
    label: "Yoti Sign",
    description:
      "Retrieve Yoti Sign identity verification session results and media, and react to new signature envelopes with a polling trigger.",
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
