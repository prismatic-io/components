import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
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
      "PagerDuty is a platform for managing on-call operations. This component supports PagerDuty REST API V2.",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  public: true,
  dataSources,
  triggers,
  actions,
  connections,
});
