import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "rippling",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/rippling/",
  display: {
    label: "Rippling",
    description:
      "Manage Rippling employees, workers, users, departments, teams, groups, business partners, custom objects, and leave requests, and react to new and updated records.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
  dataSources,
});
