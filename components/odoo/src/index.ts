import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import triggers from "./triggers";

export default component({
  key: "odoo",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/odoo/",
  display: {
    label: "Odoo",
    description: "Manage records in an Odoo database.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
  triggers,
});
