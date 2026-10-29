import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";

export default component({
  key: "mongo",
  documentationUrl: "https://prismatic.io/docs/components/mongo/",
  public: true,
  display: {
    label: "MongoDB",
    category: "Data Platforms",
    description: "Interact with documents in a MongoDB database",
    iconPath: "icon.png",
  },
  actions,
  connections,
});
