import type { ListQueuesCommandOutput } from "@aws-sdk/client-sqs";
import { util } from "@prismatic-io/spectral";
import { toOptionalString } from "aws-utils";
import { MAX_RESULTS } from "./constants";
import type { ListQueuesParams } from "./interfaces/listQueues";

export const cleanStringInput = toOptionalString;

export const cleanIntInput = (value: unknown) =>
  value ? util.types.toInt(value) : undefined;

export const listQueuesFn = async ({
  client,
  fetchAll,
  maxResults,
  prefix,
  nextToken,
}: ListQueuesParams): Promise<{ data: ListQueuesCommandOutput }> => {
  const maxResultsFinal = fetchAll ? MAX_RESULTS : maxResults;
  const queueNamePrefix = prefix;
  let lastResult = await client.listQueues({
    QueueNamePrefix: queueNamePrefix,
    MaxResults: maxResultsFinal,
    NextToken: fetchAll ? undefined : nextToken,
  });

  if (!fetchAll) {
    return {
      data: lastResult,
    };
  }

  const allResults: string[] | undefined = lastResult.QueueUrls;
  let nextTokenFinal = lastResult.NextToken;
  while (nextTokenFinal) {
    lastResult = await client.listQueues({
      NextToken: nextTokenFinal,
      QueueNamePrefix: queueNamePrefix,
      MaxResults: maxResultsFinal,
    });
    allResults.push(...lastResult.QueueUrls);
    nextTokenFinal = lastResult.NextToken;
  }

  return {
    data: {
      ...lastResult,
      ...(allResults && { QueueUrls: allResults }), 
    },
  };
};
