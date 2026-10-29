import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "firebase",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/firebase/",
  display: {
    category: "Data Platforms",
    label: "Firebase",
    description:
      "Create, read, update, and delete documents in a Firebase Cloud Firestore database collection.",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  dataSources,
  connections,
});
