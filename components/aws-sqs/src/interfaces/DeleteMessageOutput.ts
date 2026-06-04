import type { DeleteQueueCommandOutput } from "@aws-sdk/client-sqs";

export interface DeleteMessageOutput {
  data: DeleteQueueCommandOutput;
}
