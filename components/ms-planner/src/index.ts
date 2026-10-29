import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ms-planner",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-planner/",
  display: {
    label: "Microsoft Planner",
    description:
      "Manage plans, buckets, tasks, and task details in Microsoft Planner.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  dataSources,
  connections,
});
