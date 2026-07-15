import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "sendgrid",
  documentationUrl: "https://prismatic.io/docs/components/sendgrid/",
  public: true,
  display: {
    label: "SendGrid",
    description: "Manage email delivery and contacts in SendGrid.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  triggers,
  connections,
});
