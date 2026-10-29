import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import { connectionString, StorageSharedKey } from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "azure-blob",
  documentationUrl: "https://prismatic.io/docs/components/azure-blob/",
  public: true,
  display: {
    label: "Azure Blob Storage",
    description: "Manage files and folders within Azure Blob Storage",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  dataSources,
  connections: [StorageSharedKey, connectionString],
});
