import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "salesforce-marketing-cloud",
  public: true,
  documentationUrl:
    "https://prismatic.io/docs/components/salesforce-marketing-cloud/",
  display: {
    label: "Salesforce Marketing Cloud",
    description:
      "Manage assets, contacts, journeys, campaigns, transactional messaging, data extensions, automations, and event notifications in Salesforce Marketing Cloud.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  triggers,
  connections,
  hooks: {
    error: handleErrors,
  },
});
