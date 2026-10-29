import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "databricks",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/databricks/",
  display: {
    label: "Databricks",
    description:
      "Manage compute, workflow jobs, ML models, SQL queries and more within a Databricks workspace.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
