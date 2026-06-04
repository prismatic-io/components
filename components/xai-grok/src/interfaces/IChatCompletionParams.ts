import type { IMessage } from "./IMessage";

export interface IChatCompletionParams {
  messages: Array<IMessage>;
  model: string;
  temperature?: number;
  top_p?: number;
  stream?: boolean;
}
