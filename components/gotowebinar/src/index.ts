import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import dataSources from "./dataSources";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/http";
import triggers from "./triggers";

export default component({
  key: "gotowebinar",
  public: true,
  display: {
    label: "GoTo Webinar",
    category: "Application Connectors",
    description:
      "Manage webinars, registrants, attendees, and webhook subscriptions in GoTo Webinar.",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  documentationUrl: "https://prismatic.io/docs/components/gotowebinar/",
  actions,
  dataSources,
  connections,
  triggers,
});
