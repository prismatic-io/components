import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "rippling",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/rippling/",
  display: {
    label: "Rippling",
    description:
      "Rippling makes it easy to manage your company's Payroll, Benefits, HR, and IT—all in one, modern platform.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  connections,
  dataSources,
});
