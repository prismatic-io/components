import { input, util } from "@prismatic-io/spectral";
import { asKeyValueList, asStringArray } from "./utils";

export const connection = input({
  label: "Connection",
  type: "connection",
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

export const broker = input({
  label: "Broker",
  type: "string",
  required: true,
  comments:
    "A Kafka broker allows consumers to fetch messages by topic, partition and offset.",
  example: "192.168.0.1",
  placeholder: "Enter broker address",
  clean: util.types.toString,
});

export const clientId = input({
  label: "Client ID",
  type: "string",
  required: true,
  comments:
    "A Client Id is an optional identifier of a Kafka consumer that is passed to a Kafka broker with every request.",
  example: "myExampleClient",
  placeholder: "Enter client ID",
  clean: util.types.toString,
});

export const messages = input({
  label: "Messages",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  comments: "Provide a string for a message to be sent to the Kafka topic.",
  example: "Hello Kafka",
  placeholder: "Enter message content",
  clean: asKeyValueList,
});

export const topic = input({
  label: "Topic",
  type: "string",
  required: true,
  example: "myTopic",
  comments:
    "A Topic is a category/feed name to which records are stored and published.",
  dataSource: "selectTopic",
  placeholder: "Enter topic name",
  clean: util.types.toString,
});


const consumerGroupId = input({
  label: "Consumer Group ID",
  type: "string",
  required: true,
  comments: "The consumer group ID to use for this consumer.",
  example: "my-consumer-group",
  placeholder: "Enter consumer group ID",
  clean: util.types.toString,
});

const topics = input({
  label: "Topics",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "List of topics to subscribe to.",
  dataSource: "selectTopic",
  example: "my-topic",
  placeholder: "Enter topic name",
  clean: asStringArray,
});

const fromBeginning = input({
  label: "From Beginning",
  type: "boolean",
  default: "false",
  comments: "Whether to start consuming from the beginning of the topic.",
  clean: util.types.toBool,
});

const maxMessages = input({
  label: "Max Messages",
  type: "string",
  default: "100",
  required: true,
  comments: "Maximum number of messages to consume per trigger execution.",
  example: "100",
  placeholder: "Enter maximum number of messages",
  clean: util.types.toInt,
});

const autoCommit = input({
  label: "Auto Commit",
  type: "boolean",
  default: "true",
  comments:
    "Whether to automatically commit offsets after processing messages.",
  clean: util.types.toBool,
});

const sessionTimeout = input({
  label: "Session Timeout (ms)",
  type: "string",
  default: "30000",
  required: true,
  comments: "The timeout for consumer session in milliseconds.",
  example: "30000",
  placeholder: "Enter session timeout in milliseconds",
  clean: util.types.toInt,
});

const heartbeatInterval = input({
  label: "Heartbeat Interval (ms)",
  type: "string",
  default: "3000",
  required: true,
  comments:
    "The interval for sending heartbeats to the broker in milliseconds.",
  example: "3000",
  placeholder: "Enter heartbeat interval in milliseconds",
  clean: util.types.toInt,
});


export const kafkaConsumerInputs = {
  connection,
  clientId,
  brokers,
  consumerGroupId,
  topics,
  maxMessages,
  sessionTimeout,
  heartbeatInterval,
  fromBeginning,
  autoCommit,
};


export const selectTopicInputs = {
  connection,
  clientId,
  broker,
};


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
