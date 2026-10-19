import type { Message } from "@aws-sdk/client-sqs";
export type PollMessagesChanges = Message[];
export interface PollMessageChange {
  changeType: "created";
  record: Message;
}
