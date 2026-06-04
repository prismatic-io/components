import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "click-up",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/click-up/",
  display: {
    category: "Application Connectors",
    label: "ClickUp",
    description: "Manage tasks, lists, spaces, time tracking, and team members in ClickUp.",
    iconPath: "icon.png",
  },
  actions,
  connections,
  dataSources,
  triggers,
  hooks: {
    error: handleErrors,
  },
});
