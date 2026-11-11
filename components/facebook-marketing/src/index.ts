import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
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
    description:
      "Manage Meta (Facebook) Ads campaigns, ad sets, ads, creatives, leads, and conversions.",
    iconPath: "icon.png",
  },
  actions,
  hooks: { error: handleErrors },
  connections,
  dataSources,
  triggers,
});
