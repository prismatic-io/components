import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "sapS4Hana",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/sapS4Hana/",
  display: {
    category: "Application Connectors",
    label: "SAP S/4HANA Cloud",
    description:
      "Manage business partners, sales orders, materials, and other enterprise resources in SAP S/4HANA Public Cloud.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
});
