import { component } from "@prismatic-io/spectral";
import connections from "./connections";
import actions from "./actions";
import dataSources from "./dataSources/index";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/http";

export default component({
  key: "gusto",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/gusto/",
  display: {
    category: "Application Connectors",
    label: "Gusto",
    description:
      "Manage companies, employees, pay schedules, and webhook subscriptions in Gusto.",
    iconPath: "icon.png",
  },
  actions,
  connections,
  dataSources,
  triggers,
  hooks: { error: handleErrors },
});
