import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "facebook-marketing",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/facebook-marketing/",
  display: {
    category: "Application Connectors",
    label: "Meta Ads",
    description: "Interact with ads and adsets in your Meta Ads account.",
    iconPath: "icon.png",
  },
  actions,
  hooks: { error: handleErrors },
  connections,
  dataSources,
  triggers,
});
