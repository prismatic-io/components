import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections/";
import dataSources from "./dataSources";
import triggers from "./triggers/";

export default component({
  key: "datadog",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/datadog/",
  display: {
    label: "Datadog",
    description:
      "Interact with the Datadog API to submit metrics, manage webhooks, and monitor your infrastructure and application performance.",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  connections,
  dataSources,
  triggers,
});
