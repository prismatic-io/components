import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "adobe-analytics",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/adobe-analytics/",
  display: {
    category: "Application Connectors",
    label: "Adobe Analytics",
    description:
      "Manage companies, report suites, metrics, dimensions and more within Adobe Analytics.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
