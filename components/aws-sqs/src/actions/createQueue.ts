import { action } from "@prismatic-io/spectral";
import { createSQSClient } from "../client";
import {
  name,
  isFifo,
  contentBasedDeduplication,
  connectionInputs,
  tags,
} from "../inputs";
import { createQueueExample } from "../examplePayloads";

const createQueue = action({
  display: {
    label: "Create Queue",
    description: "Create an Amazon SQS Queue",
  },
  perform: async (context, params) => {
    const client = await createSQSClient(params);

    const result = await client.createQueue({
      QueueName: params.name,
      tags: params.tags,
      Attributes: {
        
        
        
        
        
        FifoQueue: params.isFifo ? "true" : undefined,
        ContentBasedDeduplication:
          params.isFifo && params.contentBasedDeduplication
            ? "true"
            : undefined,
      },
    });

    return { data: result };
  },
  inputs: {
    name,
    isFifo,
    contentBasedDeduplication,
    tags,
    ...connectionInputs,
  },
  examplePayload: createQueueExample,
});

export default createQueue;
