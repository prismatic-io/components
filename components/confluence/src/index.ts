import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/http";

export default component({
  key: "confluence",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/confluence/",
  display: {
    label: "Confluence",
    description:
      "Manage Confluence spaces, pages, attachments, and content properties, and react to new and updated pages and spaces.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  triggers,
  hooks: { error: handleErrors },
});
