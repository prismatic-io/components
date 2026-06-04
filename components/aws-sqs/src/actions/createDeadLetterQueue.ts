import { action } from "@prismatic-io/spectral";
import { createSQSClient } from "../client";
import {
  name,
  isFifo,
  contentBasedDeduplication,
  connectionInputs,
  tags,
  dlqName,
  maxReceiveCount,
} from "../inputs";
import type {
  CreateQueueCommandInput,
  GetQueueAttributesCommandInput,
} from "@aws-sdk/client-sqs";
import { createDeadLetterQueueExample } from "../examplePayloads";

const createDeadLetterQueue = action({
  display: {
    label: "Create Dead Letter Queue",
    description: "Create an Amazon SQS Dead Letter Queue",
  },
  perform: async (context, params) => {
    const client = await createSQSClient(params);

    if (params.isFifo) {
      if (!params.name.endsWith(".fifo")) {
        throw new Error(
          "FIFO queues must end with .fifo. Please update the queue name.",
        );
      }
      if (!params.dlqName.endsWith(".fifo")) {
        throw new Error(
          "FIFO queues must end with .fifo. Please update the dead letter queue name.",
        );
      }
    }

    const tags = params.tags;
    const attributes = {
      
      
      
      
      
      FifoQueue: params.isFifo ? "true" : undefined,
      ContentBasedDeduplication:
        params.isFifo && params.contentBasedDeduplication ? "true" : undefined,
    };
    const dlqCreateCommandInput: CreateQueueCommandInput = {
      QueueName: params.dlqName,
      tags,
      Attributes: attributes,
    };

    const dlqResult = await client.createQueue(dlqCreateCommandInput);

    const dldGetQueueCommandInput: GetQueueAttributesCommandInput = {
      QueueUrl: dlqResult.QueueUrl,
      AttributeNames: ["QueueArn"],
    };

    const dlqAttributes = await client.getQueueAttributes(
      dldGetQueueCommandInput,
    );
    if (!dlqAttributes.Attributes?.QueueArn) {
      throw new Error("Failed to get Dead Letter Queue ARN");
    }
    const redrivePolicy = JSON.stringify({
      deadLetterTargetArn: dlqAttributes.Attributes.QueueArn,
      maxReceiveCount: params.maxReceiveCount,
    });

    const mainCreateCommandInput: CreateQueueCommandInput = {
      QueueName: params.name,
      tags,
      Attributes: {
        ...attributes,
        RedrivePolicy: redrivePolicy,
      },
    };

    const mainQueueResult = await client.createQueue(mainCreateCommandInput);

    return { data: { mainQueue: mainQueueResult, deadLetterQueue: dlqResult } };
  },
  inputs: {
    name: { ...name, label: "Main Queue Name" },
    isFifo: {
      ...isFifo,
      comments: `${isFifo.comments} When active, the main and dead letter queues will be FIFO.`,
    },
    contentBasedDeduplication: {
      ...contentBasedDeduplication,
      comments: `${contentBasedDeduplication.comments} When active, the main and dead letter queues will enable content-based deduplication.`,
    },
    dlqName,
    maxReceiveCount,
    tags: {
      ...tags,
      comments: `${tags.comments} Tags are included in both queues.`,
    },
    ...connectionInputs,
  },
  examplePayload: createDeadLetterQueueExample,
});

export default createDeadLetterQueue;
