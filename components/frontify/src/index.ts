import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "frontify",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/frontify/",
  display: {
    label: "Frontify",
    description:
      "Manage Frontify brands, libraries, assets, collections, folders, and attachments, and react to new and updated assets.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  dataSources,
  connections,
});
