import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import dataSources from "./dataSources";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "azure-cosmos-db",
  public: true,
  display: {
    category: "Application Connectors",
    label: "Azure Cosmos DB",
    description:
      "Manage databases, collections, and documents within Azure Cosmos DB.",
    iconPath: "icon.png",
  },
  documentationUrl: "https://prismatic.io/docs/components/azure-cosmos-db/",
  actions,
  triggers,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
});
