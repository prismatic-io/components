import { component } from "@prismatic-io/spectral";
import dataSources from "./dataSources";
import connections from "./connections";
import triggers from "./triggers";
import actions from "./actions";

export default component({
  key: "aws-sqs",
  documentationUrl: "https://prismatic.io/docs/components/aws-sqs/",
  public: true,
  display: {
    label: "Amazon SQS",
    description:
      "Send, receive and manage messages within an Amazon (AWS) SQS queue",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  dataSources,
  connections,
  triggers,
});
