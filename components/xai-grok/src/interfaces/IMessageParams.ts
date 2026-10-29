import type { IMessage } from "./IMessage";

export interface IMessageParams {
  model: string;
  max_tokens: number;
  messages: Array<IMessage>;
}
