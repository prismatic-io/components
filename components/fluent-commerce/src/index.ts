import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import triggers from "./triggers";

export default component({
  key: "fluent-commerce",
  documentationUrl: "https://prismatic.io/docs/components/fluent-commerce/",
  public: true,
  display: {
    label: "Fluent Commerce",
    description:
      "Create customers and products, run GraphQL queries and mutations, and detect new and updated records in Fluent Commerce.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
  triggers,
  hooks: {
    error: handleErrors,
  },
});
