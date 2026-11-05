import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
import { handleErrors } from "./util";

export default component({
  key: "ms-dynamics",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-dynamics/",
  display: {
    label: "Microsoft Dynamics 365",
    description: "Query, create, update, or delete Microsoft Dynamics 365 entity records.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  dataSources,
  triggers,
});
