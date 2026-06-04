import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import dataSources from "./dataSources";
import connections from "./connections";
import triggers from "./triggers";

export default component({
  key: "klaviyo",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/klaviyo/",
  display: {
    label: "Klaviyo",
    description:
      "Klaviyo is a cloud based email marketing solution that enables e-commerce businesses to create, send, and analyze email and SMS campaigns.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  triggers,
  dataSources,
  connections,
});
