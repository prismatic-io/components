import { component } from "@prismatic-io/spectral";
import triggers from "./triggers";
import connections from "./connections";
import { sendGridListsDataSource, selectWebhook } from "./dataSources";
import actions from "./actions";
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
  dataSources: {
    sendGridListsDataSource,
    selectWebhook,
  },
  triggers,
  connections,
});
