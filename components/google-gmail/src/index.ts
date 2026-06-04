import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import { gmailOauth, gmailServiceAccountAuth } from "./connections";
import triggers from "./triggers";
import dataSources from "./dataSources";

export default component({
  key: "google-gmail",
  documentationUrl: "https://prismatic.io/docs/components/google-gmail/",
  public: true,
  display: {
    label: "Gmail",
    category: "Application Connectors",
    description: "Manage messages, labels, and drafts in Gmail.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  dataSources,
  connections: [gmailOauth, gmailServiceAccountAuth],
  hooks: { error: handleErrors },
});
