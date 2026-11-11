import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import { googleConnection } from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "google-content-shopping",
  public: true,
  documentationUrl:
    "https://prismatic.io/docs/components/google-content-shopping/",
  display: {
    label: "Google Shopping",
    description:
      "Manage Google Merchant Center accounts, products, orders, and returns through the Merchant API and the legacy Content API for Shopping v2.1.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  triggers,
  connections: [googleConnection],
  hooks: {
    error: handleErrors,
  },
});
