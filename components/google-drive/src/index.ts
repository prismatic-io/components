import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "google-drive",
  documentationUrl: "https://prismatic.io/docs/components/google-drive/",
  public: true,
  display: {
    label: "Google Drive",
    category: "Data Platforms",
    description:
      "Manage files, folders, and drives, and monitor activity in Google Drive",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
