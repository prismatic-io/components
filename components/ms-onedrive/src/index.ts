import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ms-onedrive",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-onedrive/",
  display: {
    label: "Microsoft OneDrive",
    category: "Data Platforms",
    description:
      "Manage drives, files, shared content, and monitor changes in Microsoft OneDrive.",
    iconPath: "icon.png",
  },
  dataSources,
  actions,
  hooks: { error: handleErrors },
  connections,
  triggers,
});
