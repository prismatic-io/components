import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";

export default component({
  key: "google-docs",
  documentationUrl: "https://prismatic.io/docs/components/google-docs/",
  public: true,
  display: {
    label: "Google Docs",
    category: "Application Connectors",
    description: `Google Docs is an online word processor included as part of the free, web-based Google Docs Editors suite.
    Use the Google Docs component to create, and collaborate on online documents.`,
    iconPath: "icon.png",
  },
  actions,
  connections,
});
