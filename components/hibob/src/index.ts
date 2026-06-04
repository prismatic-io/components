import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "hibob",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/hibob/",
  display: {
    label: "HiBob",
    description:
      "Manage employees, tasks, documents, and custom tables in HiBob.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: { error: handleErrors },
});
