import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "confluence",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/confluence/",
  display: {
    label: "Confluence",
    description:
      "Confluence is an open and shared workspace platform provided by Atlassian. Use the Confluence component to manage spaces, pages, and content properties.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  triggers,
  hooks: { error: handleErrors },
});
