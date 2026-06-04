import { component } from "@prismatic-io/spectral";

import actions from "./actions";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { webhookReceiver } from "./triggers";
import dataSources from "./dataSources";

export default component({
  key: "zoom",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/zoom/",
  display: {
    label: "Zoom",
    category: "Application Connectors",
    description: "Manage meetings, recordings, users, and webinars in Zoom.",
    iconPath: "icon.png",
  },
  actions,
  connections,
  dataSources,
  triggers: { webhookReceiver },
  hooks: { error: handleErrors },
});
