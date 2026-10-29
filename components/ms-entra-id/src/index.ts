import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ms-entra-id",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-entra-id/",
  display: {
    label: "Microsoft Entra ID",
    description:
      "Manage users, groups, and applications in Microsoft Entra ID (formerly Azure Active Directory).",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  triggers,
  dataSources,
  connections,
});
