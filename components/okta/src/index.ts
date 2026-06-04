import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "okta-management-api",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/okta-management-api/",
  display: {
    label: "Okta",
    description: "Manage users, groups, applications, and authentication policies in Okta.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  connections,
  actions,
  dataSources,
  triggers,
  hooks: {
    error: handleErrors,
  },
});
