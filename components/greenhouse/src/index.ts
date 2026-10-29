import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "greenhouse",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/greenhouse/",
  display: {
    label: "Greenhouse",
    description:
      "Manage candidates, applications, and job postings in Greenhouse.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
