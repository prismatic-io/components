import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "freshservice",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/freshservice/",
  display: {
    label: "Freshservice",
    description:
      "Manage tickets, problems, agents, and assets in Freshservice.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  dataSources,
  triggers,
  connections,
});
