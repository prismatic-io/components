import { action } from "@prismatic-io/spectral";
import { createSQSClient } from "../client";
import { name, connectionInputs } from "../inputs";
import { getQueueUrlExample } from "../examplePayloads";

const getQueueUrl = action({
  display: {
    label: "Get a Queue's URL",
    description: "Get the URL of an Amazon SQS Queue given its name",
  },
  perform: async (context, params) => {
    const client = await createSQSClient(params);

    const result = await client.getQueueUrl({ QueueName: params.name });

    return {
      data: result,
    };
  },
  inputs: { name, ...connectionInputs },
  examplePayload: getQueueUrlExample,
});

export default getQueueUrl;
