import { component } from "@prismatic-io/spectral";
import { sendLogs } from "./actions/sendLogs";
import { sendMetrics } from "./actions/sendMetrics";
import { sendEventData } from "./actions/sendEvents";
import { sendDetailedLogs } from "./actions/sendDetailedLogs";
import connections from "./connections";
import rawRequest from "./actions/rawRequest";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "new-relic",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/new-relic/",
  display: {
    category: "Application Connectors",
    label: "New Relic",
    description:
      "Send metrics, logs, and events to New Relic observability platform.",
    iconPath: "icon.png",
  },
  actions: {
    sendLogs,
    sendMetrics,
    sendEventData,
    sendDetailedLogs,
    rawRequest,
  },
  connections,
  hooks: {
    error: handleErrors,
  },
});
