import { component } from "@prismatic-io/spectral";
import { storageSharedKey, connectionString } from "./connections";
import actions from "./actions";
import dataSources from "./dataSources";

export default component({
  key: "azure-files",
  documentationUrl: "https://prismatic.io/docs/components/azure-files/",
  public: true,
  display: {
    label: "Azure Files",
    description: "Manage files and folders within Azure Files",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  dataSources,
  connections: [storageSharedKey, connectionString],
});
