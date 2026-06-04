import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "qlik",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/qlik/",
  display: {
    label: "Qlik",
    description:
      "Qlik is a business analytics platform. Use the Qlik component to manage your Data Sets, Assets, and Apps.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
