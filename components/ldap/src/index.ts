import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "ldap",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ldap/",
  display: {
    label: "Active Directory",
    description:
      "Manage users, groups, and directory entries in Active Directory or another LDAP server.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  hooks: { error: handleErrors },
  connections,
});
