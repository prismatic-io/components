import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import dataSources from "./datasources";
import connections from "./connections";
import triggers from "./triggers";

export default component({
  key: "typeform",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/typeform/",
  display: {
    label: "Typeform",
    description:
      "Manage Typeform forms, responses, workspaces, and webhooks, and react to Typeform events with a webhook trigger.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
  triggers,
});
