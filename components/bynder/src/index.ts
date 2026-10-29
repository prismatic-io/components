import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections/index";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "bynder",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/bynder/",
  display: {
    label: "Bynder",
    category: "Application Connectors",
    description:
      "Bynder is a leading digital asset management software that allows users to easily create, find, and use content, such as documents, graphics, and videos.",
    iconPath: "icon.png",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
