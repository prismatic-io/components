import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "pipedrive",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/pipedrive/",
  display: {
    label: "Pipedrive",
    description: "Manage leads, companies, activities, and more on the Pipedrive platform.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  dataSources,
  triggers,
});
