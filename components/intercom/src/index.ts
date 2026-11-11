import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "intercom",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/intercom/",
  display: {
    label: "Intercom",
    description:
      "Manage Intercom contacts, companies, tags, and tickets, and react to new and updated records.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
  dataSources,
});
