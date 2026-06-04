import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import connections from "./connections";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "calendly",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/calendly/",
  display: {
    category: "Application Connectors",
    label: "Calendly",
    description:
      "Calendly is an industry leading scheduling solution for businesses. Use the Calendly component to manage the scheduling of events; attendee availability; and retrieve pertinent data on users and attendees.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
