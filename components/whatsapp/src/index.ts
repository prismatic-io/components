import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import connections from "./connections";

export default component({
  key: "whatsapp",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/whatsapp/",
  display: {
    label: "WhatsApp",
    description:
      "Send messages, manage media, and register phone numbers with the WhatsApp Business API",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  hooks: { error: handleErrors },
  triggers,
  connections,
  dataSources,
});
