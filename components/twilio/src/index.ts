import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "twilio",
  documentationUrl: "https://prismatic.io/docs/components/twilio/",
  public: true,
  display: {
    label: "Twilio",
    description: "Send SMS messages through Twilio",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  triggers,
  connections,
});
