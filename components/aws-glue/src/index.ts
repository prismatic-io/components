import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
export default component({
  key: "aws-glue",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/aws-glue/",
  display: {
    label: "AWS Glue",
    description: "Manage AWS Glue crawlers, jobs and triggers",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  connections,
  dataSources,
});
