import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";

export default component({
  key: "new-relic",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/new-relic/",
  display: {
    category: "Application Connectors",
    label: "New Relic",
    description:
      "Send metrics, logs, and events to the New Relic observability platform.",
    iconPath: "icon.png",
  },
  actions,
  connections,
  hooks: {
    error: handleErrors,
  },
});
