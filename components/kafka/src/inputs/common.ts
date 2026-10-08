import { input, util } from "@prismatic-io/spectral";
import { asStringArray } from "../utils";
export const connection = input({
  label: "Connection",
  type: "connection",
  comments: "The Kafka connection to use.",
});
export const brokers = input({
  label: "Brokers",
  type: "string",
  collection: "valuelist",
  comments:
    "A Kafka broker allows consumers to fetch messages by topic, partition and offset.",
  example: "kafka-broker.example.com:9092",
  placeholder: "Enter broker address (host:port)",
  required: true,
  clean: asStringArray,
});
export const clientId = input({
  label: "Client ID",
  type: "string",
  required: true,
  comments:
    "The identifier of this Kafka client, sent to the brokers with every request and used in broker logs, metrics, and quotas.",
  example: "myExampleClient",
  placeholder: "Enter client ID",
  clean: util.types.toString,
});
export const consumerGroupId = input({
  label: "Consumer Group ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the consumer group. Consumers that share this ID split the topic partitions between them and share committed offsets.",
  example: "my-consumer-group",
  placeholder: "Enter consumer group ID",
  clean: util.types.toString,
});
