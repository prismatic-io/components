import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
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
      "Segment is a customer data platform (CDP) service that simplifies collecting and using data from users of your digital properties (websites, apps, etc.) Use the Segment component to manage your Sources, Warehouses, and Destinations.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections: [apiKey],
  dataSources,
  hooks: { error: handleErrors },
});
