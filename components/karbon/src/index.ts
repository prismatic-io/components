import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "karbon",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/karbon/",
  display: {
    label: "Karbon",
    description:
      "Karbon is a collaborative practice management platform for accounting firms.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  dataSources,
  triggers,
});
