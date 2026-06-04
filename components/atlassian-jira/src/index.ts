import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "atlassian-jira",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/atlassian-jira/",
  display: {
    label: "Jira",
    category: "Application Connectors",
    description: "Manage issues, comments, projects, and users in Jira.",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  dataSources,
  triggers,
});
