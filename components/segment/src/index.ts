import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import { apiKey } from "./connections";
import dataSources from "./datasources";

export default component({
  key: "segment",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/segment/",
  display: {
    label: "Segment",
    description:
      "Manage Segment sources, destinations, warehouses, destination subscriptions, functions, transformations, and workspace users through the Segment Public API.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections: [apiKey],
  dataSources,
  hooks: { error: handleErrors },
});
