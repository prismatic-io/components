import type { IMessageContent } from "./IMessageContent";

export interface IMessageResponse {
  id: string;
  type: string;
  role: string;
  content: Array<IMessageContent>;
  model: string;
  stop_reason: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    cache_creation_input_tokens: number;
    cache_read_input_tokens: number;
    output_tokens: number;
  };
}
