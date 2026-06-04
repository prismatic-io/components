import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "workday",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/workday/",
  display: {
    label: "Workday (Beta)",
    description:
      "Workday HCM is a single, cloud-based solution for workforce planning, talent management, and payroll processes.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
