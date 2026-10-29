import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "jamf",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/jamf/",
  display: {
    label: "Jamf",
    description:
      "Manage Apple devices, policies, scripts, and users with Jamf Pro and Jamf School.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  connections,
  triggers,
  dataSources,
});
