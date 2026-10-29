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
    description: "Create, retrieve, and update Google Docs documents.",
    iconPath: "icon.png",
  },
  actions,
  connections,
});
