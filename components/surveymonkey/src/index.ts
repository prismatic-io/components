import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "surveymonkey",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/surveymonkey/",
  display: {
    label: "SurveyMonkey",
    description:
      "Manage surveys, collectors, responses, contacts, and webhooks in SurveyMonkey.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  connections,
  actions,
  dataSources,
  triggers,
  hooks: {
    error: handleErrors,
  },
});
