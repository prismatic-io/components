import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "sage-200",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/sage-200/",
  display: {
    label: "Sage 200",
    description:
      "Sage 200 is an online business management solution designed to help businesses manage their finances, customers, and business insight in one solution.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  dataSources,
  connections,
  hooks: { error: handleErrors },
});
