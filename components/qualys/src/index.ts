import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
export default component({
  key: "qualys",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/qualys/",
  display: {
    label: "Qualys",
    description:
      "Interact with the Qualys VMDR API to read and push assets, pull TruRisk scores and vulnerability counts, manage tags, launch and track VM scans, and manage remediation tickets.",
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
