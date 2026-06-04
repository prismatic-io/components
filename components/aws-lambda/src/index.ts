import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "aws-lambda",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/aws-lambda/",
  display: {
    category: "Application Connectors",
    label: "AWS Lambda",
    description: "List and invoke AWS Lambda functions",
    iconPath: "icon.png",
  },
  actions,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
