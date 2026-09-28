import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import dataSources from "./dataSources";
import connections from "./connections";
import triggers from "./triggers";
export default component({
  key: "klaviyo",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/klaviyo/",
  display: {
    label: "Klaviyo",
    description:
      "Manage email and SMS marketing campaigns, profiles, lists, segments, and templates in Klaviyo.",
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
