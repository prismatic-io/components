import type { ListQueuesCommandOutput } from "@aws-sdk/client-sqs";

export interface ListQueuesOutput {
  data: ListQueuesCommandOutput;
}
