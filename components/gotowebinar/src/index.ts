import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import dataSources from "./dataSources";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { userSubscriptionTrigger } from "./triggers/userSubscription";

export default component({
  key: "gotowebinar",
  public: true,
  display: {
    label: "GoTo Webinar",
    category: "Application Connectors",
    description:
      "GoTo Webinar is a platform for hosting, managing, and attending live or pre-recorded webinars.",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  documentationUrl: "https://prismatic.io/docs/components/gotowebinar/",
  actions,
  dataSources,
  connections,
  triggers: {
    userSubscriptionTrigger,
  },
});
