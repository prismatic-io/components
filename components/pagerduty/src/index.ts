import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "pagerduty",
  documentationUrl: "https://prismatic.io/docs/components/pagerduty/",
  display: {
    label: "PagerDuty",
    category: "Application Connectors",
    description:
      "Manage PagerDuty incidents, alerts, services, users, templates, and webhook subscriptions, and send events and change events.",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  public: true,
  dataSources,
  triggers,
  actions,
  connections,
});
