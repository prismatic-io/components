import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import triggers from "./triggers";
import connections from "./connections";
import dataSources from "./dataSources";
export default component({
  key: "ms-outlook",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-outlook/",
  display: {
    label: "Microsoft Outlook",
    description: "Manage emails, calendar events, and subscriptions in Microsoft Outlook.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  dataSources,
  connections,
});
