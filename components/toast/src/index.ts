import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "toast",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/toast/",
  display: {
    label: "Toast",
    description:
      "Use the Toast component to manage Employees, Jobs, Cash Entries, and more.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  triggers,
  dataSources,
  connections,
});
