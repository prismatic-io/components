export type MessageRole = "user" | "assistant" | "system";

export interface IMessage {
  role: MessageRole;
  content: string;
}
