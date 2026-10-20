import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "gitlab",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/gitlab/",
  display: {
    category: "Application Connectors",
    label: "GitLab",
    description:
      "Manage projects, issues, merge requests, branches, and repository files in GitLab.com or a self-managed GitLab instance, including instances on a private network.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  dataSources,
  hooks: { error: handleErrors },
  connections,
});
