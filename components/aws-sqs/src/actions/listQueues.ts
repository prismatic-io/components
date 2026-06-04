import { action } from "@prismatic-io/spectral";
import { createSQSClient } from "../client";
import {
  prefix,
  connectionInputs,
  fetchAll,
  maxResults,
  nextToken,
} from "../inputs";
import { listQueuesFn } from "../utils";
import { listQueuesExample } from "../examplePayloads";

const listQueues = action({
  display: {
    label: "List Queues",
    description: "Fetch a list of Amazon SQS Queues",
  },
  perform: async (context, params) => {
    const client = await createSQSClient(params);
    const { data } = await listQueuesFn({ client, ...params });
    return { data };
  },
  inputs: { prefix, maxResults, nextToken, fetchAll, ...connectionInputs },
  examplePayload: listQueuesExample,
});

export default listQueues;
