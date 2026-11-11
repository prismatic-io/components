import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections/index";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "bynder",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/bynder/",
  display: {
    label: "Bynder",
    category: "Application Connectors",
    description:
      "Manage Bynder assets, collections, campaigns, jobs, orders, and users, and upload new assets or asset versions.",
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
