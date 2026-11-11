import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import connections from "./connections";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/http";
export default component({
  key: "docusign",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/docusign/",
  display: {
    label: "DocuSign",
    category: "Application Connectors",
    description:
      "Manage DocuSign envelopes, templates, documents, contacts, bulk send lists, and users, and receive DocuSign account events with webhooks.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: { error: handleErrors },
});
