import { component } from "@prismatic-io/spectral";
import connections from "./connections";
import actions from "./actions";
import dataSources from "./datasources";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "mixpanel",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/mixpanel/",
  display: {
    label: "Mixpanel",
    description: "Manage events, profiles, and analytics data in Mixpanel.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
