import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import rawRequest from "./actions/rawRequest";
import companies from "./actions/companies";
import customObjects from "./actions/customObjects";
import leads from "./actions/leads";
import namedAccounts from "./actions/namedAccounts";
import opportunities from "./actions/opportunities";
import salesPersons from "./actions/salesPersons";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  documentationUrl: "https://prismatic.io/docs/components/marketo/",
  key: "marketo",
  public: true,
  display: {
    category: "Application Connectors",
    label: "Adobe Marketo Engage",
    description:
      "Manage leads, companies, and custom objects in Adobe Marketo Engage.",
    iconPath: "icon.png",
  },
  actions: {
    rawRequest,
    ...companies,
    ...customObjects,
    ...leads,
    ...namedAccounts,
    ...opportunities,
    ...salesPersons,
  },
  dataSources,
  connections,
  hooks: { error: handleErrors },
});
