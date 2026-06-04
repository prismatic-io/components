import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions/index";
import connections from "./connections";
import dataSources from "./dataSources/index";
import triggers from "./triggers";

export default component({
  key: "ramp",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ramp/",
  display: {
    label: "Ramp",
    description:
      "Ramp is a spend management platform focused on automating accounts payable and procurement processes. Use the Ramp component to manage transactions related to vendors, bills, reimbursements and more.",
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
