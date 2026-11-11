import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ramp",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ramp/",
  display: {
    label: "Ramp",
    description:
      "Manage Ramp transactions, bills, reimbursements, vendors, departments, locations, and accounting fields, and react to new and updated records with a polling trigger.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
});
