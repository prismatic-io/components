import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "jira-service-management",
  public: true,
  documentationUrl:
    "https://prismatic.io/docs/components/jira-service-management/",
  display: {
    label: "Jira Service Management",
    description:
      "Interact with the Jira Service Management API to manage service requests, issues, request types, queues, and approvals.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  connections,
  dataSources,
  triggers,
});
