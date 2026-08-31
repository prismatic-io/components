import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "box",
  documentationUrl: "https://prismatic.io/docs/components/box/",
  public: true,
  display: {
    label: "Box",
    description: "Manage files stored in Box",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  connections,
  triggers,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
