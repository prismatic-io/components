import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "guru",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/guru/",
  display: {
    label: "Guru",
    description:
      "Manage cards, collections, and folders in the Guru knowledge management platform.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
