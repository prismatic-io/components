import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import { apiKey } from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "sage-hr",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/sage-hr/",
  display: {
    label: "Sage HR",
    description:
      "Sage HR is all inclusive Human Resource management solution. Use the Sage HR component to manage Employees, Teams, Projects, and more.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections: [apiKey],
  dataSources,
  hooks: { error: handleErrors },
});
