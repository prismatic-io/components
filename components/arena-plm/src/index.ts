import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";

export default component({
  key: "arena-plm",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/arena-plm/",
  display: {
    label: "Arena PLM",
    description: "Interact with items and resources in Arena PLM",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  hooks: {
    error: handleErrors,
  },
});
