import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import dataSources from "./datasources";
import connections from "./connections";
import triggers from "./triggers";

export default component({
  key: "typeform",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/typeform/",
  display: {
    label: "Typeform",
    description:
      "Typeform is an online form builder that enables users to create interactive and engaging surveys, forms, and quizzes.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
  triggers,
});
