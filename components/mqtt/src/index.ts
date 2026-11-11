import { component } from "@prismatic-io/spectral";
import { publish } from "./actions";
import connections from "./connections";

export default component({
  key: "mqtt",
  documentationUrl: "https://prismatic.io/docs/components/mqtt/",
  public: true,
  display: {
    label: "MQTT",
    category: "Application Connectors",
    description: "Publish messages to topics on an MQTT broker.",
    iconPath: "icon.png",
  },
  actions: { publish },
  connections,
});
