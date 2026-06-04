import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "Expensify",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/Expensify/",
  display: {
    label: "Expensify",
    description:
      "Expensify provides an industry leading expense management system. Use the Expensify component to programmatically download expense report data for analysis or insertion into your accounting package, provision accounts for new hires, and much more.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
