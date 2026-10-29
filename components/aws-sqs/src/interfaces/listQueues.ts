import type { SQS } from "@aws-sdk/client-sqs";

export interface ListQueuesParams {
  client: SQS;
  fetchAll: boolean;
  maxResults?: number;
  prefix?: string;
  nextToken?: string;
}
