import { component } from "@prismatic-io/spectral";
import connections from "./connections";
import actions from "./actions";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "aws-redshift",
  public: true,
  display: {
    label: "Redshift",
    description:
      "Execute SQL statements and manage data in Amazon Redshift using the AWS Redshift Data API",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  documentationUrl: "https://prismatic.io/docs/components/aws-redshift/",
  connections,
  dataSources,
  actions,
  hooks: { error: handleErrors },
});
