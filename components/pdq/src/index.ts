import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "pdq",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/pdq/",
  display: {
    label: "PDQ",
    description:
      "PDQ provides a suite of management tools to automate software deployment, manage patches, and track inventory across a company’s networks. Use the PDQ component to manage deployments, devices, groups, and packages.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
});
