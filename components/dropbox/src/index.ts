import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "dropbox",
  documentationUrl: "https://prismatic.io/docs/components/dropbox/",
  public: true,
  display: {
    label: "Dropbox",
    description: "Manage files stored in Dropbox",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
