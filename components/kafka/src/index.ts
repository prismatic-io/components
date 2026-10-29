import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "kafka",
  documentationUrl: "https://prismatic.io/docs/components/kafka/",
  public: true,
  display: {
    label: "Kafka",
    description:
      "Publish and consume messages from Apache Kafka event streams.",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  connections,
  triggers,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
