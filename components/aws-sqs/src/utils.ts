import type { ListQueuesCommandOutput } from "@aws-sdk/client-sqs";
import { util } from "@prismatic-io/spectral";
import { toOptionalString } from "aws-utils";
import { LOOK_BACK_DATE_PATTERN, MAX_RESULTS } from "./constants";
import type { ListQueuesParams } from "./interfaces/listQueues";
import type { PollMessageChange, PollMessagesChanges } from "./types";
export const cleanStringInput = toOptionalString;
export const cleanIntInput = (value: unknown) =>
  value ? util.types.toInt(value) : undefined;
export const lookBackDateClean = (value: unknown): string => {
  const raw = value ? util.types.toString(value).trim() : "";
  if (!raw) {
    return "";
  }
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = util.types.toNumber(yearStr);
  const month = util.types.toNumber(monthStr);
  const day = util.types.toNumber(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};
export const resolvePollMessagesChanges = (
  data: PollMessagesChanges | undefined,
): PollMessageChange[] =>
  (data ?? []).map(
    (record): PollMessageChange => ({ changeType: "created", record }),
  );
export const listQueuesFn = async ({
  client,
  fetchAll,
  maxResults,
  prefix,
  nextToken,
}: ListQueuesParams): Promise<{
  data: ListQueuesCommandOutput;
}> => {
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
