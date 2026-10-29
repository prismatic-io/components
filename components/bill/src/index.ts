import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import dataSources from "./dataSources";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "bill",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/bill/",
  display: {
    label: "Bill",
    description:
      "Use the Bill component to manage Bank Accounts, Invoices, Bills, and more.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  dataSources,
  connections,
});
