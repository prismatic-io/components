import { action } from "@prismatic-io/spectral";
import { createSQSClient } from "../client";
import { connectionInputs, url } from "../inputs";
import { deleteQueueExample } from "../examplePayloads";

const deleteQueue = action({
  display: {
    label: "Delete Queue",
    description: "Delete an Amazon SQS Queue",
  },
  perform: async (context, params) => {
    const client = await createSQSClient(params);
    const result = await client.deleteQueue({ QueueUrl: params.url });

    return { data: result };
  },
  inputs: {
    url,
    ...connectionInputs,
  },
  examplePayload: deleteQueueExample,
});
export default deleteQueue;
