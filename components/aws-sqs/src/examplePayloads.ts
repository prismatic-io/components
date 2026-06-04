import type { ListQueuesOutput } from "./interfaces/ListQueuesOutput";
import type { SendMessageOutput } from "./interfaces/SendMessageOutput";
import type { ReceiveMessageOutput } from "./interfaces/ReceiveMessageOutput";
import type { CreateQueueOutput } from "./interfaces/CreateQueueOutput";
import type { DeleteMessageOutput } from "./interfaces/DeleteMessageOutput";
import type { GetQueueUrlOutput } from "./interfaces/GetQueueUrlOutput";

const commonMetadata = {
  httpStatusCode: 200,
  requestId: "00000000-0000-0000-0000-000000000000",
  attempts: 1,
  totalRetryDelay: 0,
};

export const listQueuesExample: ListQueuesOutput = {
  data: {
    $metadata: commonMetadata,
    QueueUrls: [
      "https://sqs.us-east-1.amazonaws.com/012345678900/my-example-queue",
      "https://sqs.us-east-1.amazonaws.com/012345678900/my-second-queue",
    ],
  },
};

export const sendMessageExample: SendMessageOutput = {
  data: {
    $metadata: commonMetadata,
    MD5OfMessageBody: "05e891701cde4c383b66f46a7b9a808c",
    MD5OfMessageAttributes: "23adb2d3b76c04a687f9a5fcfb6086bb",
    MessageId: "00000000-00000000-00000000-00000000",
  },
};

export const receiveMessagesExample: ReceiveMessageOutput = {
  data: {
    $metadata: commonMetadata,
    Messages: [
      {
        MessageId: "00000000-00000000-00000000-00000000",
        ReceiptHandle: "Example Receipt Handle",
        MD5OfBody: "e909509655c5154f008e0ee43ed655b2",
        Body: "My Test Message",
        Attributes: {
          SenderId: "EXAMPLE5OBBA2B7URDN4G",
          ApproximateFirstReceiveTimestamp: "1646857534190",
          ApproximateReceiveCount: "3",
          SentTimestamp: "1646857528982",
        },
        MessageAttributes: {
          exampleKey1: {
            StringValue: "exampleValue",
            DataType: "String",
          },
          exampleKey2: {
            StringValue: "exampleValue2",
            DataType: "String",
          },
        },
      },
    ],
  },
};

export const createQueueExample: CreateQueueOutput = {
  data: {
    $metadata: commonMetadata,
    QueueUrl:
      "https://sqs.us-east-1.amazonaws.com/012345678900/my-example-queue",
  },
};

export const deleteMessageExample: DeleteMessageOutput = {
  data: {
    $metadata: commonMetadata,
  },
};

export const deleteQueueExample: DeleteMessageOutput = {
  data: {
    $metadata: commonMetadata,
  },
};

export const getQueueUrlExample: GetQueueUrlOutput = {
  data: {
    $metadata: commonMetadata,
    QueueUrl:
      "https://sqs.us-east-1.amazonaws.com/012345678900/my-example-queue",
  },
};

export const createDeadLetterQueueExample: {
  data: {
    mainQueue: CreateQueueOutput["data"];
    deadLetterQueue: CreateQueueOutput["data"];
  };
} = {
  data: {
    mainQueue: {
      $metadata: commonMetadata,
      QueueUrl:
        "https://sqs.us-east-1.amazonaws.com/012345678900/my-example-queue",
    },
    deadLetterQueue: {
      $metadata: commonMetadata,
      QueueUrl:
        "https://sqs.us-east-1.amazonaws.com/012345678900/my-example-dlq",
    },
  },
};
