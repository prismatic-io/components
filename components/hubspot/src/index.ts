import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "hubspot",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/hubspot/",
  display: {
    label: "HubSpot",
    description: "Manage records and associations in the HubSpot CRM platform",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
