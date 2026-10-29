import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "gorgias",
  public: true,
  display: {
    label: "Gorgias",
    description:
      "Gorgias is a customer support platform designed to help e-commerce businesses manage customer inquiries and support tickets efficiently.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  documentationUrl: "https://prismatic.io/docs/components/gorgias/",
  hooks: {
    error: handleErrors,
  },
  actions,
  triggers,
  connections,
  dataSources,
});
