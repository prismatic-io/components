import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "oracle-fusion-cloud-hcm",
  documentationUrl:
    "https://prismatic.io/docs/components/oracle-fusion-cloud-hcm/",
  public: true,
  display: {
    label: "Oracle Fusion Cloud HCM (Beta)",
    description:
      "Interact with Oracle Fusion Cloud HCM to manage workers, jobs, absences, and HR data.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  connections,
  dataSources,
  triggers,
});
