import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "monday",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/monday/",
  display: {
    label: "Monday",
    description:
      "Manage monday.com boards and webhooks, find items by column value, send GraphQL requests, and react to new and updated items.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
  dataSources,
});
