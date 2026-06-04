import { component } from "@prismatic-io/spectral";

import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  documentationUrl: "https://prismatic.io/docs/components/ms-bing-ads/",
  key: "ms-bing-ads",
  public: true,
  display: {
    category: "Application Connectors",
    description:
      "Manage campaigns, accounts, and customer services in Microsoft Bing Ads.",
    iconPath: "icon.png",
    label: "Microsoft Bing Ads",
  },
  connections,
  dataSources,
  actions,
});
