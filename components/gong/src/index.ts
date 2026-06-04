import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import triggers from "./triggers";
import connections from "./connections";
import datasources from "./datasources";

export default component({
  key: "gong",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/gong/",
  display: {
    label: "Gong",
    description:
      "Manage calls, users, and workspaces in the Gong revenue intelligence platform.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  triggers: triggers,
  dataSources: datasources,
});
