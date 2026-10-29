import type { SendMessageCommandOutput } from "@aws-sdk/client-sqs";

export interface SendMessageOutput {
  data: SendMessageCommandOutput;
}
