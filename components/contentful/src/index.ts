import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "contentful",
  documentationUrl: "https://prismatic.io/docs/components/contentful/",
  public: true,
  display: {
    label: "Contentful",
    description:
      "Manage spaces, environments, entries, assets, and organizations in Contentful",
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
