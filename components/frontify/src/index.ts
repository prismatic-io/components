import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "frontify",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/frontify/",
  display: {
    label: "Frontify",
    description:
      "Frontify is a comprehensive brand management platform that enables organizations to create, manage, and distribute brand assets, guidelines, and digital content across teams and channels, streamlining brand consistency and collaboration.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  connections,
});
