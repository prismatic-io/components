import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "arcgis",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/arcgis/",
  display: {
    category: "Application Connectors",
    label: "ArcGIS",
    description:
      "Manage Esri ArcGIS feature services, layers, features, and web maps, and geocode addresses.",
    iconPath: "icon.png",
  },
  actions,
  connections,
  dataSources,
});
