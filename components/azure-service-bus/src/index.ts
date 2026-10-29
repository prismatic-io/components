import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "azureServiceBus",
  documentationUrl: "https://prismatic.io/docs/components/azureServiceBus/",
  public: true,
  display: {
    label: "Azure Service Bus",
    description:
      "Interact with message queues and publish-subscribe topics (in a namespace)",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  connections,
  dataSources,
  triggers,
  hooks: { error: handleErrors },
});
