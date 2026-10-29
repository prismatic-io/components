import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
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
      "Manage Microsoft Advertising campaigns, ad groups, keywords, audiences, and customer accounts.",
    iconPath: "icon.png",
    label: "Microsoft Advertising",
  },
  connections,
  dataSources,
  actions,
  hooks: {
    error: handleErrors,
  },
});
