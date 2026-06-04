import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "domo",
  public: true,
  display: {
    label: "Domo",
    category: "Application Connectors",
    description:
      "Manage datasets, streams, users, groups, pages, and projects in Domo.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
  documentationUrl: "https://prismatic.io/docs/components/domo/",
  hooks: {
    error: handleErrors,
  },
});
