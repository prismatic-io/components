import type { CreateQueueCommandOutput } from "@aws-sdk/client-sqs";

export interface CreateQueueOutput {
  data: CreateQueueCommandOutput;
}
