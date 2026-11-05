import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "adobe-experience-manager",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/adobe-experience-manager/",
  display: {
    label: "Adobe Experience Manager",
    description:
      "Read content fragments, assets, and published pages from Adobe Experience Manager as a Cloud Service, and detect content changes.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  connections,
  actions,
  dataSources,
  triggers,
  hooks: {
    error: handleErrors,
  },
});
