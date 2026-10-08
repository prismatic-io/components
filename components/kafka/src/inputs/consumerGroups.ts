import { input } from "@prismatic-io/spectral";
import { asStringArray } from "../utils";
import { brokers, clientId, connection, consumerGroupId } from "./common";
const topicsToCheck = input({
  label: "Topics to Check",
  type: "string",
  collection: "valuelist",
  comments:
    "Specific topics to check for this consumer group. Leave empty to check all topics (slower).",
  example: "my-topic",
  placeholder: "Enter topic name",
  dataSource: "selectTopic",
  clean: asStringArray,
});
export const getConsumerGroupStatusInputs = {
  connection,
  clientId,
  brokers,
  consumerGroupId: {
    ...consumerGroupId,
    comments: "The consumer group ID to check status for.",
  },
  topicsToCheck,
};
