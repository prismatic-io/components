import { input, type KeyValuePair, util } from "@prismatic-io/spectral";

import { awsRegion, connectionInput, dynamicAccessAllInputs } from "aws-utils";
import { cleanIntInput, cleanStringInput } from "./utils";

export const message = input({
  label: "Message",
  type: "string",
  required: true,
  example: "Example Message",
  comments: "Provide a string containing the message you would like to send.",
  clean: (msg) =>
    typeof msg === "object" ? JSON.stringify(msg) : util.types.toString(msg),
});

export const messageGroupId = input({
  label: "Message Group Id",
  type: "string",
  required: false,
  example: "myExampleMessageGroup",
  comments:
    "The message group ID is the tag that specifies that a message belongs to a specific message group. Messages that belong to the same message group are always processed one by one, in a strict order relative to the message group (however, messages that belong to different message groups might be processed out of order).",
  clean: util.types.toString,
});

export const messageDeduplicationId = input({
  label: "Message deduplication ID",
  type: "string",
  required: false,
  example: "myExampleDeduplicationId",
  comments:
    "The message deduplication ID is the token used for deduplication of sent messages. If a message with a particular message deduplication ID is sent successfully, any messages sent with the same message deduplication ID are accepted successfully but aren't delivered during the 5-minute deduplication interval.",
  clean: util.types.toString,
});

export const attributes = input({
  label: "Attributes",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Amazon SQS lets you include structured metadata (such as timestamps, geospatial data, signatures, and identifiers) with messages using message attributes. Each message can have up to 10 attributes.",
});

export const delaySeconds = input({
  label: "Delay Seconds",
  placeholder: "Delay Seconds",
  type: "data",
  required: false,
  example: "0",
  comments: "Provide a number of optional seconds to delay sending a message.",
  clean: util.types.toInt,
});

export const url = input({
  label: "Queue URL",
  type: "string",
  required: true,
  example: "https://sqs.us-east-1.amazonaws.com/012345678900/my-example-queue",
  comments:
    "You require the queue URL to send, receive, and delete queue messages. A queue URL is constructed in the following format: https://{REGION_ENDPOINT}/queue.|api-domain|/{YOUR_ACCOUNT_NUMBER}/{YOUR_QUEUE_NAME} ",
  dataSource: "selectQueue",
  clean: util.types.toString,
});

export const name = input({
  label: "Name",
  type: "string",
  required: true,
  example: "my-example-queue",
  placeholder: "Enter a name for your queue",
  comments:
    "The name of a new queue. Can only include alphanumeric characters, hyphens, or underscores and must be 1 to 80 characters in length. FIFO queues must end with the .fifo suffix.",
  clean: util.types.toString,
});

export const receiptHandle = input({
  label: "Receipt Handle",
  type: "string",
  required: true,
  example: "AQEBwLpNvpxWR+nqO4frM8rWABCI4dbqTwo7",
  comments:
    "Every time you receive a message from a queue, you receive a receipt handle for that message. This handle is associated with the action of receiving the message, not with the message itself. ",
  clean: util.types.toString,
});

export const maxNumber = input({
  label: "Max Messages",
  type: "string",
  required: false,
  example: "5",
  placeholder: "5 (1-10)",
  comments: "Provide a number for the max amount of values to be returned.",
  clean: (value) => util.types.toInt(value, 1),
});

export const waitTime = input({
  label: "Wait Time (seconds)",
  type: "string",
  required: false,
  example: "10",
  comments:
    "The duration (in seconds) for which the call waits for a message to arrive in the queue before returning. If a message is available, the call returns sooner than WaitTimeSeconds. If no messages are available and the wait time expires, the call returns successfully with an empty list of messages.",
  clean: util.types.toInt,
});

export const isFifo = input({
  label: "FIFO Queue",
  type: "boolean",
  required: true,
  default: "false",
  comments:
    "This flag enables the creation of a FIFO Queue. Once you create a FIFO queue you cannot change it to a standard queue.",
  clean: util.types.toBool,
});

export const contentBasedDeduplication = input({
  label: "Content Based Deduplication",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "This flag enables Content Based Deduplication on a FIFO queue. Once you create a FIFO queue you cannot change the value of this input.",
  clean: util.types.toBool,
});

export const prefix = input({
  label: "Queue Prefix",
  type: "string",
  required: false,
  comments:
    "A string to use for filtering the list results. Only those queues whose name begins with the specified string are returned. <strong>Case-sensitive</strong>.",
  example: "MyQueue",
  placeholder: "Enter a prefix to filter the list results",
  clean: cleanStringInput,
});

export const connectionInputs = {
  awsConnection: connectionInput,
  awsRegion,
  ...dynamicAccessAllInputs,
};

export const tags = input({
  label: "Tags",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "The list of tags you want to tag your AWS SQS queue with.",
  clean: (value: unknown): Record<string, string> => {
    if (!value) return {};
    const record = util.types.keyValPairListToObject(value as KeyValuePair[]);

    return Object.entries(record).reduce((acc, [key, value]) => {
      acc[key] = util.types.toString(value);
      return acc;
    }, {});
  },
});

export const dlqName = input({
  label: "Dead Letter Queue Name",
  type: "string",
  required: true,
  example: "MyDeadLetterQueue",
  placeholder: "Enter a name for your dead letter queue",
  comments:
    "The name of the dead letter queue where messages will be sent after exceeding the maximum number of receive attempts in the main queue. Can only include alphanumeric characters, hyphens, or underscores and must be 1 to 80 characters in length. FIFO queues must end with the .fifo suffix.",
  clean: util.types.toString,
});

export const maxReceiveCount = input({
  label: "Max Receive Count",
  type: "string",
  required: true,
  example: "5",
  default: "5",
  placeholder: "Enter a number for the max receive count",
  comments:
    "The maximum number of times a message is delivered to the source queue before being moved to the dead letter queue. Must be greater than or equal to 1.",
  clean: util.types.toInt,
});

export const maxResults = input({
  label: "Max Results",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter a number for the max results",
  comments:
    "The maximum number of results to return. <strong>Must be between 1 and 1000</strong>.",
  clean: cleanIntInput,
});

export const nextToken = input({
  label: "Next Token",
  type: "string",
  required: false,
  example: "AAcAAgGAARQ...",
  placeholder: "Enter a token for the next results",
  comments: "The next token to return.",
  clean: cleanStringInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "Turn this On to fetch all results. It will ignore the Max Results and Next Token inputs.",
  clean: util.types.toBool,
});
