import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "google-calendar",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/google-calendar/",
  display: {
    label: "Google Calendar",
    description: "Manage calendars and events in Google Calendar",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  hooks: { error: handleErrors },
  connections,
  dataSources,
  triggers,
});
