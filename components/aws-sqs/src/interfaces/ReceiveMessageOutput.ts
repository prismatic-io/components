import type { ReceiveMessageCommandOutput } from "@aws-sdk/client-sqs";

export interface ReceiveMessageOutput {
  data: ReceiveMessageCommandOutput;
}
