import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "gorgias",
  public: true,
  display: {
    label: "Gorgias",
    description:
      "Manage customers, tickets, ticket messages, and ticket custom fields in the Gorgias helpdesk.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  documentationUrl: "https://prismatic.io/docs/components/gorgias/",
  hooks: {
    error: handleErrors,
  },
  actions,
  triggers,
  connections,
  dataSources,
});
