import { component } from "@prismatic-io/spectral";
import connections from "./connections";
import actions from "./actions";
import dataSources from "./dataSources";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "notion",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/notion/",
  display: {
    category: "Application Connectors",
    label: "Notion",
    description: "Manage Notion pages, databases, and users",
    iconPath: "icon.png",
  },
  actions,
  connections,
  dataSources,
  triggers,
  hooks: { error: handleErrors },
});
