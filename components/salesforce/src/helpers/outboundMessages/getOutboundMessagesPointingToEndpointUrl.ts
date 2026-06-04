import type { ActionLogger } from "@prismatic-io/spectral/dist/types";

import { listWorkflowOutboundMessagesFunction } from "../../util";
import type { WorkflowOutboundMessage } from "../../types";
import type { Connection, Schema } from "jsforce";

const processBatch = async <T>(promises: Promise<T>[], batchSize: number = 10): Promise<T[]> => {
  const results: T[] = [];
  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }
  return results;
};

export const getOutboundMessagesPointingToEndpointUrl = async (
  client: Connection<Schema>,
  endpointUrl: string,
  logger: ActionLogger,
) => {
  const listWorkflowOutboundMessagesResult = await listWorkflowOutboundMessagesFunction(client);

  if (!listWorkflowOutboundMessagesResult || listWorkflowOutboundMessagesResult.length === 0) {
    logger.info("No outbound messages found.");
    return [];
  }

  const toRetrieveWorkflowOutboundMessagesData = listWorkflowOutboundMessagesResult.map(
    (msg) =>
      client.tooling
        .sobject("WorkflowOutboundMessage")
        .retrieve(msg.id) as unknown as Promise<WorkflowOutboundMessage>,
  );
  
  const workflowOutboundMessagesDataResult = await processBatch(
    toRetrieveWorkflowOutboundMessagesData,
    10,
  );

  const matchingMessages = workflowOutboundMessagesDataResult.filter(
    (msg) => msg?.Metadata?.endpointUrl === endpointUrl,
  );

  if (matchingMessages.length === 0) {
    logger.info("No outbound messages pointing to this endpoint found.");
    return [];
  }

  return matchingMessages;
};
