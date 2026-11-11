import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import connections from "./connections";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/http";

export default component({
  key: "ms-teams",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-teams/",
  display: {
    label: "Microsoft Teams",
    description:
      "Manage teams, channels, members, apps, and webinars, and send channel messages and Adaptive Cards in Microsoft Teams.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
  dataSources,
});
