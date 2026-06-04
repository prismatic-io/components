import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import dataSources from "./dataSources";
import triggers from "./triggers";
import { googleConnection } from "./connections";

export default component({
  key: "google-content-shopping",
  public: true,
  documentationUrl:
    "https://prismatic.io/docs/components/google-content-shopping/",
  display: {
    label: "Google Shopping",
    description:
      "Manage products, inventory, and orders in Google Merchant Center.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  triggers,
  connections: [googleConnection],
});
