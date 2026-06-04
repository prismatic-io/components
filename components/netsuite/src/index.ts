import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "netsuite",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/netsuite/",
  display: {
    label: "Oracle NetSuite",
    description: "Manage records and execute queries in Oracle NetSuite.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  dataSources,
  connections,
  triggers,
});
