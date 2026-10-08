import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { asStringArray, toIntOrDefault, toMaxMessages } from "../utils";
import { brokers, clientId, connection, consumerGroupId } from "./common";
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
  comments:
    "When true, starts consuming from the beginning of the topic instead of the last committed offset.",
  clean: util.types.toBool,
});
const maxMessages = input({
  label: "Max Messages",
  type: "string",
  default: "100",
  required: true,
  comments:
    "Maximum number of messages to consume per trigger execution. Must be at least 1. Defaults to 100.",
  example: "100",
  placeholder: "Enter maximum number of messages",
  clean: toMaxMessages,
});
const autoCommit = input({
  label: "Auto Commit",
  type: "boolean",
  default: "true",
  comments:
    "When true, automatically commits offsets after processing messages.",
  clean: (value) => util.types.toBool(value, true),
});
const sessionTimeout = input({
  label: "Session Timeout (ms)",
  type: "string",
  default: "30000",
  required: true,
  comments:
    "How long the broker waits without a heartbeat before it removes this consumer from the group and rebalances, in milliseconds.",
  example: "30000",
  placeholder: "Enter session timeout in milliseconds",
  clean: toIntOrDefault(30000),
});
const heartbeatInterval = input({
  label: "Heartbeat Interval (ms)",
  type: "string",
  default: "3000",
  required: true,
  comments:
    "How often this consumer sends heartbeats to the group coordinator to keep its session alive, in milliseconds. Must be lower than Session Timeout, typically no more than one third of it.",
  example: "3000",
  placeholder: "Enter heartbeat interval in milliseconds",
  clean: toIntOrDefault(3000),
});
const deserializeKeys = input({
  label: "Deserialize Keys as Avro",
  type: "boolean",
  default: "false",
  comments:
    "When true, also deserializes message keys from Avro format. Requires Avro deserialization to be enabled on the connection.",
  clean: util.types.toBool,
});
const consumerOptions = structuredObjectInput({
  label: "Consumer Options",
  required: false,
  comments:
    "Options that control where consumption starts, whether offsets are auto-committed, and whether message keys are deserialized from Avro.",
  inputs: { fromBeginning, autoCommit, deserializeKeys },
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
  consumerOptions,
};
