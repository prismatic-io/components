import { component } from "@prismatic-io/spectral";
import connections from "./connections";
import actions from "./actions";
import dataSources from "./dataSources";

export default component({
  key: "aws-dynamodb",
  documentationUrl: "https://prismatic.io/docs/components/aws-dynamodb/",
  public: true,
  display: {
    label: "Amazon DynamoDB",
    description: "Manage tables and items in Amazon DynamoDB.",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  connections,
  dataSources,
});
